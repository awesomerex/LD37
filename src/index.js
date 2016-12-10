var EntityComponentSystem = require("entity-component-system").EntityComponentSystem;
var EntityPool = require("entity-component-system").EntityPool;
var PIXI = require("pixi.js");

var ecs = new EntityComponentSystem();
var entities = new EntityPool();

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb, view: document.getElementById('canvas')});

// create the root of the scene graph
var stage = new PIXI.Container();

// Components

entities.registerComponent("position", require("./components/position"));
entities.registerComponent("graphics", require("./components/graphics"));
entities.registerComponent("rectangle", require("./components/rectangle"));
entities.registerComponent("gamepad", require("./components/gamepad"));
entities.registerComponent("velocity", require("./components/velocity"));

// Systems

ecs.add(require("./systems/updatePositionFromGamepad")(entities));
ecs.add(require("./systems/velocity")(entities));
ecs.add(require("./systems/graphicsFromRectangle")(stage));
ecs.add(require("./systems/graphicsPosition")(entities));
ecs.add(function(entities, elapsed) {
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
});
ecs.add(require("./systems/renderScene")(renderer, stage));

// Prefabs
var prefabs = {
  bullet : require("./prefabs/bullet"),
  player : require("./prefabs/player")
}

prefabs.player(entities, 0, 100, 300, 0x0000ff);
prefabs.player(entities, 1, 500, 300, 0xff0000);


var lastTime = -1;
var render = function(time) {
  if (lastTime === -1) {
    lastTime = time;
  }
  var elapsed = time - lastTime;
  lastTime = time;

  ecs.run(entities, elapsed);
  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);
