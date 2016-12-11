var bullet = require("./bullet");
var PIXI =require("pixi.js");

module.exports = function makePlayerContainer(entities, gamepadIndex, x, y, color, rotation, name) {
  var ghostContainer = entities.create();
  entities.setComponent(ghostContainer, "name", name);
  entities.setComponent(ghostContainer, "color", color);
  entities.setComponent(ghostContainer, "gamepadIndex", gamepadIndex);

  var graphics = entities.addComponent(ghostContainer, "graphics");
  graphics.drawable = new PIXI.Container();
  graphics.drawable.entity = ghostContainer;
  graphics.drawable.className = "wraparound player container";

  var position = entities.addComponent(ghostContainer, "position");
  position.x = x;
  position.y = y;

  var ghosts = entities.addComponent(ghostContainer, "ghosts", ghosts);
  var screenWidth = 800;
  var screenHeight = 600;
  for (var y = -screenHeight; y <= screenHeight; y += screenHeight) {
    for (var x = -screenWidth; x <= screenWidth; x += screenWidth) {
      ghosts.push(makePlayer(entities, ghostContainer, x, y, color, rotation))
    }
  }

  return ghostContainer;
};

function makePlayer(entities, parent, x, y, color, rotation) {
  var player = entities.create();
  entities.setComponent(player, "player", true);
  entities.setComponent(player, "parent", parent);

  var graphics = entities.addComponent(player, "graphics");
  graphics.drawable = new PIXI.Container();
  graphics.drawable.entity = player;
  graphics.drawable.className = "single player container";

  var position = entities.addComponent(player, "position");
  position.x = x;
  position.y = y;
  position.rotation = rotation;

  entities.setComponent(player, "body", makePlayerBody(entities, player, color));
  bullet(entities, player);

  return player;
}

function makePlayerBody(entities, parent, color) {
  var body = entities.create();
  var rectangle = entities.addComponent(body, "rectangle");
  rectangle.color = color;
  rectangle.radius = 20;

  entities.setComponent(body, "parent", parent);
  return body;
}
