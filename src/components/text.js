module.exports = {
  factory: function text() {
    return {
      text: "TEXT",
      color: 0x000000,
      size: 24
    };
  },
  reset: function(text) {
    text.text = "TEXT";
    text.color = 0x000000;
    text.size = 24;
  }
}
