var PIXI =require("pixi.js");

module.exports = function() {
  return function setGraphicsFromRectangle(entities, elapsed) {
    var ids = entities.find("rectangle");
    for ( var i = 0; i < ids.length; i++){
      var graphics = entities.getComponent(ids[i], "graphics");
      var rectangle = entities.getComponent(ids[i], "rectangle");
      if (graphics) {
        return;
      }
      console.log("make graphics");
      graphics = entities.addComponent(ids[i], "graphics");
      var g = graphics.drawable = new PIXI.Graphics();
      g.beginFill(rectangle.color, 1);
      g.drawRect(-rectangle.width / 2, -rectangle.height / 2, rectangle.width, rectangle.height);
      g.endFill();
    }
  }
}
