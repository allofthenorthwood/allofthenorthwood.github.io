"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Blog from "./components/blog.js";

const App = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
    };
  },
  componentDidMount: function() {
    const posts = [
      {
        title: 'Title of this Blog Post',
        url: '../posts/fake.md',
      },
      {
        title: 'Another Fake Post',
        url: '../posts/anotherfake.md',
      },
    ];
    posts.forEach((post, idx) => {
      const client = new XMLHttpRequest();
      client.open('GET', post.url);
      client.onreadystatechange = () => {
        const responseText = client.responseText;
        if (responseText.length > 0) {
          const curPosts = this.state.posts.slice();
          curPosts[idx] = responseText;
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

    if (posts.length === 0) {
      // not loaded
      return <div></div>;
    }

    return <Blog posts={posts} />;
  },
});

ReactDOM.render(<App />, document.getElementById("content"));