module.exports = function(){
  return function bulletManager(entities){
	var ids = entities.find("bullet");

	for ( var i = 0; i < ids.length; i++){
			var parent = entities.getComponent(ids[i], "parent");
			var parentPos = entities.getComponent(parent, "position");
			var parentRect = entities.getComponent(parent, "rectangle");
			var position = entities.getComponent(ids[i], "position");
			
			position.x = parentPos.x + parentRect.width;
			position.y = parentPos.y + parentRect.height/2;
		}
	}
}