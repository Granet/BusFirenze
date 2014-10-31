function SHA1(a) {
  function c(a, b) {
    return a << b | a >>> 32 - b
  }
  function f(a) {
    var b = '',
    c,
    d;
    for (c = 7; c >= 0; c--) d = a >>> c * 4 & 15,
    b += d.toString(16);
    return b
  }
  var b,
  e,
  j = Array(80),
  n = 1732584193,
  o = 4023233417,
  p = 2562383102,
  q = 271733878,
  r = 3285377520,
  d,
  g,
  h,
  k,
  l,
  a = function (a) {
    for (var a = a.replace(/\r\n/g, '\n'), b = '', c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      d < 128 ? b += String.fromCharCode(d)  : (d > 127 && d < 2048 ? b += String.fromCharCode(d >> 6 | 192)  : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d &
      63 | 128))
    }
    return b
  }(a);
  d = a.length;
  var m = [
  ];
  for (b = 0; b < d - 3; b += 4) e = a.charCodeAt(b) << 24 | a.charCodeAt(b + 1) << 16 | a.charCodeAt(b + 2) << 8 | a.charCodeAt(b + 3),
  m.push(e);
  switch (d % 4) {
  case 0:
    b = 2147483648;
    break;
  case 1:
    b = a.charCodeAt(d - 1) << 24 | 8388608;
    break;
  case 2:
    b = a.charCodeAt(d - 2) << 24 | a.charCodeAt(d - 1) << 16 | 32768;
    break;
  case 3:
    b = a.charCodeAt(d - 3) << 24 | a.charCodeAt(d - 2) << 16 | a.charCodeAt(d - 1) << 8 | 128
  }
  for (m.push(b); m.length % 16 != 14; ) m.push(0);
  m.push(d >>> 29);
  m.push(d << 3 & 4294967295);
  for (a = 0; a < m.length; a += 16) {
    for (b = 0; b < 16; b++) j[b] =
    m[a + b];
    for (b = 16; b <= 79; b++) j[b] = c(j[b - 3] ^ j[b - 8] ^ j[b - 14] ^ j[b - 16], 1);
    e = n;
    d = o;
    g = p;
    h = q;
    k = r;
    for (b = 0; b <= 19; b++) l = c(e, 5) + (d & g | ~d & h) + k + j[b] + 1518500249 & 4294967295,
    k = h,
    h = g,
    g = c(d, 30),
    d = e,
    e = l;
    for (b = 20; b <= 39; b++) l = c(e, 5) + (d ^ g ^ h) + k + j[b] + 1859775393 & 4294967295,
    k = h,
    h = g,
    g = c(d, 30),
    d = e,
    e = l;
    for (b = 40; b <= 59; b++) l = c(e, 5) + (d & g | d & h | g & h) + k + j[b] + 2400959708 & 4294967295,
    k = h,
    h = g,
    g = c(d, 30),
    d = e,
    e = l;
    for (b = 60; b <= 79; b++) l = c(e, 5) + (d ^ g ^ h) + k + j[b] + 3395469782 & 4294967295,
    k = h,
    h = g,
    g = c(d, 30),
    d = e,
    e = l;
    n = n + e & 4294967295;
    o = o + d & 4294967295;
    p = p + g & 4294967295;
    q = q + h & 4294967295;
    r = r + k & 4294967295;
  }
  l = f(n) + f(o) + f(p) + f(q) + f(r);
  return l.toLowerCase();
}

function calculateNormalizedTimeFromBegin() {
  var a = new Date,
  a = (Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()) - 0) / 1000 / 900;
  return Math.round(a) * 900;
}

function getDynamicPassword(a) {
  a = calculateNormalizedTimeFromBegin() + a;
  return SHA1(a);
}