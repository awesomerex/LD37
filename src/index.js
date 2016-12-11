var EntityComponentSystem = require("entity-component-system").EntityComponentSystem;
var EntityPool = require("entity-component-system").EntityPool;
var PIXI = require("pixi.js");

var ecs = new EntityComponentSystem();
var entities = new EntityPool();

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb, view: document.getElementById('canvas')});

// create the root of the scene graph
var stage = new PIXI.Container();
window.stage = stage;
function dump(drawable, indent) {
  if (indent === undefined) {
    indent = 0;
  }

  var s = "";
  for (var i = 0; i < indent; i++) {
    s += " ";
  }
  s += drawable.entity + " (" + drawable.worldTransform.tx + ", " + drawable.worldTransform.ty + ") - (" + drawable.x + ", " + drawable.y + ")\n";

  for (i = 0; i < drawable.children.length; i++) {
    s += dump(drawable.children[i], indent + 2);
  }

  return s;
}
window.dump = dump;

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
ecs.add(require("./systems/setParents")(stage));
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
