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
  largeLineHeight: 1.2,
  contentSize: 20,
  mediumSize: 16,
  smallSize: 14,
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

module.exports = {
  accentText: accentText,
  color: color,
  font: font,
  layout: layout,
  link: link,
  funLinkUnderline: funLinkUnderline,
};