var PIXI = require("pixi.js");


var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb, view: document.getElementById('canvas')});

// create the root of the scene graph
var stage = new PIXI.Container();

var container = new PIXI.Container();

stage.addChild(container);

var graphics = new PIXI.Graphics();

// set a fill and a line style again and draw a rectangle
graphics.lineStyle(2, 0x0000FF, 1);
graphics.beginFill(0xFF700B, 1);
graphics.drawRect(50, 250, 120, 120);
graphics.endFill();

stage.addChild(graphics);

animate();

function animate() {

    renderer.render(stage);
    requestAnimationFrame( animate );
}