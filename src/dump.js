module.exports = function dump(drawable, indent) {
  if (indent === undefined) {
    indent = 0;
  }

  var s = "";
  for (var i = 0; i < indent; i++) {
    s += " ";
  }
  s += drawable.entity + " (" + drawable.worldTransform.tx + ", " + drawable.worldTransform.ty + ") - (" + drawable.x + ", " + drawable.y + ")\n";

  for (i = 0; i < drawable.children.length; i++) {
    s += dump(drawable.children[i], indent + 2);
  }

  return s;
};
