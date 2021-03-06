"use strict";

import React from "react";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

import PostSummary from "./post-summary.js";
import HomeButton from "./home-button.js";

const Blog = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(PostSummary.propTypes.post),
  },

  render: function () {
    const {
      params,
    } = this.props;

    const tag = params.tag != null ? params.tag.replace(/-/g, " ") : null;

    const posts = [];
    this.props.posts.forEach((post) => {
      if (params.tag != null) {
        // There is a tag specified
        if (post.tags.indexOf(tag) > -1) {
          // This post has that tag so show it
          posts.push(post);
        }
      } else {
        // No tag, so show all the posts
        posts.push(post);
      }
    });

    const corgiImages = [
      'corgi', 'corgi-sitting', 'corgi-bone', 'corgi-upsidedown'
    ];
    const corgiImage = corgiImages[
      Math.floor(Math.random() * corgiImages.length)
    ];

    return <div>
      <div className={css(ST.alignContent)}>
        {params.tag != null && <HomeButton />}
        <div className={css(ST.headerContent)}>
          <img
            src="../images/trees.jpg"
            alt=""
            className={css(ST.headerImage)}
          />
          <h1 className={css(ST.title)}>
            All of the Northwood
          </h1>
          {params.tag != null &&
          <div className={css(ST.tagLine)}>
            Posts tagged <span className={css(ST.tagName)}>#{tag}</span>
          </div>}
        </div>
      </div>

      <div className={css(ST.posts)}>
        {posts.length === 0 && <div>
          <div className={css(ST.divider)} />
          <div
            className={css(ST.alignContent, ST.noPosts)}
          >
            {"No posts found </3"}
          </div>
        </div>}

        {posts.map((post, idx) => {
          return <div key={`post-${idx}`}>
            <div className={css(ST.divider)} />
            <PostSummary post={post} />
          </div>;
        })}
      </div>
      <div className={css(ST.footerContent)}>
        <img
          src={`../images/${corgiImage}.jpg`}
          alt=""
          className={css(ST.corgiImage)}
        />
      </div>
    </div>;
  },
});

const ST = StyleSheet.create({
  headerImage: {
    marginTop: 30,
    width: 120,
    [SS.queries.small]: {
      marginTop: 0,
      width: 90,
    },
  },
  alignContent: {
    margin: "20px auto 0",
    maxWidth: SS.layout.maxWidth,
    padding: `0 ${SS.layout.padding}px`,
  },
  headerContent: {
    textAlign: "center",
  },
  title: {
    fontSize: SS.font.largestSize,
    lineHeight: SS.font.largeLineHeight,
    [SS.queries.small]: {
      fontSize: SS.font.largerSize,
    },
  },
  divider: {
    borderTop: `1px solid ${SS.color.greyLight}`,
    margin: "40px auto",
    width: 50,
    [SS.queries.small]: {
      margin: "20px auto",
    },
  },
  tagLine: {
    ...SS.accentText,
    fontSize: SS.font.mediumSize,
    marginTop: 10,
    textTransform: "none",
  },
  tagName: {
    color: SS.color.greyLight,
    fontSize: SS.font.mediumSize,
    textTransform: "uppercase",
  },
  posts: {
    paddingBottom: 100,
  },
  noPosts: {
    color: SS.color.greyLight,
    fontSize: SS.font.largeSize,
    textAlign: "center",
  },
  footerContent: {
    marginBottom: 100,
    textAlign: "center",
  },
  corgiImage: {
    maxWidth: 150,
  },
});

module.exports = Blog;