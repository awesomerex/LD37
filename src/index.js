var EntityComponentSystem = require("entity-component-system").EntityComponentSystem;
var EntityPool = require("entity-component-system").EntityPool;
var PIXI = require("pixi.js");

var ecs = new EntityComponentSystem();
var entities = new EntityPool();
window.entities = entities;

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb, view: document.getElementById('canvas')});

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


// Systems
ecs.add(require("./systems/updatePositionFromGamepad")(entities));
ecs.add(require("./systems/collisionDetection")(entities));
ecs.add(require("./systems/fireBullet")(entities));
ecs.add(require("./systems/velocity")(entities));
ecs.add(function(entities, elapsed) {
  var ids = entities.find("lifetime").slice();
  for (var i = 0; i < ids.length; i++) {
    var lifetime = entities.getComponent(ids[i], "lifetime");
    lifetime.time -= elapsed;
    if (lifetime.time <= 0) {
      if (lifetime.onExpire) {
        lifetime.onExpire(ids[i]);
      }
      entities.destroy(ids[i]);
    }
  }
});
ecs.add(require("./systems/graphicsFromRectangle")(stage));
ecs.add(require("./systems/graphicsPosition")(entities));
ecs.add(require("./systems/setParents")(stage, entities));
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

