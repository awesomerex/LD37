var bullet = require("../prefabs/bullet");
var gamepads = require("html5-gamepad");

module.exports = function(entities) {
  entities.registerSearch("fireBullet", ["bullet", "parent"]);
  function spawnBullet(entity) {
    var player = entities.getComponent(entity, "owner");
    bullet(entities, player);
  }
  return function fireBullet(entities, elapsed) {
    var ids = entities.find("fireBullet").slice();
    for (var i = 0; i < ids.length; i++) {

      var player = entities.getComponent(ids[i], "parent");
      var gamepadComponent = entities.getComponent(player, "gamepad");

      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }
      if (isShooting(gamepad)) {
        var bullet = entities.getComponent(ids[i], "graphics");

        var rotation = bullet.drawable.parent.rotation;

        entities.removeComponent(ids[i], "parent");
        entities.setComponent(ids[i], "owner", player);

        var pos = entities.getComponent(ids[i], "position");
        pos.x = bullet.drawable.worldTransform.tx;
        pos.y = bullet.drawable.worldTransform.ty;
        pos.rotation = rotation;

        var velocity = entities.addComponent(ids[i], "velocity");
        var speed = 1;
        velocity.vx = speed * Math.cos(rotation)
        velocity.vy = speed * Math.sin(rotation)

        var lifetime = entities.addComponent(ids[i], "lifetime");
        lifetime.time = 1000;
        lifetime.onExpire = spawnBullet;
      }
    }
  }
}

function isShooting(gamepad) {
  return gamepad.button("a") ||
    gamepad.button("b") ||
    gamepad.button("x") ||
    gamepad.button("y") ||
    gamepad.button("left trigger") ||
    gamepad.button("left shoulder") ||
    gamepad.button("right trigger") ||
    gamepad.button("right shoulder");
}
