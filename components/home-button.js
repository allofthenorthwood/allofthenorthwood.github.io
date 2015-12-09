"use strict";

import React from "react";
import Router from "react-router";
import { StyleSheet, css } from "../lib/aphrodite.js";

const Link = Router.Link;

import SS from "../styles/shared.js";

import Icon from "./icon.js";

const HomeButton = React.createClass({
  render: function() {
    return <Link className={css(ST.link)} to={"/"}>
      <span className={css(ST.icon)}>
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
    marginRight: 6,
    marginTop: 1,
  },
});

module.exports = HomeButton;