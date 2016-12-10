var bullet = require("./bullet");

module.exports = function makePlayer(entities, gamepadIndex, x, y, color) {
  var player = entities.create();

  var position = entities.addComponent(player, "position");
  position.x = x;
  position.y = y;

  var rectangle = entities.addComponent(player, "rectangle");
  rectangle.color = color;

  var gamepad = entities.addComponent(player, "gamepad");
  gamepad.index = gamepadIndex;

  bullet(entities, player);

  return player;
};
