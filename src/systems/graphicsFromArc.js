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
      // console.log("make arc");
      graphics = entities.addComponent(ids[i], "graphics");
      var g = graphics.drawable = new PIXI.Graphics();
      g.className = "arc";
      g.entity = ids[i];

      if (arc.lineWidth !== undefined) {
        drawLineArc(g, arc)
      } else {
        drawFilledArc(g, arc);
      }
    }
  }
}

function drawLineArc(g, arc) {
  var sx = Math.cos(arc.startAngle) * arc.radius;
  var sy = Math.sin(arc.startAngle) * arc.radius;
  g.moveTo(sx, sy);

  g.lineStyle(arc.lineWidth, arc.color);
  g.arc(0, 0, arc.radius, arc.startAngle, arc.endAngle);
}

function drawFilledArc(g, arc) {
  g.moveTo(0, 0);

  g.beginFill(arc.color, 1);
  g.arc(0, 0, arc.radius, arc.startAngle, arc.endAngle);
  g.endFill();
}
