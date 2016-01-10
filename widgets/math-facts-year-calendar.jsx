"use strict";

import moment from "moment";
import React from "react";
import { StyleSheet, css } from "../lib/aphrodite.js";

import Icon from "../components/icon.js";
import mathFactsCommits from "./math-facts-commits.js";
import SS from "../styles/shared.js";

// from http://underscorejs.org/docs/underscore.html
const _now = Date.now || function() {
  return new Date().getTime();
};
const _throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : _now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = _now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

const SC = {
  squareSize: 14,
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

const Day = React.createClass({
  getInitialState: function() {
    return {
      hover: false,
    };
  },
  setHover: function(hoverState) {
    this.setState({
      hover: hoverState,
    });
  },
  render: function() {
    const {
      activeDay,
      day,
      hoverDay,
    } = this.props;
    const {
      hover,
    } = this.state;
    const commits = mathFactsCommitsByDay[day];
    const color = Math.min(commits ? Math.ceil(commits.length / 2) : 0, 4);
    const colorStyle = ST[`dateSquareColor${color}`];
    const opacity = activeDay == null ? 1 :
      (hover ? 1 : (day === activeDay ? 1 : 0.5));

    return <div
      className={css(ST.dateSquareWrapper)}
      onClick={() => {
        this.props.setActiveDay(day === activeDay ? null : day)
      }}
      onMouseOver={() => {
        this.setHover(day)
        this.props.setHoverDay(commits ? day : null)
      }}
      onMouseOut={() => {
        this.setHover(null)
        this.props.setHoverDay(commits ? day : null)
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
          borderWidth: hover ? 1 : 0,
        }}
      />
    </div>;
  },
});

const Days = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.activeDay !== nextProps.activeDay;
  },
  componentDidUpdate: function(oldProps) {
    if (oldProps.hoverDay) {
      this.refs[`week-${oldProps.hoverDay}`].setHover(false);
    }
    if (this.props.hoverDay) {
      this.refs[`week-${oldProps.hoverDay}`].setHover(true);
    }
  },
  render: function() {
    const dayMoment = moment(this.props.startDate);
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
        activeDay={this.props.activeDay}
        day={dayOfYear}
        hoverDay={this.props.hoverDay}
        key={dayOfYear}
        ref={`week-${dayOfYear}`}
        setActiveDay={this.props.setActiveDay}
        setHoverDay={this.props.setHoverDay}
      />);

      dayMoment.add(1, "day");
    }

    return <div
      className={css(ST.dateSquaresWrapper)}
      onMouseOut={() => {
        this.props.setHoverDay(null)
      }}
    >
      <div className={css(ST.dateSquares)}>{dayOutput}</div>
    </div>;
  },
});

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
    <div className={css(ST.commitsContent)}>
      <a
        href="#"
        className={css(ST.closeButton)}
        onClick={(e) => {
          e.preventDefault();
          props.close();
        }}
      >
        &times;
      </a>
      <h3 className={css(ST.commitsTitle)}>Commits from {day}</h3>
      {(commits.length == 0) && <div className={css(ST.noCommits)}>
        (no commits on this day)
      </div>}
      {(commits.length > 0) && <ul className={css(ST.commitList)}>
      {commits.map((commit, idx) => {
        const rawMessage = commit.commit.message;
        const splitMessage = rawMessage.split("\n\n");
        const message = splitMessage[0] ? splitMessage[0] : rawMessage;
        return <li key={idx} className={css(ST.commit)}>
          <a
            className={css(ST.commitLink)}
            href={`https://github.com/Khan/math-facts/commit/${commit.sha}`}
          >
            <span className={css(ST.commitLinkText)}>{message}</span>
            <div className={css(ST.moreIcon)}>
              <Icon
                color={SS.color.green}
                size={SC.totalSquareSize - 4}
                type="angleBracketRight"
              />
            </div>
          </a>
        </li>
      })}
      </ul>}
    </div>
  </div>;
};

