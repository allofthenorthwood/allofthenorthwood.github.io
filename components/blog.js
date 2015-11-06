"use strict";

import React from "react";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

const Blog = React.createClass({
  render: function () {
    var mdParse = SimpleMarkdown.defaultBlockParse;
    var mdOutput = SimpleMarkdown.defaultOutput;

    var syntaxTree = mdParse(this.props.post);
    return <div className={css(ST.blog)}>

      <div className={css(ST.header)}>
        <div className={css(ST.headerContent)}>
          <h1 className={css(ST.title)}>
            Title of this Blog Post
          </h1>
          <div className={css(ST.date)}>
            Tuesday Nov 5, 2015
          </div>
        </div>
      </div>

      <div className={css(ST.post)}>
        <div className={css(ST.postContent)}>
          {mdOutput(syntaxTree)}
        </div>
      </div>

    </div>;
  },
});

const ST = StyleSheet.create({
  blog: {
    color: SS.color.black,
    fontFamily: SS.font.serifFamily,
  },
  header: {
    padding: `100px ${SS.layout.padding}px 20px`,
  },
  headerContent: {
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
    textAlign: "center",
  },
  title: {
    fontSize: SS.font.largeSize,
  },
  date: {
    color: SS.color.grey,
    fontFamily: SS.font.sansFamily,
    fontSize: SS.font.smallSize,
    marginTop: 5,
    textTransform: "uppercase",
  },
  post: {
    padding: `0 ${SS.layout.padding}px`,
  },
  postContent: {
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
  },
});

module.exports = Blog;