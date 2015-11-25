"use strict";

import React from "react";
import Router from "react-router";
import SimpleMarkdown from "simple-markdown";
import { StyleSheet, css } from "../lib/aphrodite.js";

const Link = Router.Link;

import SS from "../styles/shared.js";

import Icon from "./icon.js";
import PostContent from "./post-content.js";

const PostSummary = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      tags: React.PropTypes.arrayOf(React.PropTypes.string),
      title: React.PropTypes.string.isRequired,
    }),
  },

  render: function () {
    const {
      content,
      date,
      slug,
      tags,
      title,
    } = this.props.post;

    return <div>
      <div className={css(ST.post)}>
        <h2 className={css(ST.title)}>
          <Link className={css(ST.titleLink)} to={`/post/${slug}`}>
            {title}
          </Link>
        </h2>
        <div className={css(ST.date)}>
          {date}
        </div>
        <div className={css(ST.postContent)}>
          <PostContent markdownContent={content.split("\n\n")[0]} />

          <div className={css(ST.tags)}>
            {tags.map((tag, idx) => {
              return <span
                className={css(ST.tag)}
                key={`tag-${idx}`}
              >
                #{tag}
              </span>;
            })}
          </div>

          <div className={css(ST.postLink)}>
            <Link className={css(ST.link)} to={`/post/${slug}`}>
              <span className={css(ST.linkText)}>Read More</span>
              <span className={css(ST.icon)}>
                <Icon
                  color={SS.link.color}
                  type="angleBracketRight"
                  size={SS.link.fontSize - 2}
                />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>;
  },
});

const ST = StyleSheet.create({
  title: {
    fontSize: SS.font.largeSize,
    lineHeight: SS.font.largeLineHeight,
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
    textAlign: "center",
  },
  titleLink: {
    color: SS.color.greenLight,
    textDecoration: "none",
    ":hover": {
      color: SS.color.green,
    },
    ":focus": {
      opacity: 0.7,
    },
  },
  date: {
    ...SS.accentText,
    textAlign: "center",
  },
  post: {
    padding: `0 ${SS.layout.padding}px`,
  },
  postContent: {
    fontSize: SS.font.contentSize,
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
  },
  postLink: {
    textAlign: "right",
  },
  link: {
    ...SS.link,
    display: "inline-block",
    height: 30,
  },
  linkText: {
    verticalAlign: "top",
  },
  icon: {
    display: "inline-block",
    marginLeft: 2,
    marginTop: 1,
  },
  tags: {
    ...SS.accentText,
    color: SS.color.greyLight,
    float: "left",
    marginTop: 7,
    textAlign: "center",
  },
  tag: {
    marginRight: 10,
  },
});

module.exports = PostSummary;