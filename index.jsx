"use strict";

import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router';
import { StyleSheet, css } from "./lib/aphrodite.js";

const DefaultRoute = Router.DefaultRoute;
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;

import SS from "./styles/shared.js";

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
      posts: [
        {
          date: "Monday Nov 23, 2015",
          title: "A weird time-tracking experiment in which I plan out my entire week in advance",
          slug: "time-tracking-experiment-nov-2015",
          url: "../posts/time-tracking-experiment.md",
          tags: [
            "time tracking",
            "experiments",
          ],
        },
        {
          date: "Friday Nov 20, 2015",
          title: "The Martian: Advice for aspiring writers",
          slug: "the-martian",
          url: "../posts/the-martian.md",
          tags: [
            "no spoilers",
            "drawings",
            "advice",
          ],
        },
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
          date: "September 2015",
          title: "Math Facts part 4: The follow-up meeting",
          slug: "math-facts-part-4",
          url: "../posts/math-facts-part-4.md",
          tags: [
            "math facts",
          ],
        },
        {
          date: "June 2015",
          title: "Math Facts part 3: The five-week solo project",
          slug: "math-facts-part-3",
          url: "../posts/math-facts-part-3.md",
          tags: [
            "math facts",
          ],
        },
        {
          date: "April 2015",
          title: "Math Facts part 2: The prototype-prototype",
          slug: "math-facts-part-2",
          url: "../posts/math-facts-part-2.md",
          tags: [
            "math facts",
          ],
        },
        {
          date: "April 2015",
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