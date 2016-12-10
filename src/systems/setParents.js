module.exports = function(stage) {
  return function(entities, elapsed) {
    var ids = entities.find("graphics");
    for (var i = 0; i < ids.length; i++) {
      var graphics = entities.getComponent(ids[i], "graphics");
      var parent = entities.getComponent(ids[i], "parent");
      if (!graphics.drawable.parent) {
        if (parent !== undefined) {
          var parentGraphics = entities.getComponent(parent, "graphics");
          parentGraphics.drawable.addChild(graphics.drawable);
        } else {
          stage.addChild(graphics.drawable);
        }
      }
    }
  }
}
