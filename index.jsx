"use strict";

const React = require('react');

import Blog from './components/blog.js';

const App = React.createClass({
  render: function () {
    return <Blog />;
  },
});

React.render(<App />, document.body);