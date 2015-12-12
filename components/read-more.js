"use strict";

import React from "react";
import Router from "react-router";
import { StyleSheet, css } from "../lib/aphrodite.js";

const Link = Router.Link;

import SS from "../styles/shared.js";

import Icon from "./icon.js";

const ReadMoreButton = React.createClass({
  propTypes: {
    href: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      focus: false,
    };
  },
  render: function() {
    return <Link
      className={css(ST.link)}
      to={this.props.href}
      onMouseOver={() => {this.setState({focus: true})}}
      onMouseOut={() => {this.setState({focus: false})}}
      onFocus={() => {this.setState({focus: true})}}
      onBlur={() => {this.setState({focus: false})}}
    >
      <span className={css(ST.linkText)}>Read More</span>
      <span className={css(ST.icon, this.state.focus && ST.iconFocus)}>
        <Icon
          color={SS.link.color}
          type="angleBracketRight"
          size={SS.link.fontSize - 2}
        />
      </span>
    </Link>;
    return <Link
      className={css(ST.link)}
      to={"/"}
    >
      <span className={css(ST.icon, this.state.focus && ST.iconFocus)}>
        <Icon
          color={SS.link.color}
          type="angleBracketLeft"
          size={SS.link.fontSize - 2}
        />
      </span>
      <span className={css(ST.linkText)}>Home</span>
    </Link>;
  },
});

const ST = StyleSheet.create({
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
    marginLeft: 4,
    marginRight: 4,
    marginTop: 1,
    transition: "margin 0.2s ease-out",
  },
  iconFocus: {
    marginLeft: 8,
    marginRight: 0,
  },
});

module.exports = ReadMoreButton;