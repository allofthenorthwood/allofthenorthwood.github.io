"use strict";

import React from "react";
import Router from "react-router";
import { StyleSheet, css } from "../lib/aphrodite.js";

const Link = Router.Link;

import SS from "../styles/shared.js";

import Icon from "./icon.js";

const PostNavigation = React.createClass({
  propTypes: {
    next: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
    }),
    prev: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
    }),
  },
  getInitialState: function() {
    return {
      focusNext: false,
      focusPrev: false,
    };
  },
  render: function() {
    const {
      next,
      prev,
    } = this.props;
    const {
      focusNext,
      focusPrev,
    } = this.state;
    return <div className={css(ST.wrapper)}>
      <div className={css(ST.content)}>
        {prev ? <Link
          to={'/post/' + prev.slug}
          className={css(ST.link, ST.prev)}
          onMouseOver={() => {this.setState({focusPrev: true})}}
          onMouseOut={() => {this.setState({focusPrev: false})}}
          onFocus={() => {this.setState({focusPrev: true})}}
          onBlur={() => {this.setState({focusPrev: false})}}
        >
          <span
            className={css(
              ST.icon,
              ST.prevIcon,
              focusPrev && ST.prevIconHover
            )}
          >
            <Icon
              color={SS.link.color}
              type="angleBracketLeft"
              size={SS.link.fontSize - 2}
            />
          </span>
          <span className={css(ST.linkText, ST.prevText)}>
            {prev.title}
          </span>
        </Link> : <div className={css(ST.link)} />}
        {next && <Link
          to={'/post/' + next.slug}
          className={css(ST.link, ST.next)}
          onMouseOver={() => {this.setState({focusNext: true})}}
          onMouseOut={() => {this.setState({focusNext: false})}}
          onFocus={() => {this.setState({focusNext: true})}}
          onBlur={() => {this.setState({focusNext: false})}}
        >
          <span
            className={css(
              ST.icon,
              ST.nextIcon,
              focusNext && ST.nextIconHover
            )}
          >
            <Icon
              color={SS.link.color}
              type="angleBracketRight"
              size={SS.link.fontSize - 2}
            />
          </span>
          <span className={css(ST.linkText, ST.nextText)}>
            {next.title}
          </span>
        </Link>}
      </div>
    </div>;
  },
});

const ST = StyleSheet.create({
  wrapper: {
    borderTop: `1px solid ${SS.color.greyLight}`,
  },
  content: {
    margin: "0 auto",
    maxWidth: SS.layout.maxWidth,
    padding: `0 ${SS.layout.padding}px`,
  },

  next: {
    paddingRight: 0,
    textAlign: "right",
  },
  nextIcon: {
    float: "right",
  },
  nextIconHover: {
    marginLeft: 8,
    marginRight: 0,
  },
  nextText: {
    marginRight: 20,
  },
  prev: {
    paddingLeft: 0,
  },
  prevIcon: {
    float: "left",
  },
  prevIconHover: {
    marginLeft: 0,
    marginRight: 8,
  },
  prevText: {
    marginLeft: 20,
  },


  link: {
    ...SS.link,
    boxSizing: "border-box",
    display: "inline-block",
    fontSize: SS.font.mediumSize,
    padding: "40px 10px",
    textTransform: "none",
    verticalAlign: "top",
    width: "50%",

    ":hover": {
      opacity: 0.7,
      textDecoration: "none",
    },
    ":focus": {
      opacity: 0.7,
      textDecoration: "none",
    },
  },
  linkText: {
    color: SS.color.black,
    display: "block",
    verticalAlign: "top",
  },
  icon: {
    display: "inline-block",
    marginLeft: 4,
    marginRight: 4,
    marginTop: 2,
    transition: "margin 0.2s ease-out",
  },
});

module.exports = PostNavigation;