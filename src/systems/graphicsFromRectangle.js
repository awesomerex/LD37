module.exports = function(stage){
	return function setGraphicsFromRectangle(entities, elapsed){
		var ids = entities.find("rectangle");
		for ( var i = 0; i < ids.length; i++){
			var graphics = entities.getComponent(ids[i], "graphics");
			var rectangle = entities.getComponent(ids[i], "rectangle");
			if(!graphics){
				graphics = entities.addComponent(ids[i], "graphics");
			}
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(rectangle.color, 1);
			graphics.drawRect(0, 0, rectangle.width, rectangle.height);
			graphics.endFill();
			stage.addChild(graphics);
		}
	}
}