function createUnityInstance(e, t, n) {
  function r(e, n) {
    if (!r.aborted && t.showBanner) return "error" == n && (r.aborted = !0), t.showBanner(e, n);
    switch (n) {
      case "error":
        console.error(e);
        break;
      case "warning":
        console.warn(e);
        break;
      default:
        console.log(e)
    }
  }

  function o(e) {
    var t = e.reason || e.error,
      n = t ? t.toString() : e.message || e.reason || "",
      r = t && t.stack ? t.stack.toString() : "";
    (n += "\n" + (r = r.startsWith(n) ? r.substring(n.length) : r).trim()) && s.stackTraceRegExp && s.stackTraceRegExp.test(n) && C(n, e.filename || t && (t.fileName || t.sourceURL) || "", e.lineno || t && (t.lineNumber || t.line) || 0)
  }

  function a(e, t, n) {
    var r = e[t];
    void 0 !== r && r || (console.warn('Config option "' + t + '" is missing or empty. Falling back to default value: "' + n + '". Consider updating your WebGL template to include the missing config option.'), e[t] = n)
  }
  n = n || function() {};
  var i, s = {
    canvas: e,
    webglContextAttributes: {
      preserveDrawingBuffer: !1,
      powerPreference: 2
    },
    cacheControl: function(e) {
      return e == s.dataUrl || e.match(/\.bundle/) ? "must-revalidate" : "no-store"
    },
    streamingAssetsUrl: "StreamingAssets",
    downloadProgress: {},
    deinitializers: [],
    intervals: {},
    setInterval: function(e, t) {
      return e = window.setInterval(e, t), this.intervals[e] = !0, e
    },
    clearInterval: function(e) {
      delete this.intervals[e], window.clearInterval(e)
    },
    preRun: [],
    postRun: [],
    print: function(e) {
      console.log(e)
    },
    printErr: function(e) {
      console.error(e), "string" == typeof e && -1 != e.indexOf("wasm streaming compile failed") && (-1 != e.toLowerCase().indexOf("mime") ? r('HTTP Response Header "Content-Type" configured incorrectly on the server for file ' + s.codeUrl + ' , should be "application/wasm". Startup time performance will suffer.', "warning") : r('WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file ' + s.codeUrl + ", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.", "warning"))
    },
    locateFile: function(e) {
      return "build.wasm" == e ? this.codeUrl : e
    },
    disabledCanvasEvents: ["contextmenu", "dragstart"]
  };
  for (i in a(t, "companyName", "Unity"), a(t, "productName", "WebGL Player"), a(t, "productVersion", "1.0"), t) s[i] = t[i];
  s.streamingAssetsUrl = new URL(s.streamingAssetsUrl, document.URL).href;
  var c = s.disabledCanvasEvents.slice();

  function u(e) {
    e.preventDefault()
  }
  c.forEach(function(t) {
    e.addEventListener(t, u)
  }), window.addEventListener("error", o), window.addEventListener("unhandledrejection", o);
  var d = "",
    l = "";

  function h(t) {
    document.webkitCurrentFullScreenElement === e ? e.style.width && (d = e.style.width, l = e.style.height, e.style.width = "100%", e.style.height = "100%") : d && (e.style.width = d, e.style.height = l, l = d = "")
  }
  document.addEventListener("webkitfullscreenchange", h), s.deinitializers.push(function() {
    for (var t in s.disableAccessToMediaDevices(), c.forEach(function(t) {
        e.removeEventListener(t, u)
      }), window.removeEventListener("error", o), window.removeEventListener("unhandledrejection", o), document.removeEventListener("webkitfullscreenchange", h), s.intervals) window.clearInterval(t);
    s.intervals = {}
  }), s.QuitCleanup = function() {
    for (var e = 0; e < s.deinitializers.length; e++) s.deinitializers[e]();
    s.deinitializers = [], "function" == typeof s.onQuit && s.onQuit()
  };
  var f, p, g, m, b, v, y, w, $, S = {
    Module: s,
    SetFullscreen: function() {
      if (s.SetFullscreen) return s.SetFullscreen.apply(s, arguments);
      s.print("Failed to set Fullscreen mode: Player not loaded yet.")
    },
    SendMessage: function() {
      if (s.SendMessage) return s.SendMessage.apply(s, arguments);
      s.print("Failed to execute SendMessage: Player not loaded yet.")
    },
    Quit: function() {
      return new Promise(function(e, t) {
        s.shouldQuit = !0, s.onQuit = e
      })
    },
    GetMemoryInfo: function() {
      var e = s._getMemInfo();
      return {
        totalWASMHeapSize: s.HEAPU32[e >> 2],
        usedWASMHeapSize: s.HEAPU32[1 + (e >> 2)],
        totalJSHeapSize: s.HEAPF64[1 + (e >> 3)],
        usedJSHeapSize: s.HEAPF64[2 + (e >> 3)]
      }
    }
  };

  function C(e, t, n) {
    if (-1 === e.indexOf("fullscreen error")) {
      if (s.startupErrorHandler) {
        s.startupErrorHandler(e, t, n);
        return
      }
      if (s.errorHandler) {
        s.errorHandler(e, t, n);
        return
      }
      console.error("Unity WebGL Error: " + e + "\nFile: " + (t || "unknown") + "\nLine: " + (n || "unknown"))
    }
  }

  function D(e, t) {
    if ("symbolsUrl" != e) {
      var r = s.downloadProgress[e],
        o = (r = r || (s.downloadProgress[e] = {
          started: !1,
          finished: !1,
          lengthComputable: !1,
          total: 0,
          loaded: 0
        }), "object" != typeof t || "progress" != t.type && "load" != t.type || (r.started || (r.started = !0, r.lengthComputable = t.lengthComputable), r.total = t.total, r.loaded = t.loaded, "load" == t.type && (r.finished = !0)), 0),
        a = 0,
        i = 0,
        c = 0,
        u = 0;
      for (e in s.downloadProgress) {
        if (!(r = s.downloadProgress[e]).started) return;
        i++, r.lengthComputable ? (o += r.loaded, a += r.total, c++) : r.finished || u++
      }
      n(.9 * (i ? (i - u - (a ? c * (a - o) / a : 0)) / i : 0))
    }
  }

  function x() {
    var e = this;
    this.isConnected = this.connect().then(function() {
      return e.cleanUpCache()
    }), this.isConnected.catch(function(e) {
      e = "Error when initializing cache: " + e, console.log("[UnityCache] " + e)
    })
  }

  function U(e) {
    console.log("[UnityCache] " + e)
  }

  function P(e) {
    return P.link = P.link || document.createElement("a"), P.link.href = e, P.link.href
  }
  return s.SystemInfo = function() {
    var e, t, n, r, o = navigator.userAgent + " ",
      a = [
        ["Firefox", "Firefox"],
        ["OPR", "Opera"],
        ["Edg", "Edge"],
        ["SamsungBrowser", "Samsung Browser"],
        ["Trident", "Internet Explorer"],
        ["MSIE", "Internet Explorer"],
        ["Chrome", "Chrome"],
        ["CriOS", "Chrome on iOS Safari"],
        ["FxiOS", "Firefox on iOS Safari"],
        ["Safari", "Safari"],
      ];

    function i(e, t, n) {
      return (e = RegExp(e, "i").exec(t)) && e[n]
    }
    for (var s = 0; s < a.length; ++s)
      if (t = i(a[s][0] + "[/ ](.*?)[ \\)]", o, 1)) {
        e = a[s][1];
        break
      }
    "Safari" == e && (t = i("Version/(.*?) ", o, 1)), "Internet Explorer" == e && (t = i("rv:(.*?)\\)? ", o, 1) || t);
    for (var c = [
        ["Windows (.*?)[;)]", "Windows"],
        ["Android ([0-9_.]+)", "Android"],
        ["iPhone OS ([0-9_.]+)", "iPhoneOS"],
        ["iPad.*? OS ([0-9_.]+)", "iPadOS"],
        ["FreeBSD( )", "FreeBSD"],
        ["OpenBSD( )", "OpenBSD"],
        ["Linux|X11()", "Linux"],
        ["Mac OS X ([0-9_\\.]+)", "MacOS"],
        ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"],
      ], u = 0; u < c.length; ++u)
      if (l = i(c[u][0], o, 1)) {
        n = c[u][1], l = l.replace(/_/g, ".");
        break
      } var d, l = {
        "NT 5.0": "2000",
        "NT 5.1": "XP",
        "NT 5.2": "Server 2003",
        "NT 6.0": "Vista",
        "NT 6.1": "7",
        "NT 6.2": "8",
        "NT 6.3": "8.1",
        "NT 10.0": "10"
      } [l] || l,
      h = ((h = document.createElement("canvas")) && (d = (f = h.getContext("webgl2")) ? 2 : 0, f || (f = h && h.getContext("webgl")) && (d = 1), f && (r = f.getExtension("WEBGL_debug_renderer_info") && f.getParameter(37446) || f.getParameter(7937))), "undefined" != typeof SharedArrayBuffer),
      f = "object" == typeof WebAssembly && "function" == typeof WebAssembly.compile;
    return {
      width: screen.width,
      height: screen.height,
      userAgent: o.trim(),
      browser: e || "Unknown browser",
      browserVersion: t || "Unknown version",
      mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
      os: n || "Unknown OS",
      osVersion: l || "Unknown OS Version",
      gpu: r || "Unknown GPU",
      language: navigator.userLanguage || navigator.language,
      hasWebGL: d,
      hasCursorLock: !!document.body.requestPointerLock,
      hasFullscreen: !!document.body.requestFullscreen || !!document.body.webkitRequestFullscreen,
      hasThreads: h,
      hasWasm: f,
      hasWasmThreads: !1
    }
  }(), s.abortHandler = function(e) {
    return C(e, "", 0), !0
  }, Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50), s.readBodyWithProgress = function(e, t, n) {
    var r = e.body ? e.body.getReader() : void 0,
      o = void 0 !== e.headers.get("Content-Length"),
      a = function(e, t) {
        if (!t) return 0;
        var t = e.headers.get("Content-Encoding"),
          n = parseInt(e.headers.get("Content-Length"));
        switch (t) {
          case "br":
            return Math.round(5 * n);
          case "gzip":
            return Math.round(4 * n);
          default:
            return n
        }
      }(e, o),
      i = new Uint8Array(a),
      s = [],
      c = 0,
      u = 0;
    return o || console.warn("[UnityCache] Response is served without Content-Length header. Please reconfigure server to include valid Content-Length for better download performance."), (function d() {
      return void 0 === r ? e.arrayBuffer().then(function(r) {
        var a = new Uint8Array(r);
        return t({
          type: "progress",
          response: e,
          total: r.length,
          loaded: 0,
          lengthComputable: o,
          chunk: n ? a : null
        }), a
      }) : r.read().then(function(r) {
        if (r.done) {
          if (c === a) return i;
          if (c < a) return i.slice(0, c);
          for (var l = new Uint8Array(c), h = (l.set(i, 0), u), f = 0; f < s.length; ++f) l.set(s[f], h), h += s[f].length;
          return l
        }
        return c + r.value.length <= i.length ? (i.set(r.value, c), u = c + r.value.length) : s.push(r.value), t({
          type: "progress",
          response: e,
          total: Math.max(a, c += r.value.length),
          loaded: c,
          lengthComputable: o,
          chunk: n ? r.value : null
        }), d()
      })
    })().then(function(n) {
      return t({
        type: "load",
        response: e,
        total: n.length,
        loaded: n.length,
        lengthComputable: o,
        chunk: null
      }), e.parsedBody = n, e
    })
  }, s.fetchWithProgress = function(e, t) {
    var n = function() {};
    return t && t.onProgress && (n = t.onProgress), fetch(e, t).then(function(e) {
      return s.readBodyWithProgress(e, n, t.enableStreamingDownload)
    })
  }, s.UnityCache = (f = {
    name: "UnityCache",
    version: 4
  }, p = {
    name: "RequestMetaDataStore",
    version: 1
  }, g = "RequestStore", m = "WebAssembly", b = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, v = null, x.getInstance = function() {
    return v = v || new x
  }, x.destroyInstance = function() {
    return v ? v.close().then(function() {
      v = null
    }) : Promise.resolve()
  }, x.prototype.clearCache = function() {
    var e = this;
    return this.isConnected.then(function() {
      return e.execute(p.name, "clear", [])
    }).then(function() {
      return e.cache.keys()
    }).then(function t(n) {
      var r;
      return 0 === n.length ? Promise.resolve() : (r = n.pop(), e.cache.delete(r).then(function() {
        return t(n)
      }))
    })
  }, x.UnityCacheDatabase = f, x.RequestMetaDataStore = p, x.MaximumCacheSize = 1073741824, x.prototype.loadRequest = function(e) {
    var t = this;
    return t.isConnected.then(function() {
      return Promise.all([t.cache.match(e), t.loadRequestMetaData(e)])
    }).then(function(e) {
      if (void 0 !== e[0] && void 0 !== e[1]) return {
        response: e[0],
        metaData: e[1]
      }
    })
  }, x.prototype.loadRequestMetaData = function(e) {
    return e = "string" == typeof e ? e : e.url, this.execute(p.name, "get", [e])
  }, x.prototype.updateRequestMetaData = function(e) {
    return this.execute(p.name, "put", [e])
  }, x.prototype.storeRequest = function(e, t) {
    var n = this;
    return n.isConnected.then(function() {
      return n.cache.put(e, t)
    })
  }, x.prototype.close = function() {
    return this.isConnected.then((function() {
      this.database && (this.database.close(), this.database = null), this.cache && (this.cache = null)
    }).bind(this))
  }, x.prototype.connect = function() {
    var e = this;
    return void 0 === b ? Promise.reject(Error("Could not connect to cache: IndexedDB is not supported.")) : void 0 === window.caches ? Promise.reject(Error("Could not connect to cache: Cache API is not supported.")) : new Promise(function(t, n) {
      try {
        function r() {
          e.openDBTimeout && (clearTimeout(e.openDBTimeout), e.openDBTimeout = null)
        }
        e.openDBTimeout = setTimeout(function() {
          void 0 === e.database && n(Error("Could not connect to cache: Database timeout."))
        }, 2e4);
        var o = b.open(f.name, f.version);
        o.onupgradeneeded = e.upgradeDatabase.bind(e), o.onsuccess = function(n) {
          r(), e.database = n.target.result, t()
        }, o.onerror = function(t) {
          r(), e.database = null, n(Error("Could not connect to database."))
        }
      } catch (a) {
        r(), e.database = null, e.cache = null, n(Error("Could not connect to cache: Could not connect to database."))
      }
    }).then(function() {
      var e = f.name + "_" + s.companyName + "_" + s.productName;
      return caches.open(e)
    }).then(function(t) {
      e.cache = t
    })
  }, x.prototype.upgradeDatabase = function(e) {
    var t, e = e.target.result;
    e.objectStoreNames.contains(p.name) || (t = e.createObjectStore(p.name, {
      keyPath: "url"
    }), ["accessedAt", "updatedAt"].forEach(function(e) {
      t.createIndex(e, e)
    })), e.objectStoreNames.contains(g) && e.deleteObjectStore(g), e.objectStoreNames.contains(m) && e.deleteObjectStore(m)
  }, x.prototype.execute = function(e, t, n) {
    return this.isConnected.then((function() {
      return new Promise((function(r, o) {
        try {
          var a, i, s;
          null === this.database ? o(Error("indexedDB access denied")) : (a = -1 != ["put", "delete", "clear"].indexOf(t) ? "readwrite" : "readonly", i = this.database.transaction([e], a).objectStore(e), "openKeyCursor" == t && (i = i.index(n[0]), n = n.slice(1)), (s = i[t].apply(i, n)).onsuccess = function(e) {
            r(e.target.result)
          }, s.onerror = function(e) {
            o(e)
          })
        } catch (c) {
          o(c)
        }
      }).bind(this))
    }).bind(this))
  }, x.prototype.getMetaDataEntries = function() {
    var e = this,
      t = 0,
      n = [];
    return new Promise(function(r, o) {
      var a = e.database.transaction([p.name], "readonly").objectStore(p.name).openCursor();
      a.onsuccess = function(e) {
        (e = e.target.result) ? (t += e.value.size, n.push(e.value), e.continue()) : r({
          metaDataEntries: n,
          cacheSize: t
        })
      }, a.onerror = function(e) {
        o(e)
      }
    })
  }, x.prototype.cleanUpCache = function() {
    var e = this;
    return this.getMetaDataEntries().then(function(t) {
      for (var n = t.metaDataEntries, r = t.cacheSize, o = [], a = [], i = 0; i < n.length; ++i) n[i].version == s.productVersion ? a.push(n[i]) : (o.push(n[i]), r -= n[i].size);
      for (a.sort(function(e, t) {
          return e.accessedAt - t.accessedAt
        }), i = 0; i < a.length && !(r < x.MaximumCacheSize); ++i) o.push(a[i]), r -= a[i].size;
      return function t() {
        var n;
        return 0 === o.length ? Promise.resolve() : (n = o.pop(), e.cache.delete(n.url).then(function(t) {
          var r;
          if (t) return r = n.url, new Promise(function(t, n) {
            var o = e.database.transaction([p.name], "readwrite");
            o.objectStore(p.name).delete(r), o.oncomplete = t, o.onerror = n
          })
        }).then(t))
      }()
    })
  }, x), s.cachedFetch = (y = s.UnityCache, w = s.fetchWithProgress, $ = s.readBodyWithProgress, function(e, t) {
    var n, r, o = y.getInstance(),
      a = P("string" == typeof e ? e : e.url),
      i = {
        enabled: (n = a, (!(r = t) || !r.method || "GET" === r.method) && (!r || -1 != ["must-revalidate", "immutable"].indexOf(r.control)) && !!n.match("^https?://"))
      };

    function s(e, t) {
      return fetch(e, t).then(function(n) {
        var r;
        return !i.enabled || i.revalidated ? n : 304 === n.status ? (i.revalidated = !0, o.updateRequestMetaData(i.metaData).then(function() {
          U("'" + i.metaData.url + "' successfully revalidated and served from the indexedDB cache")
        }).catch(function(e) {
          U("'" + i.metaData.url + "' successfully revalidated but not stored in the indexedDB cache due to the error: " + e)
        }), $(i.response, t.onProgress, t.enableStreamingDownload)) : 200 == n.status ? (i.response = n, i.metaData.updatedAt = i.metaData.accessedAt, i.revalidated = !0, r = n.clone(), $(n, t.onProgress, t.enableStreamingDownload).then(function(t) {
          return i.metaData.size = t.parsedBody.length, Promise.all([o.storeRequest(e, r), o.updateRequestMetaData(i.metaData)]).then(function() {
            U("'" + a + "' successfully downloaded and stored in the indexedDB cache")
          }).catch(function(e) {
            U("'" + a + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + e)
          }), t
        })) : (U("'" + a + "' request failed with status: " + n.status + " " + n.statusText), $(n, t.onProgress, t.enableStreamingDownload))
      })
    }
    return t && (i.control = t.control, i.companyName = t.companyName, i.productName = t.productName, i.productVersion = t.productVersion), i.revalidated = !1, i.metaData = {
      url: a,
      accessedAt: Date.now(),
      version: i.productVersion
    }, i.response = null, i.enabled ? o.loadRequest(a).then(function(n) {
      var r, c, u;
      return n ? (r = n.response, c = n.metaData, i.response = r, i.metaData.size = c.size, i.metaData.updatedAt = c.updatedAt, "immutable" == i.control ? (i.revalidated = !0, o.updateRequestMetaData(c).then(function() {
        U("'" + i.metaData.url + "' served from the indexedDB cache without revalidation")
      }), $(r, t.onProgress, t.enableStreamingDownload)) : (n = a, (u = window.location.href.match(/^[a-z]+:\/\/[^\/]+/)) && !n.lastIndexOf(u[0], 0) || !r.headers.get("Last-Modified") && !r.headers.get("ETag") ? (n = (t = t || {}).headers || {}, t.headers = n, r.headers.get("Last-Modified") ? (n["If-Modified-Since"] = r.headers.get("Last-Modified"), n["Cache-Control"] = "no-cache") : r.headers.get("ETag") && (n["If-None-Match"] = r.headers.get("ETag"), n["Cache-Control"] = "no-cache"), s(e, t)) : fetch(a, {
        method: "HEAD"
      }).then(function(n) {
        return i.revalidated = ["Last-Modified", "ETag"].every(function(e) {
          return !r.headers.get(e) || r.headers.get(e) == n.headers.get(e)
        }), i.revalidated ? (o.updateRequestMetaData(c).then(function() {
          U("'" + i.metaData.url + "' successfully revalidated and served from the indexedDB cache")
        }), $(i.response, t.onProgress, t.enableStreamingDownload)) : s(e, t)
      }))) : s(e, t)
    }).catch(function(n) {
      return U("Failed to load '" + i.metaData.url + "' from indexedDB cache due to the error: " + n), w(e, t)
    }) : w(e, t)
  }), new Promise(function(e, t) {
    var o, a, i, c, u, d;
    s.SystemInfo.hasWebGL ? 1 == s.SystemInfo.hasWebGL ? (o = 'Your browser does not support graphics API "WebGL 2" which is required for this content.', "Safari" == s.SystemInfo.browser && 15 > parseInt(s.SystemInfo.browserVersion) && (s.SystemInfo.mobile || 1 < navigator.maxTouchPoints ? o += "\nUpgrade to iOS 15 or later." : o += "\nUpgrade to Safari 15 or later."), t(o)) : s.SystemInfo.hasWasm ? (s.startupErrorHandler = t, n(0), s.postRun.push(function() {
      n(1), delete s.startupErrorHandler, e(S)
    }), new Promise(function(e, t) {
      var n = document.createElement("script");
      n.src = s.frameworkUrl, n.onload = function() {
        if ("undefined" == typeof unityFramework || !unityFramework) {
          var t, o = [
            ["br", "br"],
            ["gz", "gzip"],
          ];
          for (t in o) {
            var a, i = o[t];
            if (s.frameworkUrl.endsWith("." + i[0])) return a = "Unable to parse " + s.frameworkUrl + "!", "file:" == location.protocol ? void r(a + " Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.", "error") : (a += ' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: ' + i[1] + '" present. Check browser Console and Devtools Network tab to debug.', "br" == i[0] && "http:" == location.protocol && (i = -1 != ["localhost", "127.0.0.1"].indexOf(location.hostname) ? "" : "Migrate your server to use HTTPS.", a = /Firefox/.test(navigator.userAgent) ? "Unable to parse " + s.frameworkUrl + '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. ' + i + ' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.' : "Unable to parse " + s.frameworkUrl + '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.'), void r(a, "error"))
          }
          r("Unable to parse " + s.frameworkUrl + "! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)", "error")
        }
        var c = unityFramework;
        unityFramework = null, n.onload = null, e(c)
      }, n.onerror = function(e) {
        r("Unable to load file " + s.frameworkUrl + "! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)", "error")
      }, document.body.appendChild(n), s.deinitializers.push(function() {
        document.body.removeChild(n)
      })
    }).then(function(e) {
      e(s)
    }), D(a = "dataUrl"), i = s.cacheControl(s[a]), c = s.companyName && s.productName ? s.cachedFetch : s.fetchWithProgress, u = s[a], u = /file:\/\//.exec(u) ? "same-origin" : void 0, d = c(s[a], {
      method: "GET",
      companyName: s.companyName,
      productName: s.productName,
      productVersion: s.productVersion,
      control: i,
      mode: u,
      onProgress: function(e) {
        D(a, e)
      }
    }).then(function(e) {
      return e.parsedBody
    }).catch(function(e) {
      var t = "Failed to download file " + s[a];
      "file:" == location.protocol ? r(t + ". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.", "error") : console.error(t)
    }), s.preRun.push(function() {
      s.addRunDependency("dataUrl"), d.then(function(e) {
        var t = new DataView(e.buffer, e.byteOffset, e.byteLength),
          n = 0,
          r = "UnityWebData1.0\0";
        if (!String.fromCharCode.apply(null, e.subarray(n, n + r.length)) == r) throw "unknown data format";
        var o = t.getUint32(n += r.length, !0);
        for (n += 4; n < o;) {
          var a = t.getUint32(n, !0),
            i = (n += 4, t.getUint32(n, !0)),
            c = (n += 4, t.getUint32(n, !0)),
            u = (n += 4, String.fromCharCode.apply(null, e.subarray(n, n + c)));
          n += c;
          for (var d = 0, l = u.indexOf("/", d) + 1; 0 < l; d = l, l = u.indexOf("/", d) + 1) s.FS_createPath(u.substring(0, d), u.substring(d, l - 1), !0, !0);
          s.FS_createDataFile(u, null, e.subarray(a, a + i), !0, !0, !0)
        }
        s.removeRunDependency("dataUrl")
      })
    })) : t("Your browser does not support WebAssembly.") : t("Your browser does not support WebGL.")
  })
}