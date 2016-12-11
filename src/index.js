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

var gamepads = require("html5-gamepad");

ecs.add(function fireBullet(entities, elapsed){
	var ids = entities.find("fireBullet").slice();
	for (var i = 0; i < ids.length; i++){

		var player = entities.getComponent(ids[i], "parent");
		var gamepadComponent = entities.getComponent(player, "gamepad");

		var gamepad = gamepads[gamepadComponent.index];
		if(!gamepad){
			continue;
		}
		if(gamepad.button("a")){
			var bullet = entities.getComponent(ids[i], "graphics");

			console.log(bullet.drawable.worldTransform, bullet.drawable.parent);
			var rotation = bullet.drawable.parent.rotation;

			entities.removeComponent(ids[i], "parent");

			var pos = entities.getComponent(ids[i], "position");


			pos.x = bullet.drawable.worldTransform.tx;
			pos.y = bullet.drawable.worldTransform.ty;
			pos.rotation = rotation;

			var velocity = entities.addComponent(ids[i], "velocity");
			var speed = 1;
			velocity.vx = speed * Math.cos(rotation)
			velocity.vy = speed * Math.sin(rotation)
		}
	}
});
entities.registerSearch("fireBullet", ["bullet", "parent"]);

ecs.add(require("./systems/velocity")(entities));
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

