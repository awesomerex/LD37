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

      var gx = gamepad.axis("left stick x");
      if (gx > 0 && gx < gamepadComponent.threshold) {
        gx = 0;
      }
      if (gx < 0 && gx > -gamepadComponent.threshold) {
        gx = 0;
      }
      velocity.vx = gx * gamepadComponent.speed;

      var gy = gamepad.axis("left stick y");
      if (gy > 0 && gy < gamepadComponent.threshold) {
        gy = 0;
      }
      if (gy < 0 && gy > -gamepadComponent.threshold) {
        gy = 0;
      }
      velocity.vy = gy * gamepadComponent.speed;
    }
  }
}
