var gamepads = require("html5-gamepad");

module.exports = function(entities) {
  return function updatePositionFromGamepad(entities, elapsed) {
    navigator.getGamepads(); // fix for chrome
    var ids = entities.find("gamepad");
    for (var i = 0; i < ids.length; i++) {
      var position = entities.getComponent(ids[i], "position");
      if (!position) {
        position = entities.addComponent(ids[i], "position");
      }

      var velocity = entities.getComponent(ids[i], "velocity");
      if (!velocity) {
        velocity = entities.addComponent(ids[i], "velocity");
      }

      var gamepadComponent = entities.getComponent(ids[i], "gamepad");
      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }

      var gx = deadZone(gamepad.axis("left stick x"), gamepadComponent.threshold);
      velocity.vx = gx * gamepadComponent.speed;

      var gy = deadZone(gamepad.axis("left stick y"), gamepadComponent.threshold);
      velocity.vy = gy * gamepadComponent.speed;

      updateRotation(entities, ids[i], gamepad, gamepadComponent.threshold);
    }

    var ids = entities.find("gamepadIndex");
    for (var i = 0; i < ids.length; i++) {
      var gamepadIndex = entities.getComponent(ids[i], "gamepadIndex");
      var gamepad = gamepads[gamepadIndex];
      if (!gamepad) {
        continue;
      }
      updateRotation(entities, ids[i], gamepad, 0.3);
    }
  }
}

function updateRotation(entities, player, gamepad, threshold) {
  var hx = deadZone(gamepad.axis("right stick x"), threshold);
  var hy = deadZone(gamepad.axis("right stick y"), threshold);
  if (hx !== 0 || hy !== 0) {
    var rotation = Math.atan2(gamepad.axis("right stick y"), gamepad.axis("right stick x"));
    var ghosts = entities.getComponent(player, "ghosts");
    updateGhosts(entities, ghosts, rotation);
  }
}

function updateGhosts(entities, ghosts, rotation) {
  for (var i = 0; i < ghosts.length; i++) {
    var pos = entities.getComponent(ghosts[i], "position");
    pos.rotation = rotation;
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
