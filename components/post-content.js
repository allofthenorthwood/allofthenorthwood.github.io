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
        Component: "p",
      },
      {
        type: "strong",
        Component: "strong",
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

    const rules = {
      ...SimpleMarkdown.defaultRules,
      ...newRules,
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
  paragraph: {
    marginTop: "1.5em",
  },
  strong: {
    fontWeight: 700,
  },
});

module.exports = PostContent;