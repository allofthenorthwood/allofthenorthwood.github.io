const color = {
  black: "#333",
  grey: "#999",
  greyLight: "#ccc",
  white: "#fff",
};
const font = {
  serifFamily: "Lora, serif",
  sansFamily: "Lato, sans-serif",
  largeSize: 50,
  lessLargeSize: 30,
  largeLineHeight: 1.2,
  contentSize: 20,
  smallSize: 12,
  lineHeight: 1.6,
};
const layout = {
  maxWidth: 700,
  padding: 20,
};
const link = {
  color: color.grey,
  fontFamily: font.sansFamily,
  fontSize: font.smallSize,
  textDecoration: "none",
  textTransform: "uppercase",
  ":hover": {
    opacity: 0.7,
  },
  ":focus": {
    opacity: 0.7,
  },
  ":active": {
    opacity: 0.7,
  },
};

module.exports = {
  color: color,
  font: font,
  layout: layout,
  link: link,
};