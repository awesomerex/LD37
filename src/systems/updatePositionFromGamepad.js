var gamepads = require("html5-gamepad");

module.exports = function(entities) {
  return function updatePositionFromGamepad(entities, elapsed) {
    navigator.getGamepads(); // fix for chrome
    var ids = entities.find("gamepad");
    for (var i = 0; i < ids.length; i++) {
      var velocity = entities.getComponent(ids[i], "velocity");
      if (!velocity) {
        velocity = entities.addComponent(ids[i], "velocity");
      }
      var gamepadComponent = entities.getComponent(ids[i], "gamepad");
      // console.log(gamepads);
      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }

      var gx = deadZone(gamepad.axis("left stick x"), gamepadComponent.threshold);
      velocity.vx = gx * gamepadComponent.speed;

      var gy = deadZone(gamepad.axis("left stick y"), gamepadComponent.threshold);
      velocity.vy = gy * gamepadComponent.speed;
    }
  }
}

function deadZone(val, threshold) {
  if (val > 0 && val < threshold) {
    return 0;
  }
  if (val < 0 && val > -threshold) {
    return 0;
  }
  return val;
}
