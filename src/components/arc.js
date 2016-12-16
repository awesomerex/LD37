module.exports = {
  factory: function arc() {
    return {
      color: 0x0000FF,
      endAngle: 0,
      radius: 10,
      startAngle: 0
    };
  },
  reset: function(arc) {
    arc.color = 0x0000FF;
    arc.endAngle = 0;
    arc.radius = 10;
    arc.startAngle = 0;
  }
}
