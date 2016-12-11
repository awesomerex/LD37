module.exports = function makeBullet(entities, parent) {

  var id = entities.create();
  entities.setComponent(id, "bullet", true);
  entities.setComponent(id, "parent", parent);

  var position = entities.addComponent(id, "position");
  position.x = 50;
  position.y = 0;

  var rectangle = entities.addComponent(id, "rectangle");
  rectangle.width = 20;
  rectangle.height = 20;
  rectangle.color = 0x00FF00;

  return id;
}
