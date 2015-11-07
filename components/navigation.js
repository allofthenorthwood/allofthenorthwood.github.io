"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Blog from "./blog.js";
import Post from "./post.js";

const Navigation = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(Post.propTypes.post),
  },
  getInitialState: function() {
    return {
      currentPost: 0,
    };
  },
  render: function () {
    const {
      currentPost,
    } = this.state;
    const {
      posts,
    } = this.props;

    if (!posts.every((post) => { return post.content; })) {
      // Still Loading....
      return <div></div>;
    }

    if (currentPost != null) {
      return <Post
        back={this.goHome}
        post={posts[currentPost]} />;
    }

    return <Blog posts={posts} />;
  },
});

module.exports = Navigation;