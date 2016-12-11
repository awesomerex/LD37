module.exports = function isShooting(gamepad) {
  return gamepad.button("a") ||
    gamepad.button("b") ||
    gamepad.button("x") ||
    gamepad.button("y") ||
    gamepad.button("left trigger") ||
    gamepad.button("left shoulder") ||
    gamepad.button("right trigger") ||
    gamepad.button("right shoulder");
};
