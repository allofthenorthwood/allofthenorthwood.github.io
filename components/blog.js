"use strict";

import React from "react";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

import PostSummary from "./post-summary.js";

const Blog = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(PostSummary.propTypes.post),
  },

  render: function () {
    const {
      posts,
    } = this.props;

    return <div>
      <div className={css(ST.header)}>
        <img
          src="../images/trees.jpg"
          className={css(ST.headerImage)}
        />
        <h1 className={css(ST.title)}>
          All of the Northwood
        </h1>
      </div>

      {posts.map((post, idx) => {
        return <div key={`post-${idx}`}>
          <div className={css(ST.divider)} />
          <PostSummary post={post} />
        </div>;
      })}
    </div>;
  },
});

const ST = StyleSheet.create({
  header: {
    textAlign: "center",
  },
  headerImage: {
    marginTop: 30,
    width: 120,
  },
  headerContent: {
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
    textAlign: "center",
  },
  title: {
    fontSize: SS.font.largeSize,
    lineHeight: SS.font.largeLineHeight,
  },
  divider: {
    borderTop: `1px solid ${SS.color.greyLight}`,
    margin: "40px auto",
    width: 50,
  },
});

module.exports = Blog;