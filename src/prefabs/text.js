module.exports = function makeText(entities, message, x, y, size, color) {
  var id = entities.create();
  var text = entities.addComponent(id, "text");
  text.text = message;
  text.size = size;
  text.color = color;

  var position = entities.addComponent(id, "position");
  position.x = 400;
  position.y = 300;

  return id;
};
