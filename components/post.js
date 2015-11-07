"use strict";

import React from "react";
import Router from "react-router";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

const Link = Router.Link;

import SS from "../styles/shared.js";

import PostContent from "./post-content.js";

const Post = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        content: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
      })
    ),
  },

  render: function () {
    const post = this.props.posts.find((post) => {
      return post.slug === this.props.params.slug;
    });
    if (post == null) {
      return <div>404</div>;
    }
    const {
      content,
      title,
    } = post;
    return <div>
      <div className={css(ST.header)}>
        <Link className={css(ST.link)} to={"/"}>
          &lsaquo; Home
        </Link>
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
          <PostContent markdownContent={content} />
        </div>
      </div>
    </div>;
  },
});

const ST = StyleSheet.create({
  link: {
    color: SS.color.grey,
    fontFamily: SS.font.sansFamily,
    fontSize: SS.font.smallSize,
    textDecoration: "none",
    ":hover": {
      color: SS.color.black,
    },
    ":focus": {

    },
    ":active": {

    },
    ":visited": {

    },
  },
  header: {
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
    padding: `0 ${SS.layout.padding}px 20px`,
  },
  title: {
    fontSize: SS.font.largeSize,
    lineHeight: SS.font.largeLineHeight,
    paddingTop: 80,
    textAlign: "center",
  },
  date: {
    color: SS.color.grey,
    fontFamily: SS.font.sansFamily,
    fontSize: SS.font.smallSize,
    textAlign: "center",
    textTransform: "uppercase",
  },
  post: {
    padding: `0 ${SS.layout.padding}px`,
  },
  postContent: {
    fontSize: SS.font.contentSize,
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
  },
});

module.exports = Post;