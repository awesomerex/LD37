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
stage.className = "stage";
window.stage = stage;
window.dump = require("./dump");;

// Components
entities.registerComponent("position", require("./components/position").factory, require("./components/position").reset);
entities.registerComponent("graphics", require("./components/graphics").factory, require("./components/graphics").reset);
entities.registerComponent("rectangle", require("./components/rectangle").factory, require("./components/rectangle").reset);
entities.registerComponent("gamepad", require("./components/gamepad").factory, require("./components/gamepad").reset);
entities.registerComponent("velocity", require("./components/velocity").factory, require("./components/velocity").reset);
entities.registerComponent("lifetime", require("./components/lifetime").factory, require("./components/lifetime").reset);
entities.registerComponent("ghosts", require("./components/ghosts").factory, require("./components/ghosts").reset);
entities.registerComponent("text", require("./components/text").factory, require("./components/text").reset);
entities.registerComponent("playerReady", require("./components/playerReady").factory, require("./components/playerReady").reset);
entities.registerComponent("particleSpawner", require("./components/particleSpawner").factory, require("./components/particleSpawner").reset);


// Systems
ecs.add(require("./systems/updatePositionFromGamepad")(entities));
ecs.add(require("./systems/collisionDetection")(entities));
ecs.add(require("./systems/particleSpawner")(entities));
ecs.add(require("./systems/fireBullet")(entities));
ecs.add(require("./systems/spawnPlayers")());
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
  playerReady : require("./prefabs/playerReady"),
  spawnPlayers : require("./prefabs/spawnPlayers"),
  text : require("./prefabs/text"),
  particle : require("./prefabs/makeParticle")
}

prefabs.spawnPlayers(entities);

var activator = entities.create();
var rectangle = entities.addComponent(activator, "rectangle");
rectangle.color = 0xF8A13F;
var position = entities.addComponent(activator, "position");
position.x = 400;
position.y = 300;
entities.setComponent(activator, "activators", true);




//

// var graphic = new PIXI.Graphics();
// graphic.beginFill(0xFF3300);
// graphic.drawRect(0,0,5,5);
// graphic.endFill();

// var image = PIXI.Sprite(renderer.generateTexture());

//particleSpawner.addChild(image);




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

