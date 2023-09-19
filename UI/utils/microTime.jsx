function microtime(getAsFloat) {
  var s,
    now = (Date.now ? Date.now() : new Date().getTime()) / 1000;

  // Getting microtime as a float is easy
  if (getAsFloat) {
    return now;
  }

  // Dirty trick to only get the integer part
  s = now | 0;

  return Math.round((now - s) * 1000) / 1000 + " " + s;
}
export default microtime;
