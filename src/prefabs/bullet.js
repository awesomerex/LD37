
module.exports = function (entities, source) {
	var spawnerPosition = entities.getComponent(source, "position");
	var spawnerRectangle = entities.getComponent(source, "rectangle");

	console.log(spawnerPosition, spawnerRectangle);

	var id = entities.create();
	entities.setComponent(id, "bullet", true );
	entities.setComponent(id, "parent", source );
	var position = entities.addComponent(id, "position");
	
	position.x = spawnerPosition.x + spawnerRectangle.width;
	position.y = spawnerPosition.y + spawnerRectangle.height/2;
	
	var rectangle = entities.addComponent(id, "rectangle");
	rectangle.width = 20;
	rectangle.height = 20;
	rectangle.color = 0x00FF00;
	var velocity = entities.addComponent(id, "velocity");
	velocity.vx = 0;
	return id;
}