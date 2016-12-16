var PIXI = require("pixi.js");

module.exports = function() {
  return function setGraphicsFromArc(entities, elapsed) {
    var ids = entities.find("arc");
    for (var i = 0; i < ids.length; i++) {
      var graphics = entities.getComponent(ids[i], "graphics");
      var arc = entities.getComponent(ids[i], "arc");
      if (graphics) {
        continue;
      }
      console.log("make arc");
      graphics = entities.addComponent(ids[i], "graphics");
      var g = graphics.drawable = new PIXI.Graphics();
      g.className = "arc";
      g.entity = ids[i];

      g.moveTo(0, 0);
      g.beginFill(arc.color, 1);
      g.arc(0, 0, arc.radius, arc.startAngle, arc.endAngle);
      g.endFill();
    }
  }
}
