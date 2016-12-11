module.exports = function makeText(entities, message, x, y) {
  var id = entities.create();
  var text = entities.addComponent(id, "text");
  text.text = message;

  var position = entities.addComponent(id, "position");
  position.x = 400;
  position.y = 300;

  return id;
};
