module.exports = {
  factory: function velocity() {
    return {
      vx: 0,
      vy: 0
    }
  },
  reset: function(velocity) {
    velocity.vx = 0;
    velocity.vy = 0;
  }
}
