! function(t) {
  function r(e) {
    if (n[e]) return n[e].exports;
    var o = n[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return t[e].call(o.exports, o, o.exports, r), o.l = !0, o.exports
  }
  var n = {};
  r.m = t, r.c = n, r.d = function(t, n, e) {
    r.o(t, n) || Object.defineProperty(t, n, {
      configurable: !1,
      enumerable: !0,
      get: e
    })
  }, r.n = function(t) {
    var n = t && t.__esModule ? function() {
      return t.default
    } : function() {
      return t
    };
    return r.d(n, "a", n), n
  }, r.o = function(t, r) {
    return Object.prototype.hasOwnProperty.call(t, r)
  }, r.p = "", r(r.s = 0)
}([function(t, r, n) {
  t.exports = n(1)
}, function(t, r, n) {
  "use strict";
  Object.defineProperty(r, "__esModule", {
    value: !0
  });
  var e = (n(2), document.getElementsByTagName("script")),
    o = e[e.length - 1].src,
    i = o.split("master-loader.js")[0],
    c = {
      unity: "unity.js",
      "unity-2020": "unity-2020.js"
    };
  if (window.location.href.indexOf("pokiForceLocalLoader") >= 0 && (c.unity = "/unity/dist/unity.js", c["unity-2020"] = "/unity-2020/dist/unity-2020.js", i = "/loaders"), !window.config) throw Error("window.config not found");
  var a = c[window.config.loader];
  if (!a) throw Error('Loader "'.concat(window.config.loader, '" not found'));
  if (!window.config.unityWebglLoaderUrl) {
    var u = window.config.unityVersion ? window.config.unityVersion.split(".") : [],
      s = u[0],
      f = u[1];
    switch (s) {
      case "2019":
        window.config.unityWebglLoaderUrl = 1 === f ? "./loaders/v2/unity/static/UnityLoader.2019.1.js" : "./loaders/v2/unity/static/UnityLoader.2019.2.js";
        break;
      default:
        window.config.unityWebglLoaderUrl = "./loaders/v2/unity/static/UnityLoader.js"
    }
  }
  var d = document.createElement("script");
  d.src = window.location.href + "scripts/v2/poki-sdk.js", d.onload = function() {
    var t = document.createElement("script");
    t.src = i + a, document.body.appendChild(t)
  }, document.body.appendChild(d)
}, function(t, r, n) {
  "use strict";

  function e(t) {
    if (!a) return t;
    try {
      return t.replace(c, a)
    } catch (r) {
      return t
    }
  }

  function o(t) {
    return a && c ? t.replace(a, c) : t
  }

  function i(t) {
    return t.split("/idbfs/")[1].split("/")[0]
  }
  var c, a, u = n(3);
  try {
    a = localStorage.getItem("savegame_idbfs_hash")
  } catch (t) {}
  try {
    try {
      var s = window.location.href.split("?")[0].replace(/\/[^/]*$/, "");
      c = Object(u.a)(s)
    } catch (t) {}
    var f = Object.getOwnPropertyDescriptor(IDBCursor.prototype, "primaryKey");
    Object.defineProperty(IDBCursor.prototype, "primaryKey", {
      get: function() {
        return o(f.get.call(this))
      },
      configurable: !0
    });
    var d = window.IDBObjectStore.prototype.put;
    window.IDBObjectStore.prototype.put = function() {
      if ("UnityCache" === this.transaction.db.name) return {
        onsuccess: function() {},
        onerror: function() {}
      };
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      if ("/idbfs" === this.transaction.db.name) {
        try {
          a || (a = i(r[1]), localStorage.setItem("savegame_idbfs_hash", a))
        } catch (t) {}
        var o = [].concat(r);
        return o[1] = e(r[1]), d.apply(this, o)
      }
      return d.apply(this, r)
    };
    var p = window.IDBObjectStore.prototype.get;
    window.IDBObjectStore.prototype.get = function() {
      for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
      if ("/idbfs" === this.transaction.db.name) {
        var o = [].concat(r);
        return o[0] = e(r[0]), p.apply(this, o)
      }
      return p.apply(this, r)
    }
  } catch (t) {}
}, function(t, r, n) {
  "use strict";

  function e(t) {
    for (var r, n = "0123456789ABCDEF", e = "", o = 0; o < t.length; o++) r = t.charCodeAt(o), e += n.charAt(r >>> 4 & 15) + n.charAt(15 & r);
    return e
  }

  function o(t) {
    for (var r = Array(t.length >> 2), n = 0; n < r.length; n++) r[n] = 0;
    for (n = 0; n < 8 * t.length; n += 8) r[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
    return r
  }

  function i(t) {
    for (var r = "", n = 0; n < 32 * t.length; n += 8) r += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
    return r
  }

  function c(t, r) {
    t[r >> 5] |= 128 << r % 32, t[14 + (r + 64 >>> 9 << 4)] = r;
    for (var n = 1732584193, e = -271733879, o = -1732584194, i = 271733878, c = 0; c < t.length; c += 16) {
      var a = n,
        l = e,
        y = o,
        h = i;
      e = d(e = d(e = d(e = d(e = f(e = f(e = f(e = f(e = s(e = s(e = s(e = s(e = u(e = u(e = u(e = u(e, o = u(o, i = u(i, n = u(n, e, o, i, t[c + 0], 7, -680876936), e, o, t[c + 1], 12, -389564586), n, e, t[c + 2], 17, 606105819), i, n, t[c + 3], 22, -1044525330), o = u(o, i = u(i, n = u(n, e, o, i, t[c + 4], 7, -176418897), e, o, t[c + 5], 12, 1200080426), n, e, t[c + 6], 17, -1473231341), i, n, t[c + 7], 22, -45705983), o = u(o, i = u(i, n = u(n, e, o, i, t[c + 8], 7, 1770035416), e, o, t[c + 9], 12, -1958414417), n, e, t[c + 10], 17, -42063), i, n, t[c + 11], 22, -1990404162), o = u(o, i = u(i, n = u(n, e, o, i, t[c + 12], 7, 1804603682), e, o, t[c + 13], 12, -40341101), n, e, t[c + 14], 17, -1502002290), i, n, t[c + 15], 22, 1236535329), o = s(o, i = s(i, n = s(n, e, o, i, t[c + 1], 5, -165796510), e, o, t[c + 6], 9, -1069501632), n, e, t[c + 11], 14, 643717713), i, n, t[c + 0], 20, -373897302), o = s(o, i = s(i, n = s(n, e, o, i, t[c + 5], 5, -701558691), e, o, t[c + 10], 9, 38016083), n, e, t[c + 15], 14, -660478335), i, n, t[c + 4], 20, -405537848), o = s(o, i = s(i, n = s(n, e, o, i, t[c + 9], 5, 568446438), e, o, t[c + 14], 9, -1019803690), n, e, t[c + 3], 14, -187363961), i, n, t[c + 8], 20, 1163531501), o = s(o, i = s(i, n = s(n, e, o, i, t[c + 13], 5, -1444681467), e, o, t[c + 2], 9, -51403784), n, e, t[c + 7], 14, 1735328473), i, n, t[c + 12], 20, -1926607734), o = f(o, i = f(i, n = f(n, e, o, i, t[c + 5], 4, -378558), e, o, t[c + 8], 11, -2022574463), n, e, t[c + 11], 16, 1839030562), i, n, t[c + 14], 23, -35309556), o = f(o, i = f(i, n = f(n, e, o, i, t[c + 1], 4, -1530992060), e, o, t[c + 4], 11, 1272893353), n, e, t[c + 7], 16, -155497632), i, n, t[c + 10], 23, -1094730640), o = f(o, i = f(i, n = f(n, e, o, i, t[c + 13], 4, 681279174), e, o, t[c + 0], 11, -358537222), n, e, t[c + 3], 16, -722521979), i, n, t[c + 6], 23, 76029189), o = f(o, i = f(i, n = f(n, e, o, i, t[c + 9], 4, -640364487), e, o, t[c + 12], 11, -421815835), n, e, t[c + 15], 16, 530742520), i, n, t[c + 2], 23, -995338651), o = d(o, i = d(i, n = d(n, e, o, i, t[c + 0], 6, -198630844), e, o, t[c + 7], 10, 1126891415), n, e, t[c + 14], 15, -1416354905), i, n, t[c + 5], 21, -57434055), o = d(o, i = d(i, n = d(n, e, o, i, t[c + 12], 6, 1700485571), e, o, t[c + 3], 10, -1894986606), n, e, t[c + 10], 15, -1051523), i, n, t[c + 1], 21, -2054922799), o = d(o, i = d(i, n = d(n, e, o, i, t[c + 8], 6, 1873313359), e, o, t[c + 15], 10, -30611744), n, e, t[c + 6], 15, -1560198380), i, n, t[c + 13], 21, 1309151649), o = d(o, i = d(i, n = d(n, e, o, i, t[c + 4], 6, -145523070), e, o, t[c + 11], 10, -1120210379), n, e, t[c + 2], 15, 718787259), i, n, t[c + 9], 21, -343485551), n = p(n, a), e = p(e, l), o = p(o, y), i = p(i, h)
    }
    return Array(n, e, o, i)
  }

  function a(t, r, n, e, o, i) {
    return p(l(p(p(r, t), p(e, i)), o), n)
  }

  function u(t, r, n, e, o, i, c) {
    return a(r & n | ~r & e, t, r, o, i, c)
  }

  function s(t, r, n, e, o, i, c) {
    return a(r & e | n & ~e, t, r, o, i, c)
  }

  function f(t, r, n, e, o, i, c) {
    return a(r ^ n ^ e, t, r, o, i, c)
  }

  function d(t, r, n, e, o, i, c) {
    return a(n ^ (r | ~e), t, r, o, i, c)
  }

  function p(t, r) {
    var n = (65535 & t) + (65535 & r);
    return (t >> 16) + (r >> 16) + (n >> 16) << 16 | 65535 & n
  }

  function l(t, r) {
    return t << r | t >>> 32 - r
  }
  r.a = function(t) {
    return e(i(c(o(t), 8 * t.length))).toLowerCase()
  }
}]);