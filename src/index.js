var EntityComponentSystem = require("entity-component-system").EntityComponentSystem;
var EntityPool = require("entity-component-system").EntityPool;
var PIXI = require("pixi.js");

var ecs = new EntityComponentSystem();
var entities = new EntityPool();

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb, view: document.getElementById('canvas')});

// create the root of the scene graph
var stage = new PIXI.Container();


// Components
function positionFactory() {
	return {x:0,y:0};
}
entities.registerComponent("position", positionFactory);

function rectangleFactory() {
	var graphics = new PIXI.Graphics();

	// set a fill and a line style again and draw a rectangle
	graphics.lineStyle(2, 0x0000FF, 1);
	graphics.beginFill(0xFF700B, 1);
	graphics.drawRect(0, 0, 120, 120);
	graphics.endFill();

	stage.addChild(graphics);
	return graphics;
 }
entities.registerComponent("rectangle", rectangleFactory);

// Systems

entities.registerSearch("setGraphicsPosition", ["position", "rectangle"]);
function setGraphicsPosition(entities, elapsed){
	var ids = entities.find("setGraphicsPosition");
	for ( var i = 0; i < ids.length; i++){
		var position = entities.getComponent(ids[i], "position");
		var rectangle = entities.getComponent(ids[i], "rectangle");
		rectangle.x = position.x;
		rectangle.y = position.y;
	}
}
ecs.add(setGraphicsPosition);

function renderScene(entities, elapsed) {
	renderer.render(stage);
}
ecs.add(renderScene);

var player = entities.create();

var position = entities.addComponent(player, "position");
position.x = 200;
entities.addComponent(player, "rectangle");


var lastTime = -1;
var render = function(time) {
  if (this.lastTime === -1) {
    this.lastTime = time;
  }
  var elapsed = time - this.lastTime;
  this.lastTime = time;

  ecs.run(entities, elapsed);
  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);