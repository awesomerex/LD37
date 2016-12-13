module.exports = function deletePlayer(entities, player) {
  var parent = entities.getComponent(player, "parent");
  var ghosts = entities.getComponent(parent, "ghosts");
  for (var i = 0; i < ghosts.length; i++) {
    deleteSinglePlayer(entities, ghosts[i]);
  }
  entities.destroy(parent);
}

function deleteSinglePlayer(entities, player) {
  var body = entities.getComponent(player, "body");
  entities.destroy(body);

  // var bullets = entities.find("fireBullet");
  var bullets = entities.find("bullet");
  for (var i = 0; i < bullets.length; i++) {
    var parent = entities.getComponent(bullets[i], "parent");
    if (parent === player) {
      entities.destroy(bullets[i]);
      break;
    }
    var parent = entities.getComponent(bullets[i], "owner");
    if (parent === player) {
      entities.destroy(bullets[i]);
      break;
    }
  }

  entities.destroy(player);
}
