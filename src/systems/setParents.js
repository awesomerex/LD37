module.exports = function(stage, entities) {
  entities.onRemoveComponent("graphics", function(id, component, oldValue) {
     oldValue.drawable.destroy();
  });
  entities.onRemoveComponent("parent", function(id, component, oldValue) {
     var graphics = entities.getComponent(id, "graphics");
     graphics.drawable.setParent(stage);
  });
  return function(entities, elapsed) {
    var ids = entities.find("graphics");
    for (var i = 0; i < ids.length; i++) {
      var graphics = entities.getComponent(ids[i], "graphics");
      var parent = entities.getComponent(ids[i], "parent");
      if (!graphics.drawable.parent) {
        if (parent !== undefined && entities.entities[parent]) {
          var parentGraphics = entities.getComponent(parent, "graphics");
          if (parentGraphics) {
            parentGraphics.drawable.addChild(graphics.drawable);
          } else {
            stage.addChild(graphics.drawable);
          }
        } else {
          stage.addChild(graphics.drawable);
        }
      }
    }
  }
}
