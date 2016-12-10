var PIXI =require("pixi.js");

module.exports = function graphicsFactory() {
	var graphics = new PIXI.Graphics();

	// set a fill and a line style again and draw a graphics
	// graphics.lineStyle(2, 0x0000FF, 1);
	// graphics.beginFill(0xFF700B, 1);
	// graphics.drawRect(0, 0, 130, 120);
	// graphics.endFill();

	//stage.addChild(graphics);
	console.log(graphics);
	return graphics;
 }