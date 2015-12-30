"use strict";

import moment from "moment";
import React from "react";
import { StyleSheet, css } from "../lib/aphrodite.js";

import SS from "../styles/shared.js";

const SC = {
  squareSize: 12,
  squareMargin: 1,
};

const Day = (props) => {
  return <div className={css(ST.dateSquare)}>
  </div>;
};
const MathFactsYearCalendar = React.createClass({
  render: function () {
    const dateMoment = moment("2015-01-01");

    const dayOutput = [];
    while (dateMoment.year() === 2015) {
      const dayOfYear = dateMoment.dayOfYear();
      const dayOfWeek = dateMoment.day();

      if (dayOfYear === 1) {
        dayOutput.push(<div
          className={css(ST.dateSquareSpacer)}
          key={0}
          style={{
            width: dayOfWeek * SC.squareSize +
              (dayOfWeek - 1) * SC.squareMargin * 2
          }}
        />);
      }

      dayOutput.push(<Day
          date={dayOfYear}
          key={dayOfYear}
        />);

      dateMoment.add(1, "day");
    }

    return <div className={css(ST.dateSquares)}>
      {dayOutput}
    </div>;
  },
});

const ST = StyleSheet.create({
  dateSquares: {
    lineHeight: `${SC.squareSize}px`,
    width: (SC.squareSize * 7) + (SC.squareMargin * (7 + 1) * 2),
  },
  dateSquare: {
    background: '#ddd',
    display: "inline-block",
    height: SC.squareSize,
    margin: SC.squareMargin,
    width: SC.squareSize,
  },
  dateSquareSpacer: {
    background: 'transparent',
    display: "inline-block",
    height: SC.squareSize,
    margin: SC.squareMargin,
  },
});

module.exports = MathFactsYearCalendar;
