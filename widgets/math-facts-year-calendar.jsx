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
SC.dateSquaresWidth = (SC.squareSize * 7) + (SC.squareMargin * (7 + 1) * 2);

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
    onClick={() => {
      props.setActiveDay(props.date)
    }}
  />;
};

const Days = (props) => {
  const dayMoment = moment(props.startDate);
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
        setActiveDay={props.setActiveDay}
      />);

    dayMoment.add(1, "day");
  }

  return <div className={css(ST.dateSquares)}>{dayOutput}</div>;
};

const Months = (props) => {
    const monthMoment = moment(props.startDate);
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
    return <div className={css(ST.months)}>{monthOutput}</div>;
};

const Commits = (props) => {
  const commits = mathFactsCommitsByDay[props.day] || [];
  const day = moment(`${props.day} 2015`, "DDD YYYY").format("MMM D, YYYY")
  return <div className={css(ST.commits)}>
    <h3 className={css(ST.h3)}>Commits from {day}</h3>
    <ul className={css(ST.commitList)}>
    {commits.map((commit, idx) => {
      return <li key={idx} className={css(ST.commit)}>
        {commit.commit.message}
      </li>
    })}
    </ul>
  </div>;
};

const MathFactsYearCalendar = React.createClass({
  getInitialState: function() {
    return {
      activeDay: null,
    };
  },
  setActiveDay: function(day) {
    this.setState({
      activeDay: day,
    });
  },
  render: function() {
    const startDate = "2015-01-01";
    return <div className={css(ST.wrapper)}>
      <Months startDate={startDate} />
      <Days startDate={startDate} setActiveDay={this.setActiveDay}/>
      {this.state.activeDay && <Commits day={this.state.activeDay}/>}
    </div>;
  },
});

const ST = StyleSheet.create({
  wrapper: {
    display: "flex",
  },
  // Commits
  commits: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  h3: {
    fontSize: SS.font.contentSize,
  },
  commitList: {
    paddingLeft: "1em",
  },
  commit: {
    fontSize: SS.font.mediumSize,
    listStyle: "disc",
  },
  // Months
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
    flex: 0,
    lineHeight: `${SC.squareSize}px`,
    minWidth: SC.dateSquaresWidth,
  },
  dateSquare: {
    display: "inline-block",
    height: SC.squareSize,
    margin: SC.squareMargin,
    width: SC.squareSize,
    ":hover": {
      opacity: 0.7,
    },
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
