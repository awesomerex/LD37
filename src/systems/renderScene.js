module.exports = function(renderer, stage){
	return function renderScene(entities, elapsed) {
		var ids = entities.find("graphics");
		renderer.render(stage);
	}
}