"use strict";

import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router';
import { StyleSheet, css } from "./lib/aphrodite.js";

const DefaultRoute = Router.DefaultRoute;
const Link = Router.Link;
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;

import SS from "./styles/shared.js";

import Blog from "./components/blog.js";
import Post from "./components/post.js";

const App = React.createClass({
  getInitialState: function() {
    return {
      posts: [
        {
          date: "Sunday Nov 8, 2015",
          title: "How to get work done in an open office",
          slug: "open-office",
          url: "../posts/open-office.md",
          tags: [
            "advice",
            "drawings",
          ],
        },
        {
          date: "Saturday Nov 7, 2015",
          title: "Undertale",
          slug: "undertale",
          url: "../posts/undertale.md",
          tags: [
            "no spoilers",
            "drawings",
          ],
        },
        {
          date: "Saturday Apr 18, 2015",
          title: "Math Facts part 1: The idea",
          slug: "math-facts-part-1",
          url: "../posts/math-facts-part-1.md",
          tags: [
            "math facts",
          ],
        },
      ],
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