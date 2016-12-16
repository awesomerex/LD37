module.exports = {
  factory: function arc() {
    return {
      color: 0x0000FF,
      endAngle: Math.PI * 2,
      radius: 10,
      startAngle: 0
    };
  },
  reset: function(arc) {
    arc.color = 0x0000FF;
    arc.endAngle = Math.PI * 2;
    arc.radius = 10;
    arc.startAngle = 0;
  }
}
