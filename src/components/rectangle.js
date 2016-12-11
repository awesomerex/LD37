module.exports = {
  factory: function rectangle() {
    return {
      width: 100,
      height: 100,
      color: 0x0000FF
    };
  },
  reset: function(rectangle) {
    rectangle.width = 100;
    rectangle.height = 100;
    rectangle.color = 0x0000FF;
  }
}
