function collides(pos1, rect1, pos2, rect2){
	if(pos1.x + rect1.width >= pos2.x && //right side of bullet breaks left plane of player
					pos1.x < pos2.x + rect2.width && //left side of bullet is within the)
					pos1.y + rect1.height > pos2.y &&
					pos1.y < pos2.y + rect2.height){
					return true;
				} 
	return false;
}
module.exports = function (entities) {

 entities.registerSearch("movingBullets", ["bullet", "velocity"]);
	 return function collisionDetection(entities){
		var bullets = entities.find("movingBullets");
		var players = entities.find("player");
		var activators = entities.find("acivators");

		for (var i = 0; i < bullets.length; i++){
			//loop through bullets
			//console.log(bullets[i], players);
			var bPos = entities.getComponent(bullets[i], "position");
			var bRect = entities.getComponent(bullets[i], "rectangle");
			var active = entities.getComponent(bullets[i], "active");
			if(active){
				//loop through players looking for collisions.
				for(var x = 0; x < players.length; x++){
					var pPos = entities.getComponent(players[x], "position");
					var pRect = entities.getComponent(entities.getComponent(players[x], "body"), "rectangle");
					console.log('detecting', pRect);

					if(collides(bPos, bRect, pPos, pRect)){
						console.log("collision player", players[x], "bullet", bullets[i]);
					} 
				}
			} else{
				console.log("detecting activators");
				for(var x = 0; x < activators.length; x++){
					var aPos = entities.getComponent(players[x], "position");
					var aRect = entities.getComponent(entities.getComponent(players[x], "body"), "rectangle");
					console.log('detecting', pRect);

					if(collides(bPos, bRect, aPos, aRect)){
						console.log("collision activators", players[x], "bullet", bullets[i]);
					} 
				}
			}
		}
	}
}
