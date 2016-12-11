var bullet = require("./bullet");
var PIXI =require("pixi.js");

module.exports = function makePlayer(entities, gamepadIndex, x, y, color) {
  var player = entities.create();
  entities.setComponent(player, "player", true);
  var graphics = entities.addComponent(player, "graphics");
  graphics.drawable = new PIXI.Container();
  graphics.drawable.entity = player;

  var position = entities.addComponent(player, "position");
  position.x = x;
  position.y = y;

  var gamepad = entities.addComponent(player, "gamepad");
  gamepad.index = gamepadIndex;

  entities.setComponent(player, "body", makePlayerBody(entities, player, color));
  bullet(entities, player);

  return player;
};

function makePlayerBody(entities, parent, color) {
  var body = entities.create();
  var rectangle = entities.addComponent(body, "rectangle");
  rectangle.color = color;

  entities.setComponent(body, "parent", parent);
  return body;
}
