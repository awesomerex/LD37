var bullet = require("../prefabs/bullet");
var isShooting = require("../isShooting");
var gamepads = require("html5-gamepad");

module.exports = function(entities, sounds) {
  entities.registerSearch("fireBullet", ["bullet", "parent"]);
  function spawnBullet(entity) {
    var player = entities.getComponent(entity, "owner");
    if (entities.entities[player]) { // FIXME: no way to check if entity exists
      bullet(entities, player);
    }
  }
  return function fireBullet(entities, elapsed) {
    var ids = entities.find("fireBullet").slice();
    for (var i = 0; i < ids.length; i++) {

      var player = entities.getComponent(ids[i], "parent");
      var ghostContainer = entities.getComponent(player, "parent");
      if (!ghostContainer) {
        continue;
      }
      var gamepadComponent = entities.getComponent(ghostContainer, "gamepad");
      if (!gamepadComponent) {
        continue;
      }

      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }
      if (isShooting(gamepad)) {
        sounds.play("fire");

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
