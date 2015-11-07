"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Navigation from "./components/navigation.js";

const App = React.createClass({
  getInitialState: function() {
    return {
      posts: [
        {
          title: "Title of this Blog Post",
          url: "../posts/fake.md",
        },
        {
          title: "Another Fake Post",
          url: "../posts/anotherfake.md",
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
    return <Navigation posts={this.state.posts} />;
  },
});

ReactDOM.render(<App />, document.getElementById("content"));