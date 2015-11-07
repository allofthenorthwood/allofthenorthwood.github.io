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
      "em",
      "paragraph",
      "strong",
    ];
    const newRules = elements.reduce((acc, element) => {
      return newAcc = {
        ...acc,
        [element]: {
          ...SimpleMarkdown.defaultRules[element],
          react: (node, output, state) => {
            return <div
              className={css(ST[element])}
              key={state.key}
            >
              {output(node.content, state)}
            </div>;
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
      SimpleMarkdown.ruleOutput(rules, 'react'));

    const syntaxTree = parse(markdownContent);

    return <div>
      {mdOutput(syntaxTree)}
    </div>;
  },
});

const ST = StyleSheet.create({
  em: {
    display: "inline",
    fontStyle: "italic",
  },
  paragraph: {
    marginBottom: "1em",
  },
  strong: {
    display: "inline",
    fontWeight: 700,
  },
});

module.exports = PostContent;