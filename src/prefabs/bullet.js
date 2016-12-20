module.exports = function makeBullet(entities, parent, color) {

  var id = entities.create();
  entities.setComponent(id, "bullet", true);
  entities.setComponent(id, "color", color);
  entities.setComponent(id, "parent", parent);

  var position = entities.addComponent(id, "position");
  position.x = 50;
  position.y = 0;

  var rectangle = entities.addComponent(id, "rectangle");
  rectangle.width = 20;
  rectangle.height = 20;
  rectangle.color = 0xF6F7BD;
  rectangle.radius = 10;

  return id;
}
