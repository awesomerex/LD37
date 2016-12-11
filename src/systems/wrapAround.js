module.exports = function() {
  return function(entities, elapsed) {
    var ids = entities.find("position");
    for (var i = 0; i < ids.length; i++) {
      if (entities.getComponent(ids[i], "parent") !== undefined) {
        continue;
      }
      var position = entities.getComponent(ids[i], "position");
      while (position.x > renderer.width) {
        position.x -= renderer.width;
      }
      while (position.x < 0) {
        position.x += renderer.width;
      }
      while (position.y > renderer.height) {
        position.y -= renderer.height;
      }
      while (position.y < 0) {
        position.y += renderer.height;
      }
    }
  }
};
