module.exports = {
  factory: function graphicsFactory() {
    return {};
  },
  reset: function(graphics) {
    delete graphics.renderer;
  }
}
