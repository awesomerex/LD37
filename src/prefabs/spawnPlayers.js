var deletePlayer = require("../deletePlayer");
var playerReady = require("./playerReady");

module.exports = function(entities) {
  var ids = entities.find("player")
  while (ids.length > 0) {
    deletePlayer(entities, ids[0]);
  }

  playerReady(entities, 0, 100, 300, 0x00AAFF, 0, "Blue");
  playerReady(entities, 1, 700, 300, 0xFF00AA, Math.PI, "Red");
  playerReady(entities, 2, 400, 100, 0xAAFF00, Math.PI / 2, "Green");
  playerReady(entities, 3, 400, 500, 0xAA00FF, Math.PI * 3 / 2, "Purple");
};
