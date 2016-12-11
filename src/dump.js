module.exports = function dump(drawable, indent) {
  if (indent === undefined) {
    indent = 0;
  }

  var s = "";
  for (var i = 0; i < indent; i++) {
    s += " ";
  }
  s += drawable.className + "(" + drawable.entity + ") global(" + drawable.worldTransform.tx + ", " + drawable.worldTransform.ty + ") - local(" + drawable.x + ", " + drawable.y + ") angle(" + drawable.rotation.toFixed(2) + ")\n";

  for (i = 0; i < drawable.children.length; i++) {
    s += dump(drawable.children[i], indent + 2);
  }

  return s;
};
