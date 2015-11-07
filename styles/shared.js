const color = {
  black: "#333",
  grey: "#999",
  white: "#fff",
};
const font = {
  serifFamily: "Lora, serif",
  sansFamily: "Lato, sans-serif",
  largeSize: 50,
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
    color: color.black,
  },
  ":focus": {
    color: color.black,
  },
  ":active": {
    color: color.black,
  },
};

module.exports = {
  color: color,
  font: font,
  layout: layout,
  link: link,
};