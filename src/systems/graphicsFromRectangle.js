module.exports = function(stage){
  return function setGraphicsFromRectangle(entities, elapsed){
    var ids = entities.find("rectangle");
    for ( var i = 0; i < ids.length; i++){
      var graphics = entities.getComponent(ids[i], "graphics");
      var rectangle = entities.getComponent(ids[i], "rectangle");
      if (graphics) {
        return;
      }
      console.log("make graphics");
      graphics = entities.addComponent(ids[i], "graphics");
      graphics.beginFill(rectangle.color, 1);
      graphics.drawRect(-rectangle.width / 2, -rectangle.height / 2, rectangle.width, rectangle.height);
      graphics.endFill();
      stage.addChild(graphics);
    }
  }
}
