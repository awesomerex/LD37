var EntityComponentSystem = require("entity-component-system").EntityComponentSystem;
var EntityPool = require("entity-component-system").EntityPool;
var PIXI = require("pixi.js");

var ecs = new EntityComponentSystem();
var entities = new EntityPool();
window.entities = entities;

var renderer = PIXI.autoDetectRenderer(800, 600, {
  backgroundColor: 0xc3c5d9,
  view: document.getElementById('canvas')
});
window.renderer = renderer;

// create the root of the scene graph
var stage = new PIXI.Container();
window.stage = stage;
window.dump = require("./dump");;

// Components

entities.registerComponent("position", require("./components/position"));
entities.registerComponent("graphics", require("./components/graphics"));
entities.registerComponent("rectangle", require("./components/rectangle"));
entities.registerComponent("gamepad", require("./components/gamepad"));
entities.registerComponent("velocity", require("./components/velocity"));
entities.registerComponent("lifetime", require("./components/lifetime"));
entities.registerComponent("ghosts", require("./components/ghosts"));
entities.registerComponent("text", require("./components/text"));


// Systems
ecs.add(require("./systems/updatePositionFromGamepad")(entities));
ecs.add(require("./systems/collisionDetection")(entities));
ecs.add(require("./systems/fireBullet")(entities));
ecs.add(require("./systems/velocity")(entities));
ecs.add(require("./systems/wrapAround")());
ecs.add(require("./systems/lifetime")());
ecs.add(require("./systems/graphicsFromRectangle")());
ecs.add(require("./systems/graphicsFromText")());
ecs.add(require("./systems/graphicsPosition")(entities));
ecs.add(require("./systems/setParents")(stage, entities));
ecs.add(require("./systems/renderScene")(renderer, stage));

// Prefabs
var prefabs = {
  bullet : require("./prefabs/bullet"),
  player : require("./prefabs/player"),
  text : require("./prefabs/text")
}

prefabs.player(entities, 0, 100, 300, 0x00AAFF, 0, "Blue");
prefabs.player(entities, 1, 700, 300, 0xFF00AA, Math.PI, "Red");
prefabs.player(entities, 2, 400, 100, 0xAAFF00, Math.PI / 2, "Green");
prefabs.player(entities, 3, 400, 500, 0xAA00FF, Math.PI * 3 / 2, "Purple");

var activator = entities.create();
var rectangle = entities.addComponent(activator, "rectangle");
rectangle.color = 0xF8A13F;
var position = entities.addComponent(activator, "position");
position.x = 400;
position.y = 300;
entities.setComponent(activator, "activators", true);


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

