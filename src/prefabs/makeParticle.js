module.exports = function makeParticle(entities, x, y, vx, vy, image){
	var spriteId = entities.create();
	var graphics = entities.addComponent(spriteId, "graphics");

	var sprite = new PIXI.Sprite.fromImage(image);

	sprite.height = 5;
	sprite.width = 5;
	graphics.drawable = sprite;

	velocity = entities.addComponent(spriteId, "velocity");
	velocity.vx = vx;
	velocity.vy = vy;

	var position = entities.addComponent(spriteId, "position");
	position.x = x;
	position.y = y;
	

	var lifetime = entities.addComponent(spriteId, "lifetime");
	lifetime.time = 200;
}