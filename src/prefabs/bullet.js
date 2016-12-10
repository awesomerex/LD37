
module.exports = function makeBullet(entities, source) {
  var id = entities.create();
  entities.setComponent(id, "bullet", true );
  entities.setComponent(id, "parent", source );
  var position = entities.addComponent(id, "position");

  position.x = 50;
  position.y = 0;

  var rectangle = entities.addComponent(id, "rectangle");
  rectangle.width = 20;
  rectangle.height = 20;
  rectangle.color = 0x00FF00;
  var velocity = entities.addComponent(id, "velocity");
  velocity.vx = 0;
  return id;
}
