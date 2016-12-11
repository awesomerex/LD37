module.exports = function() {
  return function(entities, elapsed) {
    var ids = entities.find("lifetime").slice();
    for (var i = 0; i < ids.length; i++) {
      var lifetime = entities.getComponent(ids[i], "lifetime");
      lifetime.time -= elapsed;
      if (lifetime.time <= 0) {
        if (lifetime.onExpire) {
          lifetime.onExpire(ids[i]);
        }
        entities.destroy(ids[i]);
      }
    }
  }
};
