"use strict";

import React from "react";

import PostSummary from "./post-summary.js";

const Blog = React.createClass({
  propTypes: {
    posts: React.PropTypes.arrayOf(PostSummary.propTypes.post),
  },

  render: function () {
    const {
      posts,
    } = this.props;

    return <div>
      {posts.map((post, idx) => {
        return <PostSummary
          post={post}
          key={`post-${idx}`}
        />;
      })}
    </div>;
  },
});

module.exports = Blog;