"use strict";

import React from "react";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

import Synesthesia from "../lib/synesthesia/app.jsx";

import SS from "../styles/shared.js";

const mapObject = (obj, transformation) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[key] = transformation(obj[key], key);
  });
  return result;
};

const classNamedSimpleMarkdownRules = mapObject(
  SimpleMarkdown.defaultRules,
  (rule, type) => {
    return {
      ...rule,
      react: (node, output, state) => {
        const element = rule.react(node, output, state);
        if (typeof element == "string") {
          return element;
        }
        const classType = type === "heading" ? element.type : type;

        const propClassName = element.props && element.props.className;
        const newClassName = propClassName ?
          css(ST[classType]) + " " + propClassName :
          css(ST[classType]);

        return <element.type
          {...element.props}
          className={newClassName}
          key={element.key}
        />;
      },
      type: type,
    };
  }
);

const LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\]]|\\](?=[^\\[]*\\]))*";
const LINK_HREF_AND_TITLE_AND_SIZE =
        "\\s*" +
        "<?([^\\s]*?)>?" +
        "(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*" +
        // You can specify the width after the title (e.g. =200)
        "(\\d+)?";

const rules = {
  ...classNamedSimpleMarkdownRules,
  list: {
    type: "list",
    ...SimpleMarkdown.defaultRules.list,
    react: function(node, output, state) {
      // TODO(aria): It would be possible to unify this logic
      // with the wrapper logic above, but I'm not sure it's worth it.
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
  widget: {
    type: "widget",
    order: SimpleMarkdown.defaultRules.image.order + 0.5,
    match: SimpleMarkdown.inlineRegex(new RegExp(
      /^\[\[@ ([A-Za-z]+)\]\]/
    )),
    parse: function(capture, parse, state) {
      var widget = {
        widgetType: capture[1],
      };
      return widget;
    },
    react: function(node, output, state) {
      const components = {
        synesthesia: Synesthesia,
      };
      const Component = components[node.widgetType];
      return <div key={state.key} className={css(ST[node.widgetType])}>
        <Component />
      </div>
    },
  },
  image: {
    type: "image",
    order: SimpleMarkdown.defaultRules.image.order,
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
};

const rawBuiltParser = SimpleMarkdown.parserFor(rules);
const parse = function(source) {
  const blockSource = source + "\n\n";
  return rawBuiltParser(blockSource, {inline: false});
};

const mdOutput = SimpleMarkdown.reactFor(
  SimpleMarkdown.ruleOutput(rules, "react"));

const PostContent = React.createClass({
  propTypes: {
    markdownContent: React.PropTypes.string,
  },
  render: function () {
    const {
      markdownContent,
    } = this.props;

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
    paddingBottom: 1,
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
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    maxWidth: 600,
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
    fontSize: SS.font.largeSize,
    fontWeight: "bold",
    marginTop: "2em",
  },
  h3: {
    fontSize: 24,
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
    color: SS.color.greyDark,
  },

  // widgets
  synesthesia: {
    fontFamily: SS.font.sansFamily,
    minHeight: 365,
    position: "relative",
  },
});

module.exports = PostContent;
