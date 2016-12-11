var gamepads = require("html5-gamepad");

module.exports = function(entities) {
  entities.registerSearch("fireBullet", ["bullet", "parent"]);
  return function fireBullet(entities, elapsed) {
    var ids = entities.find("fireBullet").slice();
    for (var i = 0; i < ids.length; i++) {

      var player = entities.getComponent(ids[i], "parent");
      var gamepadComponent = entities.getComponent(player, "gamepad");

      var gamepad = gamepads[gamepadComponent.index];
      if (!gamepad) {
        continue;
      }
      if (gamepad.button("a")) {
        var bullet = entities.getComponent(ids[i], "graphics");

        var rotation = bullet.drawable.parent.rotation;

        entities.removeComponent(ids[i], "parent");

        var pos = entities.getComponent(ids[i], "position");
        pos.x = bullet.drawable.worldTransform.tx;
        pos.y = bullet.drawable.worldTransform.ty;
        pos.rotation = rotation;

        var velocity = entities.addComponent(ids[i], "velocity");
        var speed = 1;
        velocity.vx = speed * Math.cos(rotation)
        velocity.vy = speed * Math.sin(rotation)

        var lifetime = entities.addComponent(ids[i], "lifetime");
      }
    }
  }
}
