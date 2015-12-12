"use strict";

import React from "react";
import Router from "react-router";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

import PostContent from "./post-content.js";
import HomeButton from "./home-button.js";
import PostNavigation from "./post-navigation.js";

const Post = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        content: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
      })
    ),
  },

  render: function () {
    const posts = this.props.posts.slice().reverse();
    const postIdx = posts.reduce((ret, post, idx) => {
      return post.slug === this.props.params.slug ? idx : ret;
    }, -1);
    if (postIdx === -1) {
      window.location = '/';
    }
    const next = postIdx < posts.length - 1 ? posts[postIdx + 1] : null;
    const prev = postIdx > 0 ? posts[postIdx - 1] : null;
    const {
      content,
      date,
      title,
    } = posts[postIdx];
    return <div>
      <div className={css(ST.header)}>
        <HomeButton />
        <div className={css(ST.headerContent)}>
          <h1 className={css(ST.title)}>
            {title}
          </h1>
          <div className={css(ST.date)}>
            {date}
          </div>
        </div>
      </div>

      <div className={css(ST.post)}>
        <div className={css(ST.postContent)}>
          <PostContent markdownContent={content} />
        </div>
      </div>
      <PostNavigation next={next} prev={prev} />
    </div>;
  },
});

const ST = StyleSheet.create({
  header: {
    margin: "20px auto 60px",
    maxWidth: SS.layout.maxWidth,
    padding: `0 ${SS.layout.padding}px`,
  },
  title: {
    fontSize: SS.font.largerSize,
    lineHeight: SS.font.largeLineHeight,
    paddingTop: 70,
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
    padding: `0 ${SS.layout.padding}px 150px`,
  },
  postContent: {
    fontSize: SS.font.contentSize,
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
  },
});

module.exports = Post;