var deletePlayer = require("../deletePlayer");
var spawnPlayers = require("../prefabs/spawnPlayers");
var text = require("../prefabs/text");

module.exports = function(entities, sounds) {

  function collideWithActivators(bullet, bPos, bRect) {
    var activators = entities.find("activators");
    for (var x = 0; x < activators.length; x++) {
      var graphics = entities.getComponent(activators[x], "graphics");
      var aPos = {
        x: graphics.drawable.worldTransform.tx,
        y: graphics.drawable.worldTransform.ty
      };
      var aRect = entities.getComponent(activators[x], "rectangle");

      if (collides(bPos, bRect, aPos, aRect)) {
        sounds.play("charge");
        entities.setComponent(bullet, "active", true);

        var player = entities.getComponent(bullet, "owner");
        var parent = entities.getComponent(player, "parent");
        var color = entities.getComponent(parent, "color");
        bRect.color = color;

        entities.removeComponent(bullet, "graphics");

        var spawner = entities.addComponent(bullet, "particleSpawner");
        spawner.vx = 0;
        spawner.vy = 0;
        spawner.number = 1;
      }
    }
  }

  entities.registerSearch("movingBullets", ["bullet", "velocity"]);
  return function collisionDetection(entities){
    var bullets = entities.find("movingBullets");
    for (var i = 0; i < bullets.length; i++) {
      var bPos = entities.getComponent(bullets[i], "position");
      var bRect = entities.getComponent(bullets[i], "rectangle");

      var active = entities.getComponent(bullets[i], "active");
      if (active) {

        //loop through players looking for collisions.
        var players = entities.find("player");
        for (var x = 0; x < players.length; x++) {
          var graphics = entities.getComponent(players[x], "graphics");
          var pPos = {
            x: graphics.drawable.worldTransform.tx,
            y: graphics.drawable.worldTransform.ty
          };
          var body = entities.getComponent(players[x], "body");
          var pRect = entities.getComponent(body, "rectangle");

          if (collides(bPos, bRect, pPos, pRect)) {
            sounds.play("die");
            deletePlayer(entities, players[x]);

            var playersLeft = entities.find("name");
            if (playersLeft.length === 1) {
              var winnerName = entities.getComponent(playersLeft[0], "name");
              var winnerColor = entities.getComponent(playersLeft[0], "color");

              var ids = entities.find("bullet")
              while (ids.length > 0) {
                entities.destroy(ids[0]);
              }
              // var ids = Object.keys(entities.entities);
              // for (var i = 0; i < ids.length; i++) {
              //   entities.destroy(ids[i]);
              // }

              var t = text(entities, winnerName + " wins!", 400, 300, 100, winnerColor);
              spawnPlayers(entities);
              return;
            }
          }
        }
      } else {
        collideWithActivators(bullets[i], bPos, bRect);
      }
    }
  }
}

function collides(pos1, rect1, pos2, rect2) {
  var halfWidth1 = rect1.width / 2;
  var halfHeight1 = rect1.height / 2;

  var left1 = pos1.x - halfWidth1;
  var right1 = pos1.x + halfWidth1;
  var top1 = pos1.y - halfHeight1;
  var bottom1 = pos1.y + halfHeight1;

  var halfWidth2 = rect2.width / 2;
  var halfHeight2 = rect2.height / 2;

  var left2 = pos2.x - halfWidth2;
  var right2 = pos2.x + halfWidth2;
  var top2 = pos2.y - halfHeight2;
  var bottom2 = pos2.y + halfHeight2;

  return right1 >= left2 &&
    left1 < right2 &&
    bottom1 >= top2 &&
    top1 < bottom2;
}

