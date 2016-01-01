"use strict";

import moment from "moment";
import React from "react";
import { StyleSheet, css } from "../lib/aphrodite.js";

import mathFactsCommits from "./math-facts-commits.js";
import SS from "../styles/shared.js";

const SC = {
  squareSize: 12,
  squareMargin: 1,
};
SC.totalSquareSize = SC.squareSize + 2 * SC.squareMargin;

const mathFactsCommitsByDay = () => {
  const parsed = [];
  const commits = mathFactsCommits.reverse();
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const date = moment(commit.commit.author.date, "YYYY-MM-DD")
    const dayOfYear = date.dayOfYear();
    if (!parsed[dayOfYear]) {
      parsed[dayOfYear] = [];
    }
    parsed[dayOfYear].push(commit)
  }

  return parsed;
}();

const Day = (props) => {
  const commits = mathFactsCommitsByDay[props.date];
  const color = Math.min(commits ? Math.ceil(commits.length / 2) : 0, 4);
  const colorStyle = ST[`dateSquareColor${color}`];
  return <div
    className={css(
      ST.dateSquare,
      colorStyle
    )}
  />;
};

const MathFactsYearCalendar = React.createClass({
  render: function () {
    const startDate = "2015-01-01";
    const dayMoment = moment(startDate);
    const yearStartsOn = dayMoment.dayOfYear();
    const dayOutput = [];
    while (dayMoment.year() === 2015) {
      const dayOfYear = dayMoment.dayOfYear();
      const dayOfWeek = dayMoment.day();

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

      dayMoment.add(1, "day");
    }

    const monthMoment = moment(startDate);
    const monthOutput = [];
    let prevWeek = 1;
    for (let i = 0; i < 12; i++) {
      const week = monthMoment.week();
      const marginTop = (week - prevWeek - 1) * SC.totalSquareSize;
      monthOutput.push(<div
        className={css(ST.month)}
        key={i}
        style={{marginTop: i === 0 ? 0 : marginTop}}
      >
        {monthMoment.format("MMM")}
      </div>);
      prevWeek = monthMoment.week();
      monthMoment.add(1, "month");
    }

    return <div className={css(ST.wrapper)}>
      <div className={css(ST.months)}>
        {monthOutput}
      </div>
      <div className={css(ST.dateSquares)}>
        {dayOutput}
      </div>
    </div>;
  },
});

const ST = StyleSheet.create({
  wrapper: {
    display: "flex",
  },
  //Months
  months: {
    marginRight: 5,
    textAlign: "right",
  },
  month:{
    ...SS.accentText,
    lineHeight: `${SC.totalSquareSize}px`,
    textTransform: "capitalize",
  },
  // Days
  dateSquares: {
    lineHeight: `${SC.squareSize}px`,
    width: (SC.squareSize * 7) + (SC.squareMargin * (7 + 1) * 2),
  },
  dateSquare: {
    display: "inline-block",
    height: SC.squareSize,
    margin: SC.squareMargin,
    width: SC.squareSize,
  },
  dateSquareColor0: {
    background: '#eeeeee'
  },
  dateSquareColor1: {
    background: '#d6e685',
  },
  dateSquareColor2: {
    background: '#8cc665',
  },
  dateSquareColor3: {
    background: '#44a340',
  },
  dateSquareColor4: {
    background: '#1e6823',
  },
  dateSquareSpacer: {
    background: 'transparent',
    display: "inline-block",
    height: SC.squareSize,
    margin: SC.squareMargin,
  },
});

module.exports = MathFactsYearCalendar;
