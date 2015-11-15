"use strict";

import React from "react";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

const PostContent = React.createClass({
  propTypes: {
    markdownContent: React.PropTypes.string,
  },
  render: function () {
    const {
      markdownContent,
    } = this.props;

    const elements = [
      {
        type: "link",
        Component: "a",
      },
      {
        type: "em",
        Component: "em",
      },
      {
        type: "paragraph",
        Component: "div",
      },
      {
        type: "strong",
        Component: "strong",
      },
      {
        type: "blockQuote",
        Component: "blockquote",
      },
    ];
    const newRules = elements.reduce((acc, element) => {
      const {
        type,
        Component,
      } = element;

      return newAcc = {
        ...acc,
        [type]: {
          ...SimpleMarkdown.defaultRules[type],
          react: (node, output, state) => {
            const url = type === "link" ?
              SimpleMarkdown.sanitizeUrl(node.target) : null;
            return <Component
              className={css(ST[type])}
              href={url ? url : undefined}
              key={state.key}
            >
              {output(node.content, state)}
            </Component>;
          },
        },
      };
    }, {});

    const LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\]]|\\](?=[^\\[]*\\]))*";
    const LINK_HREF_AND_TITLE_AND_SIZE =
            "\\s*" +
            "<?([^\\s]*?)>?" +
            "(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*" +
            // You can specify the width after the title (e.g. =200)
            "(\\d+)?";

    const rules = {
      ...SimpleMarkdown.defaultRules,
      ...newRules,
      list: {
        ...SimpleMarkdown.defaultRules.list,
        react: function(node, output, state) {
          const ListWrapper = node.ordered ? "ol" : "ul";
          const style = node.ordered ?
            ST.orderedListItem : ST.unorderedListItem;

          return <ListWrapper
            className={css(ST.list)}
            key={state.key}
          >
            {node.items.map(function(item, i) {
              return <li
                className={css(style)}
                key={i}
              >
                {output(item, state)}
              </li>
            })}
          </ListWrapper>;
        },
      },
      image: {
        match: SimpleMarkdown.inlineRegex(new RegExp(
          "^!\\[(" + LINK_INSIDE + ")\\]" +
          "\\(" + LINK_HREF_AND_TITLE_AND_SIZE + "\\)"
        )),
        parse: function(capture, parse, state) {
          var image = {
            alt: capture[1],
            target: capture[2],
            title: parse(capture[3], state),
            width: capture[4],
          };
          return image;
        },
        react: function(node, output, state) {
          return <div key={state.key}>
            <img
              className={css(ST.image)}
              src={SimpleMarkdown.sanitizeUrl(node.target)}
              width={node.width}
              title={node.alt}
              alt={node.alt}
            />
            {node.title && <div className={css(ST.imageCaption)}>
              {output(node.title, state)}
            </div>}
          </div>
        },
      },
      heading: {
        ...SimpleMarkdown.defaultRules.heading,
        react: function(node, output, state) {
          const Heading = "h" + node.level;
          return <Heading
            key={state.key}
            className={css(ST[Heading])}
          >
            {output(node.content, state)}
          </Heading>;
        },
      },
      inlineCode: {
        ...SimpleMarkdown.defaultRules.inlineCode,
        react: function(node, output, state) {
          return <code key={state.key} className={css(ST.code)}>
            {node.content}
          </code>;
        },
      },
      hr: {
        ...SimpleMarkdown.defaultRules.hr,
        react: function(node, output, state) {
          return <hr key={state.key} className={css(ST.hr)} />;
        },
      },
    };

    const rawBuiltParser = SimpleMarkdown.parserFor(rules);
    const parse = function(source) {
        const blockSource = source + "\n\n";
        return rawBuiltParser(blockSource, {inline: false});
    };

    const mdOutput = SimpleMarkdown.reactFor(
      SimpleMarkdown.ruleOutput(rules, "react"));

    const syntaxTree = parse(markdownContent);

    return <div>
      {mdOutput(syntaxTree)}
    </div>;
  },
});

const ST = StyleSheet.create({
  link: {
    borderBottom: `1px solid ${SS.color.greenLight}`,
    color: SS.color.greenLight,
    textDecoration: "none",
    ":hover": {
      borderColor: SS.color.green,
      color: SS.color.green,
    },
    ":focus": {
      opacity: 0.7,
    },
  },
  em: {
    fontStyle: "italic",
  },
  image: {
    display: "block",
    margin: "0 auto",
    maxWidth: "100%",
  },
  imageCaption: {
    color: SS.color.greyDark,
    fontFamily: SS.font.sansFamily,
    fontSize: SS.font.mediumSize,
    marginTop: 10,
    textAlign: "center",
  },
  paragraph: {
    marginTop: "1.5em",
  },
  strong: {
    fontWeight: 700,
  },
  list: {
    paddingLeft: "2em",
  },
  unorderedListItem: {
    listStyle: "disc",
  },
  orderedListItem: {
    listStyle: "decimal",
  },
  h2: {
    fontSize: SS.font.lessLargeSize,
    fontWeight: "bold",
    marginTop: "2em",
  },
  hr: {
    border: "none",
    borderTop: `1px solid ${SS.color.greyLight}`,
    margin: "50px 0",
  },
  code: {
    background: "#eee",
    borderRadius: 3,
    color: SS.color.greyDark,
    fontFamily: SS.font.monoFamily,
    padding: "1px 4px",
  },
  blockQuote: {
    borderLeft: `5px solid ${SS.color.greyLight}`,
    paddingLeft: 20,
  },
});

module.exports = PostContent;