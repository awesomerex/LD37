var gamepads = require("html5-gamepad");

module.exports = function(entities) {
  return function updatePositionFromGamepad(entities, elapsed) {
    var ids = entities.find("gamepad");
    for (var i = 0; i < ids.length; i++) {
      var velocity = entities.getComponent(ids[i], "velocity");
      if (!velocity) {
        velocity = entities.addComponent(ids[i], "velocity");
      }
      var gamepadComponent = entities.getComponent(ids[i], "gamepad");
      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }
      velocity.vx = gamepad.axis("left stick x") * gamepadComponent.speed;
      velocity.vy = gamepad.axis("left stick y") * gamepadComponent.speed;
    }
  }
}
