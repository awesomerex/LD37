var gamepads = require("html5-gamepad");
var isShooting = require("../isShooting");
var player = require("../prefabs/player");
var text = require("../prefabs/text");

module.exports = function(sounds) {
  return function(entities, elapsed) {
    var ids = entities.find("playerReady").slice();
    for (var i = 0; i < ids.length; i++) {
      var playerReady = entities.getComponent(ids[i], "playerReady");
      var position = entities.getComponent(ids[i], "position");
      var gamepad = gamepads[playerReady.gamepad];
      if (!gamepad) {
        continue;
      }

      var totalHoldTime = 1000;

      entities.removeComponent(ids[i], "graphics");

      if (isShooting(gamepad)) {
        playerReady.time += elapsed;

        var arc = entities.getComponent(ids[i], "arc");
        arc.endAngle = (Math.PI * 2) * (playerReady.time / totalHoldTime);

        if (playerReady.time > totalHoldTime) {
          sounds.play("fire");
          player(entities, playerReady.gamepad, position.x, position.y, playerReady.color, playerReady.rotation, playerReady.name);
          entities.destroy(ids[i]);

          if (entities.find("ghosts").length === 1) {
            var ids = entities.find("text").slice();
            for (var i = 0; i < ids.length; i++) {
              entities.destroy(ids[i]);
            }
          }
          if (entities.find("ghosts").length === 2) {

            buildTimer(entities, 3, function() {
              addGamepads(entities);
              var ids = entities.find("playerReady").slice();
              for (var i = 0; i < ids.length; i++) {
                entities.destroy(ids[i]);
              }
            }, sounds);
          }
        }
      } else {
        playerReady.time -= elapsed;
        if (playerReady.time < 0) {
          playerReady.time = 0;
        }

        var arc = entities.getComponent(ids[i], "arc");
        arc.endAngle = (Math.PI * 2) * (playerReady.time / totalHoldTime);
      }
    }
  }
}

function addGamepads(entities) {
  var ids = entities.find("gamepadIndex").slice();
  for (var i = 0; i < ids.length; i++) {
    var idx = entities.getComponent(ids[i], "gamepadIndex");
    entities.removeComponent(ids[i], "gamepadIndex");
    var gamepad = entities.addComponent(ids[i], "gamepad");
    gamepad.index = idx;
  }
}

function buildTimer(entities, time, onExpire, sounds) {
  var id = text(entities, time, 400, 300, 100, 0xffffff);

  var lifetime = entities.addComponent(id, "lifetime");
  lifetime.time = 1000;
  lifetime.onExpire = function() {
    if (time > 1) {
      sounds.play("countlow");
      buildTimer(entities, time - 1, onExpire, sounds);
    } else {
      sounds.play("counthi");
      onExpire();
    }
  };
}
