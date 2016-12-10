var bullet = require("./bullet");
var PIXI =require("pixi.js");

module.exports = function makePlayer(entities, gamepadIndex, x, y, color) {
  var player = entities.create();

  var graphics = entities.addComponent(player, "graphics");
  graphics.drawable = new PIXI.Container();

  var position = entities.addComponent(player, "position");
  position.x = x;
  position.y = y;

  var gamepad = entities.addComponent(player, "gamepad");
  gamepad.index = gamepadIndex;

  makePlayerBody(entities, player, color);
  bullet(entities, player);

  return player;
};

function makePlayerBody(entities, parent, color) {
  var body = entities.create();

  var rectangle = entities.addComponent(body, "rectangle");
  rectangle.color = color;

  entities.setComponent(body, "parent", parent);
}
