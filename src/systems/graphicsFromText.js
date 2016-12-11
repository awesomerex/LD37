var PIXI = require("pixi.js");

module.exports = function() {
  return function setGraphicsFromRectangle(entities, elapsed) {
    var ids = entities.find("text");
    for (var i = 0; i < ids.length; i++) {
      var graphics = entities.getComponent(ids[i], "graphics");
      if (graphics) {
        continue;
      }
      console.log("make text");
      graphics = entities.addComponent(ids[i], "graphics");
      var text = entities.getComponent(ids[i], "text");
      var g = graphics.drawable = new PIXI.Text(
        text.text,
        {
          fill: text.color,
          fontSize: text.size
        }
      );
      g.className = "text(" + text.text + ")";
      g.entity = ids[i];
      g.anchor.set(0.5, 0.5);
    }
  }
}
