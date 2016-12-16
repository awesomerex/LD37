module.exports = function makePlayerContainer(entities, gamepadIndex, x, y, color, rotation, name) {
  var id = entities.create();

  var position = entities.addComponent(id, "position");
  position.x = x;
  position.y = y;

  var playerReady = entities.addComponent(id, "playerReady");
  playerReady.gamepad = gamepadIndex;
  playerReady.color = color;
  playerReady.rotation = rotation;
  playerReady.name = name;

  return id;
}
