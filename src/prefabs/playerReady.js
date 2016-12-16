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

  var arc = entities.addComponent(id, "arc");
  arc.color = color;


  var circle = entities.create();
  entities.setComponent(circle, "spawnLocation", true);
  entities.setComponent(circle, "parent", id);
  entities.addComponent(circle, "position");
  var arc = entities.addComponent(circle, "arc");
  arc.color = color;
  arc.lineWidth = 2;
  arc.endAngle = Math.PI * 2;

  return id;
}
