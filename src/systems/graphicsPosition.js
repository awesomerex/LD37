module.exports = function(entities){
	entities.registerSearch("setGraphicsPosition", ["position", "graphics"]);
	return function setGraphicsPosition(entities, elapsed){
		var ids = entities.find("setGraphicsPosition");
		for ( var i = 0; i < ids.length; i++){
			var position = entities.getComponent(ids[i], "position");
			var graphics = entities.getComponent(ids[i], "graphics");
			graphics.x = position.x;
			graphics.y = position.y;
		}
	}
}