const WeekMarkers = (props) => {
  const colors = [
    "#E97575", "#FFC797", "#FFDF97", "#FFEB00", "#CBED66", "#93EB65",
    "#6ADB92", "#3FE7D7", "#73BCEF", "#bcacff", "#faa8ff", "#FFA4B0",
  ];
  let curColor = 0;
  let prevWeek = 0;
  weekMarkersOutput = props.weekMarkers.map((weekMarker, week) => {
    const marginTop = (week - prevWeek - 1) * SC.totalSquareSize;
    const height = weekMarker.nWeeks * SC.totalSquareSize;
    const weekMarkerOutput = <div
      className={css(ST.weekMarker)}
      key={week}
      style={{
        height: height,
        marginTop: marginTop < 0 ? 0 : marginTop,
      }}
    >
      <div
        className={css(
          ST.weekMarkerTitle,
          props.hideTitles && ST.weekMarkerTitleSmall
        )}
        style={{
          borderLeftColor: colors[curColor++],
        }}
      >
        {props.hideTitles ? '' : weekMarker.link ?
          <a href={weekMarker.link} className={css(ST.weekMarkerLink)}>
            <span className={css(ST.weekMarkerLinkText)}>
              {weekMarker.title}
            </span>
            <span className={css(ST.moreIcon)}>
              <Icon
                color={SS.color.green}
                size={SC.totalSquareSize - 4}
                type="angleBracketRight"
              />
            </span>
          </a> : weekMarker.title}
      </div>
    </div>;
    prevWeek = week + (weekMarker.nWeeks - 1);
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
    weekMarkers[moment("Jan 1 2015", format).week()] = {
      link: "/post/math-facts-part-1",
      title: "Think about building an app to teach number sense",
      nWeeks: 3,
    };
    weekMarkers[moment("Apr 23 2015", format).week()] = {
      link: "/post/math-facts-part-2",
      title: "Build Math Facts prototype and write project proposal",
      nWeeks: 1,
    };
    weekMarkers[moment("Apr 26 2015", format).week()] = {
      link: "/post/math-facts-part-3",
      title: "5-week project: build basic functionality and test at KLS",
      nWeeks: 5,
    };
    weekMarkers[moment("Jun 7 2015", format).week()] = {
      title: "Minor clean-up",
      nWeeks: 1,
    };
    weekMarkers[moment("Aug 20 2015", format).week()] = {
      link: "/post/math-facts-part-4",
      title: "Math facts follow-up meeting (Aug 20)",
      nWeeks: 1,
    };
    weekMarkers[moment("Sep 27 2015", format).week()] = {
      link: "/post/math-facts-part-5",
      title: "Add Firebase and internal download page",
      nWeeks: 1,
    };
    weekMarkers[moment("Oct 4 2015", format).week()] = {
      link: "/post/math-facts-part-6",
      title: "Daily user-testing with KLS students",
      nWeeks: 3,
    };
    weekMarkers[moment("Oct 29 2015", format).week()] = {
      title: "Refactor and start working with Matt to get ready to ship",
      nWeeks: 1,
    };
    weekMarkers[moment("Nov 1 2015", format).week()] = {
      link: "/tag/math-facts",
      title: "Start blogging about the math facts project",
      nWeeks: 2,
    };
    weekMarkers[moment("Nov 15 2015", format).week()] = {
      title: "Set up test flight and make continuous app improvements",
      nWeeks: 3,
    };
    weekMarkers[moment("Dec 6 2015", format).week()] = {
      title: "Make plan for larger beta-testing rollout",
      nWeeks: 2,
    };
    weekMarkers[moment("Dec 20 2015", format).week()] = {
      title: "Start making this chart and writing this blog post",
      nWeeks: 2,
    };
    this.weekMarkers = weekMarkers;
  },
  setHoverDay: _throttle(function(day) {
    this.setState({
      hoverDay: day
    });
  }, 100),

  setActiveDay: function(day) {
    this.setState({
      activeDay: day,
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
      {highlightDay && <Commits
        day={highlightDay}
        close={() => {this.setActiveDay(null)}}
      />}
    </div>;
  },
});

const ST = StyleSheet.create({
  wrapper: {
    ...SS.displayFlex,
    fontFamily: SS.font.sansFamily,
  },
  // Commits
  commits: {
    background: "#fafafa",
    ...SS.displayFlex,
    ...SS.flex(1),
    ...SS.flexDirection("column"),
    ...SS.justifyContent("center"),
  },
  noCommits: {
    fontSize: SC.squareSize,
  },
  commitsContent: {
    background: "#fff",
    border: `1px solid #ddd`,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    [SS.queries.small]: {
      padding: "5px 10px",
    },
  },
  commitsTitle: {
    ...SS.accentText,
    fontSize: SC.squareSize + 2,
    [SS.queries.small]: {
      fontSize: SC.squareSize - 1,
    },
  },
  commitList: {
    paddingLeft: "1em",
    [SS.queries.small]: {
      paddingLeft: "0.5em",
    },
  },
  commit: {
    fontSize: SC.squareSize,
    listStyle: "disc",
    [SS.queries.small]: {
      fontSize: SC.squareSize - 3,
    },
  },
  commitLink: {
    color: SS.color.black,
    textDecoration: "none",
  },
  commitLinkText: {
    borderBottom: `1px solid #ddd`,
    marginRight: 2,
    transition: "margin 0.2s",
    ":hover": {
      marginRight: 6,
    },
  },
  closeButton: {
    color: SS.color.greyLight,
    ...SS.flex(0),
    float: "right",
    lineHeight: 1,
    textDecoration: "none",
    ":hover": {
      color: SS.color.grey,
    },
  },
  // Week markers
  weekMarkers: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  weekMarker: {
    ...SS.accentText,
    boxSizing: "border-box",
    color: SS.color.black,
    fontSize: SC.squareSize,
    lineHeight: `${SC.totalSquareSize}px`,
    padding: 1,
    textTransform: "none",
  },
  weekMarkerTitle: {
    ...SS.alignItems("center"),
    borderLeftStyle: "solid",
    borderLeftWidth: 5,
    ...SS.displayFlex,
    ...SS.flex(1),
    height: "100%",
    paddingLeft: 4,
  },
  weekMarkerTitleSmall: {
    ...SS.flex(0),
  },
  weekMarkerLink: {
    color: SS.color.black,
    display: "block",
    paddingRight: 2,
    paddingTop: 2,
    textDecoration: "none",
    verticalAlign: "middle",
  },
  weekMarkerLinkText: {
    borderBottom: `1px solid #ddd`,
    height: "100%",
    marginRight: 0,
    transition: "margin 0.2s",
    ":hover": {
      marginRight: 5,
    },
  },
  moreIcon: {
    display: "inline-block",
    padding: 1,
    verticalAlign: "middle",
  },
  // Months
  months: {
    marginRight: 5,
    textAlign: "right",
    [SS.queries.small]: {
      marginRight: 2,
    },
  },
  month:{
    ...SS.accentText,
    lineHeight: `${SC.totalSquareSize}px`,
    height: `${SC.totalSquareSize}px`,
    [SS.queries.small]: {
      fontSize: SC.squareSize - 3,
    },
  },
  // Days
  dateSquaresWrapper: {
    ...SS.flex(0),
    minWidth: SC.dateSquaresWidth,
  },
  dateSquares: {
    ...SS.displayFlex,
    ...SS.flexWrap("wrap"),
    lineHeight: `${SC.squareSize}px`,
  },
  dateSquareWrapper: {
    ...SS.flex(0),
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
