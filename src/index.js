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
ecs.add(require("./systems/bulletManager")(entities));
ecs.add(require("./systems/graphicsFromRectangle")(stage));
ecs.add(require("./systems/graphicsPosition")(entities));

ecs.add(require("./systems/renderScene")(renderer, stage));

// Prefabs
var prefabs = {
	bullet : require("./prefabs/bullet")
}



var player = entities.create();
var position = entities.addComponent(player, "position");
var rectangle = entities.addComponent(player, "rectangle");
var gamepad = entities.addComponent(player, "gamepad");
var bullet = prefabs.bullet(entities, player);
gamepad.speed = 1;

var player2 = entities.create();
var position = entities.addComponent(player2, "position");
position.x = 200;
var rectangle = entities.addComponent(player2, "rectangle");
rectangle.color = 0xFF0000;

var velocity = entities.addComponent(player2, "velocity");
velocity.vx = 0.1;
var gamepad = entities.addComponent(player2, "gamepad");
gamepad.index = 1;
gamepad.speed = 1;



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
