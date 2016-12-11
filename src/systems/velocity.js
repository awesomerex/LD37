module.exports = function(entities){
  entities.registerSearch("setVelocity", ["velocity", "position"]);
  return function setVelocity(entities, elapsed) {
    var ids = entities.find("setVelocity");
    for (var i = 0; i < ids.length; i++) {
      var position = entities.getComponent(ids[i], "position");
      var velocity = entities.getComponent(ids[i], "velocity");
      position.x += velocity.vx * elapsed;
      position.y += velocity.vy * elapsed;
    }
  }
}
