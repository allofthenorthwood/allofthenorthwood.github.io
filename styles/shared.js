const color = {
  black: "#333",
  greyDark: "#888",
  grey: "#aaa",
  greyLight: "#ccc",
  white: "#fff",

  green: "#778547",
  greenLight: "#9FAE59",
};
const font = {
  serifFamily: "Lora, serif",
  sansFamily: "Lato, sans-serif",
  monoFamily: "'Source Sans Pro', monospace",
  largestSize: 50,
  largerSize: 40,
  largeSize: 30,
  titleSizeMobile: 24,
  largeLineHeight: 1.2,
  contentSize: 20,
  contentSizeMobile: 16,
  mediumSize: 16,
  smallSize: 14,
  smallSizeMobile: 12,
  lineHeight: 1.6,
};
const layout = {
  maxWidth: 700,
  padding: 20,
};
const link = {
  color: color.greenLight,
  fontFamily: font.sansFamily,
  fontSize: font.smallSize,
  textDecoration: "none",
  textTransform: "uppercase",
  ":hover": {
    color: color.green,
  },
  ":focus": {
    color: color.green,
  },
  ":active": {
    color: color.green,
  },
};

const accentText = {
  color: color.grey,
  fontFamily: font.sansFamily,
  fontSize: font.smallSize,
  textTransform: "uppercase",
};

const funLinkUnderline = {
  // From: http://tobiasahlin.com/blog/css-trick-animating-link-underlines/
  ":before": {
    backgroundColor: color.greyLight,
    content: "\"\"",
    position: "absolute",
    width: "100%",
    height: 1,
    bottom: -2,
    left: 0,
    visibility: "hidden",
    WebkitTransform: "scaleX(0)",
    transform: "scaleX(0)",
    WebkitTransition: "all 0.2s ease-in-out 0s",
    transition: "all 0.2s ease-in-out 0s",
  },
  ":hover:before": {
    visibility: "visible",
    WebkitTransform: "scaleX(1)",
    transform: "scaleX(1)",
  }
};

const queries = {
  small: '@media (max-width: 500px)',
  medium: '@media (max-width: 767px) and (min-width: 501px)',
  large: '@media (max-width: 768px) and (min-width: 1023px)',
  xlarge: '@media (min-width: 1024px)',
};

const displayFlex = {
    display: "-ms-flexbox !important; " +
        "display: -webkit-flex !important; " +
        "display: flex",
};

const flex = (val) => {
    return {
        msFlex: val,
        WebkitFlex: val,
        flex: val,
    };
};

const justifyContent = (val) => {
    return {
        MsFlexPack: val,
        WebkitJustifyContent: val,
        justifyContent: val,
    };
};

const alignItems = (val) => {
    return {
        MsFlexAlign: val,
        WebkitAlignItems: val,
        alignItems: val,
    };
};

const alignSelf = (val) => {
    return {
        MsFlexAlign: val,
        WebkitAlignItems: val,
        alignItems: val,
    };
};

const flexDirection = (val) => {
    return {
        MsFlexDirection: val,
        WebkitFlexDirection: val,
        flexDirection: val,
    };
};

const flexWrap = (val) => {
    return {
        MsFlexWrap: val,
        WebkitFlexWrap: val,
        flexWrap: val,
    };
};

module.exports = {
  accentText,
  color,
  font,
  funLinkUnderline,
  layout,
  link,
  queries,

  displayFlex,
  flex,
  alignItems,
  alignSelf,
  justifyContent,
  flexDirection,
  flexWrap,
};
