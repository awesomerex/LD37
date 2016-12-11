module.exports = {
  factory: function gamepad() {
    return {
      index: 0,
      speed: 1,
      threshold: 0.3
    };
  },
  reset: function(gamepad) {
    gamepad.index = 0;
    gamepad.speed = 1;
    gamepad.threshold = 0.3;
  }
}
