"use strict";

import React from "react";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

import Post from "./post.js";

const Blog = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(Post.propTypes.post),
  },

  render: function () {
    const {
      posts,
    } = this.props;

    return <div className={css(ST.blog)}>

      {posts.map((post, idx) => {
        return <Post
          post={post}
          key={`post-${idx}`}
        />;
      })}

    </div>;
  },
});

const ST = StyleSheet.create({
  blog: {
    color: SS.color.black,
    fontFamily: SS.font.serifFamily,
    lineHeight: SS.font.lineHeight,
  },
});

module.exports = Blog;