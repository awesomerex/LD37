module.exports = {
  factory: function position() {
    return {
      x: 0,
      y: 0,
      rotation: 0
    };
  },
  reset: function(position) {
    position.x = 0;
    position.y = 0;
    position.rotation = 0;
  }
}
