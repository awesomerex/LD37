var gamepads = require("html5-gamepad");

module.exports = function(entities) {
  entities.registerSearch("updatePositionFromGamepad", ["position", "gamepad"]);
  return function updatePositionFromGamepad(entities, elapsed) {
    var ids = entities.find("updatePositionFromGamepad");
    for (var i = 0; i < ids.length; i++) {
      var position = entities.getComponent(ids[i], "position");
      var gamepadComponent = entities.getComponent(ids[i], "gamepad");
      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }
      position.x += gamepad.axis("left stick x") * gamepadComponent.speed * elapsed;
      position.y += gamepad.axis("left stick y") * gamepadComponent.speed * elapsed;
    }
  }
}
