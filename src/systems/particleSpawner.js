var makeParticle = require("../prefabs/makeParticle");

module.exports = function () {
	return function particleSpawner(entities, elapsed){
		var ids = entities.find("particleSpawner");
		for(var i = 0; i < ids.length; i++){

			var ps = entities.getComponent(ids[i], "particleSpawner");
			ps.time += elapsed;
			while(ps.time > ps.maxTime){
				ps.time -= ps.maxTime;
				var position = entities.getComponent(ids[i], "position");
				var image = "img/red-pixel.png";
				for(var x = 0; x < 1; x++){
					makeParticle(entities, position.x, position.y, ps.vx, ps.vy, image);
				}
			}
		}
	}
}
