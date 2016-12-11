function collides(pos1, rect1, pos2, rect2){
  if(pos1.x + rect1.width >= pos2.x && //right side of bullet breaks left plane of player
          pos1.x < pos2.x + rect2.width && //left side of bullet is within the)
          pos1.y + rect1.height > pos2.y &&
          pos1.y < pos2.y + rect2.height){
          return true;
        } 
  return false;
}

module.exports = function (entities) {

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
          console.log(body);
          var pRect = entities.getComponent(body, "rectangle");
          // console.log('detecting', pRect);

          if (collides(bPos, bRect, pPos, pRect)) {
            console.log("collision player", players[x], "bullet", bullets[i]);
            deletePlayerContainer(entities, players[x]);
          } 
        }
      } else {
        var activators = entities.find("activators");
        for (var x = 0; x < activators.length; x++) {
          var graphics = entities.getComponent(activators[x], "graphics");
          var aPos = {
            x: graphics.drawable.worldTransform.tx,
            y: graphics.drawable.worldTransform.ty
          };
          // var aPos = entities.getComponent(activators[x], "position");
          var aRect = entities.getComponent(activators[x], "rectangle");

          if (collides(bPos, bRect, aPos, aRect)) {
            console.log("collision activators", activators[x], "bullet", bullets[i]);
            entities.setComponent(bullets[i], "active", true);
          } 
        }
      }
    }
  }
}

function deletePlayerContainer(entities, player) {
  var parent = entities.getComponent(player, "parent");
  var ghosts = entities.getComponent(parent, "ghosts");
  for (var i = 0; i < ghosts.length; i++) {
    deletePlayer(entities, ghosts[i]);
  }
}

function deletePlayer(entities, player) {
  var body = entities.getComponent(player, "body");
  entities.destroy(body);

  var bullets = entities.find("fireBullet");
  for (var i = 0; i < bullets.length; i++) {
    var parent = entities.getComponent(bullets[i], "parent");
    if (parent === player) {
      console.log("deleting", bullets[i]);
      entities.destroy(bullets[i]);
      return;
    }
  }

  entities.destroy(player);
}
