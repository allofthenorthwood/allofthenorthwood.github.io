"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Blog from "./components/blog.js";

const App = React.createClass({
  getInitialState: function() {
    return {
      post: "",
    };
  },
  componentDidMount: function() {
    // TODO: get all posts
    var client = new XMLHttpRequest();
    client.open('GET', '../posts/fake.md');
    client.onreadystatechange = () => {
      this.setState({
        post: client.responseText
      });
    };
    client.send();
  },
  render: function () {
    return <Blog post={this.state.post} />;
  },
});

ReactDOM.render(<App />, document.getElementById("content"));