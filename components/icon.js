'use strict';

import React from 'react';
import ReactART from 'react-art';

const {
    Group,
    Path,
    Shape,
    Surface
} = ReactART;

const BASE_ICON_SIZE = 10;
const paths = {
  /* Icons should be 10px by 10px so they scale properly with this formula */
  angleBracketLeft: `M7.5,0.8c0,0.1,0,0.2-0.1,0.2L3.5,4.9l3.8,3.8c0.1,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.2-0.1,0.2L6.9,9.6
    C6.8,9.7,6.7,9.7,6.6,9.7c-0.1,0-0.2,0-0.2-0.1L1.9,5.1C1.8,5,1.8,5,1.8,4.9c0-0.1,0-0.2,0.1-0.2l4.5-4.5C6.5,0,6.6,0,6.6,0
    c0.1,0,0.2,0,0.2,0.1l0.5,0.5C7.4,0.7,7.5,0.7,7.5,0.8z`,
  angleBracketRight: `M2.9,0.6l0.5-0.5C3.4,0,3.5,0,3.6,0c0.1,0,0.2,0,0.2,0.1l4.5,4.5c0.1,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.2-0.1,0.2L3.8,9.6
    C3.7,9.7,3.7,9.7,3.6,9.7c-0.1,0-0.2,0-0.2-0.1L2.9,9.2C2.8,9.1,2.8,9,2.8,8.9c0-0.1,0-0.2,0.1-0.2l3.8-3.8L2.9,1
    C2.8,1,2.8,0.9,2.8,0.8C2.8,0.7,2.8,0.7,2.9,0.6z`,
};

const Icon = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    size: React.PropTypes.number,
    type: React.PropTypes.oneOf([
      'angleBracketLeft',
      'angleBracketRight',
    ]).isRequired,
  },
  render: function() {
    const {
      color,
      size,
      type,
    } = this.props;
    const padding = 1;
    const innerSize = (size - padding * 2);
    const iconScale = (innerSize / BASE_ICON_SIZE);
    return (
      <Surface width={size} height={size}>
        <Group x={padding} y={padding}>
          <Group>
            <Shape
              scale={iconScale}
              fill={color}
              d={paths[type]}/>
          </Group>
        </Group>
      </Surface>
    );
  }
});

module.exports = Icon;