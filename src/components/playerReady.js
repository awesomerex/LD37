module.exports = {
  factory: function playerReady() {
    return {
      gamepad: 0,
      time: 0,
      color: 0,
      rotation: 0,
      name: "PLAYER",
    };
  },
  reset: function(playerReady) {
    playerReady.gamepad = 0;
    playerReady.time = 0;
    playerReady.color = 0;
    playerReady.rotation = 0;
    playerReady.name = "PLAYER";
  }
}
