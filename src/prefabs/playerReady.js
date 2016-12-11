module.exports = function makePlayerContainer(entities, gamepadIndex, x, y, color, rotation, name) {
  var id = entities.create();

  var playerReady = entities.addComponent(id, "playerReady");
  playerReady.gamepad = gamepadIndex;
  playerReady.x = x;
  playerReady.y = y;
  playerReady.color = color;
  playerReady.rotation = rotation;
  playerReady.name = name;

  return id;
}
