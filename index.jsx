"use strict";

import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router';
import { StyleSheet, css } from "./lib/aphrodite.js";

const DefaultRoute = Router.DefaultRoute;
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;

import SS from "./styles/shared.js";
import blogPostList from './posts/blog-post-list.js'

import Blog from "./components/blog.js";
import Post from "./components/post.js";


var appended = false;
if (process.env.NODE_ENV === "development" && !appended) {
  var webpackScript = document.createElement("script");
  webpackScript.setAttribute("src", "/webpack-dev-server.js");
  // This will destroy everything if it is not the last script in the body
  document.body.appendChild(webpackScript);
  appended = true;
}

const App = React.createClass({
  getInitialState: function() {
    return {
      posts: blogPostList,
    };
  },
  componentDidMount: function() {
    const posts = this.state.posts;

    posts.forEach((post, idx) => {
      const client = new XMLHttpRequest();
      client.open("GET", post.url);
      client.onreadystatechange = () => {
        if (client.readyState !== XMLHttpRequest.DONE) {
          return;
        }
        if (client.status !== 200) {
          return;
        }
        const responseText = client.responseText;
        const curPosts = this.state.posts.slice();
        if (responseText.length > 0 && curPosts[idx].content == null) {
          curPosts[idx] = {
            ...curPosts[idx],
            content: responseText,
          };
          this.setState({
            posts: curPosts,
          });
        }
      };
      client.send();
    });
  },
  render: function () {
    const {
      posts,
    } = this.state;
    if (!posts.every((post) => { return post.content; })) {
      return <div/>;
    }
    return <div className={css(ST.blog)}>
      <RouteHandler posts={posts} />
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

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="post" path="/post/:slug" handler={Post} />
    <Route name="tag" path="/tag/:tag" handler={Blog} />
    <DefaultRoute handler={Blog} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  const params = state.params
  ReactDOM.render(
    <Handler params={params} />,
    document.getElementById("content")
  );
});