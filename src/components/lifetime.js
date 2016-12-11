module.exports = {
  factory: function lifetime() {
    return {
      time: 100
    };
  },
  reset: function(lifetime) {
    lifetime.time = 100;
  }
}
