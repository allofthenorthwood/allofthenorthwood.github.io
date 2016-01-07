"use strict";

import moment from "moment";
import React from "react";
import { StyleSheet, css } from "../lib/aphrodite.js";

import mathFactsCommits from "./math-facts-commits.js";
import SS from "../styles/shared.js";

const SC = {
  squareSize: 12,
  squarePadding: 1,
};
SC.totalSquareSize = SC.squareSize + 2 * SC.squarePadding;
SC.dateSquaresWidth = (SC.squareSize * 7) + (SC.squarePadding * (7 + 1) * 2);

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
  const {
    activeDay,
    day,
    hoverDay,
  } = props;
  const commits = mathFactsCommitsByDay[day];
  const color = Math.min(commits ? Math.ceil(commits.length / 2) : 0, 4);
  const colorStyle = ST[`dateSquareColor${color}`];
  const opacity = activeDay == null ? 1 :
    (day === hoverDay ? 1 : (day === activeDay ? 1 : 0.5));

  return <div
    className={css(ST.dateSquareWrapper)}
    onClick={() => {
      props.setActiveDay(day === activeDay ? null : day)
    }}
    onMouseOver={() => {
      props.setHoverDay(day)
    }}
    onMouseOut={() => {
      props.setHoverDay(null)
    }}
    style={{
      opacity: opacity,
    }}
  >
    <div
      className={css(
        ST.dateSquare,
        colorStyle
      )}
      style={{
        borderWidth: hoverDay == null ? 0 : (hoverDay === day ? 1 : 0),
      }}
    />
  </div>;
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
            (dayOfWeek - 1) * SC.squarePadding * 2
        }}
      />);
    }

    dayOutput.push(<Day
      activeDay={props.activeDay}
      day={dayOfYear}
      hoverDay={props.hoverDay}
      key={dayOfYear}
      setActiveDay={props.setActiveDay}
      setHoverDay={props.setHoverDay}
    />);

    dayMoment.add(1, "day");
  }

  return <div className={css(ST.dateSquaresWrapper)}>
    <div className={css(ST.dateSquares)}>{dayOutput}</div>
  </div>;
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
      style={{marginTop: marginTop < 0 ? 0 : marginTop}}
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
  const day = moment(`${props.day} 2015`, "DDD YYYY")
    .format("dddd MMM D, YYYY");
  return <div className={css(ST.commits)}>
    <h3 className={css(ST.h3)}>Commits from {day}</h3>
    <ul className={css(ST.commitList)}>
    {commits.map((commit, idx) => {
      const rawMessage = commit.commit.message;
      const splitMessage = rawMessage.split("\n\n");
      const message = splitMessage[0] ? splitMessage[0] : rawMessage;
      return <li key={idx} className={css(ST.commit)}>
        {message}
      </li>
    })}
    </ul>
  </div>;
};

const WeekMarkers = (props) => {
  let prevWeek = 0;
  weekMarkersOutput = props.weekMarkers.map((weekMarker, week) => {
    const marginTop = (week - prevWeek - 1) * SC.totalSquareSize;
    const weekMarkerOutput = <div
      className={css(ST.weekMarker)}
      key={week}
      style={{marginTop: marginTop < 0 ? 0 : marginTop}}
    >
      {props.hideTitles ? '' : weekMarker.title}
    </div>;
    prevWeek = week;
    return weekMarkerOutput;
  });
  return <div className={css(ST.weekMarkers)}>
    {weekMarkersOutput}
  </div>;
};

const MathFactsYearCalendar = React.createClass({
  getInitialState: function() {
    return {
      activeDay: null,
      hoverDay: null,
    };
  },
  componentWillMount: function() {
    const weekMarkers = [];
    const format = "MMM D YYYY";
    weekMarkers[moment("Apr 23 2015", format).week()] = {
      title: "Build prototype and submit project proposal",
      nWeeks: 1,
    };
    weekMarkers[moment("Apr 26 2015", format).week()] = {
      title: "5-week project: build basic functionality and test at KLS",
      nWeeks: 5,
    };
    weekMarkers[moment("Jun 7 2015", format).week()] = {
      title: "Minor clean-up",
      nWeeks: 1,
    };
    weekMarkers[moment("Aug 20 2015", format).week()] = {
      title: "Math facts follow-up meeting (Aug 20)",
      nWeeks: 1,
    };
    weekMarkers[moment("Sep 27 2015", format).week()] = {
      title: "Add Firebase and internal download page",
      nWeeks: 1,
    };
    weekMarkers[moment("Oct 4 2015", format).week()] = {
      title: "Daily user-testing with KLS students",
      nWeeks: 3,
    };
    weekMarkers[moment("Oct 29 2015", format).week()] = {
      title: "Refactor and start working with Matt to get ready to ship",
      nWeeks: 1,
    };
    weekMarkers[moment("Nov 1 2015", format).week()] = {
      title: "Start blogging about the math facts project",
      nWeeks: 2,
    };
    weekMarkers[moment("Nov 15 2015", format).week()] = {
      title: "Set up test flight and make continuous app improvements",
      nWeeks: 2,
    };
    weekMarkers[moment("Dec 1 2015", format).week()] = {
      title: "Make plan for larger beta-testing rollout",
      nWeeks: 2,
    };
    weekMarkers[moment("Dec 15 2015", format).week()] = {
      title: "Start making this chart and writing this blog post",
      nWeeks: 2,
    };
    this.weekMarkers = weekMarkers;
  },
  setActiveDay: function(day) {
    this.setState({
      activeDay: day,
    });
  },
  setHoverDay: function(day) {
    this.setState({
      hoverDay: day,
    });
  },
  render: function() {
    const startDate = "2015-01-01";
    const {
      activeDay,
      hoverDay,
    } = this.state;
    // TODO: only re-render the things that change
    const highlightDay = activeDay ? activeDay : hoverDay;
    return <div className={css(ST.wrapper)}>
      <Months startDate={startDate} />
      <Days
        activeDay={activeDay}
        hoverDay={hoverDay}
        startDate={startDate}
        setActiveDay={this.setActiveDay}
        setHoverDay={this.setHoverDay}
      />
      <WeekMarkers weekMarkers={this.weekMarkers} hideTitles={highlightDay}/>
      {highlightDay && <Commits day={highlightDay}/>}
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
  // Week markers
  weekMarkers: {
    marginLeft: 10,
  },
  weekMarker: {
    ...SS.accentText,
    lineHeight: `${SC.totalSquareSize}px`,
    height: `${SC.totalSquareSize}px`,
  },
  // Months
  months: {
    marginRight: 5,
    textAlign: "right",
  },
  month:{
    ...SS.accentText,
    lineHeight: `${SC.totalSquareSize}px`,
    height: `${SC.totalSquareSize}px`,
  },
  // Days
  dateSquaresWrapper: {
    flex: 0,
    minWidth: SC.dateSquaresWidth,
  },
  dateSquares: {
    display: "flex",
    flexWrap: "wrap",
    lineHeight: `${SC.squareSize}px`,
  },
  dateSquareWrapper: {
    flex: 0,
    lineHeight: `${SC.totalSquareSize}px`,
    padding: SC.squarePadding,
  },
  dateSquare: {
    borderColor: SS.color.black,
    borderStyle: "solid",
    boxSizing: "border-box",
    height: SC.squareSize,
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
    margin: SC.squarePadding,
  },
});

module.exports = MathFactsYearCalendar;
