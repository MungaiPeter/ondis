/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */
/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 6));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document, navigator, WEBFLOW_ENV_TEST */

      /* eslint-disable no-var */

      /**
       * Webflow: Core site library
       */

      var Webflow = {};
      var modules = {};
      var primary = [];
      var secondary = window.Webflow || [];
      var $ = window.jQuery;
      var $win = $(window);
      var $doc = $(document);
      var isFunction = $.isFunction;

      var _ = (Webflow._ = __webpack_require__(10));

      var tram = (Webflow.tram = __webpack_require__(5) && $.tram);
      var domready = false;
      var destroyed = false;
      tram.config.hideBackface = false;
      tram.config.keepInherited = true;
      /**
       * Webflow.define - Define a named module
       * @param  {string} name
       * @param  {function} factory
       * @param  {object} options
       * @return {object}
       */

      Webflow.define = function (name, factory, options) {
        if (modules[name]) {
          unbindModule(modules[name]);
        }

        var instance = (modules[name] = factory($, _, options) || {});
        bindModule(instance);
        return instance;
      };
      /**
       * Webflow.require - Require a named module
       * @param  {string} name
       * @return {object}
       */

      Webflow.require = function (name) {
        return modules[name];
      };

      function bindModule(module) {
        // If running in Webflow app, subscribe to design/preview events
        if (Webflow.env()) {
          isFunction(module.design) && $win.on("__wf_design", module.design);
          isFunction(module.preview) && $win.on("__wf_preview", module.preview);
        } // Subscribe to front-end destroy event

        isFunction(module.destroy) && $win.on("__wf_destroy", module.destroy); // Look for ready method on module

        if (module.ready && isFunction(module.ready)) {
          addReady(module);
        }
      }

      function addReady(module) {
        // If domready has already happened, run ready method
        if (domready) {
          module.ready();
          return;
        } // Otherwise add ready method to the primary queue (only once)

        if (_.contains(primary, module.ready)) {
          return;
        }

        primary.push(module.ready);
      }

      function unbindModule(module) {
        // Unsubscribe module from window events
        isFunction(module.design) && $win.off("__wf_design", module.design);
        isFunction(module.preview) && $win.off("__wf_preview", module.preview);
        isFunction(module.destroy) && $win.off("__wf_destroy", module.destroy); // Remove ready method from primary queue

        if (module.ready && isFunction(module.ready)) {
          removeReady(module);
        }
      }

      function removeReady(module) {
        primary = _.filter(primary, function (readyFn) {
          return readyFn !== module.ready;
        });
      }
      /**
       * Webflow.push - Add a ready handler into secondary queue
       * @param {function} ready  Callback to invoke on domready
       */

      Webflow.push = function (ready) {
        // If domready has already happened, invoke handler
        if (domready) {
          isFunction(ready) && ready();
          return;
        } // Otherwise push into secondary queue

        secondary.push(ready);
      };
      /**
       * Webflow.env - Get the state of the Webflow app
       * @param {string} mode [optional]
       * @return {boolean}
       */

      Webflow.env = function (mode) {
        var designFlag = window.__wf_design;
        var inApp = typeof designFlag !== "undefined";

        if (!mode) {
          return inApp;
        }

        if (mode === "design") {
          return inApp && designFlag;
        }

        if (mode === "preview") {
          return inApp && !designFlag;
        }

        if (mode === "slug") {
          return inApp && window.__wf_slug;
        }

        if (mode === "editor") {
          return window.WebflowEditor;
        }

        if (mode === "test") {
          return false || window.__wf_test;
        }

        if (mode === "frame") {
          return window !== window.top;
        }
      }; // Feature detects + browser sniffs  à² _à²

      var userAgent = navigator.userAgent.toLowerCase();
      var touch = (Webflow.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch));
      var chrome = (Webflow.env.chrome =
        /chrome/.test(userAgent) &&
        /Google/.test(navigator.vendor) &&
        parseInt(userAgent.match(/chrome\/(\d+)\./)[1], 10));
      var ios = (Webflow.env.ios = /(ipod|iphone|ipad)/.test(userAgent));
      Webflow.env.safari = /safari/.test(userAgent) && !chrome && !ios; // Maintain current touch target to prevent late clicks on touch devices

      var touchTarget; // Listen for both events to support touch/mouse hybrid devices

      touch &&
        $doc.on("touchstart mousedown", function (evt) {
          touchTarget = evt.target;
        });
      /**
       * Webflow.validClick - validate click target against current touch target
       * @param  {HTMLElement} clickTarget  Element being clicked
       * @return {Boolean}  True if click target is valid (always true on non-touch)
       */

      Webflow.validClick = touch
        ? function (clickTarget) {
            return (
              clickTarget === touchTarget ||
              $.contains(clickTarget, touchTarget)
            );
          }
        : function () {
            return true;
          };
      /**
       * Webflow.resize, Webflow.scroll - throttled event proxies
       */

      var resizeEvents =
        "resize.webflow orientationchange.webflow load.webflow";
      var scrollEvents = "scroll.webflow " + resizeEvents;
      Webflow.resize = eventProxy($win, resizeEvents);
      Webflow.scroll = eventProxy($win, scrollEvents);
      Webflow.redraw = eventProxy(); // Create a proxy instance for throttled events

      function eventProxy(target, types) {
        // Set up throttled method (using custom frame-based _.throttle)
        var handlers = [];
        var proxy = {};
        proxy.up = _.throttle(function (evt) {
          _.each(handlers, function (h) {
            h(evt);
          });
        }); // Bind events to target

        if (target && types) {
          target.on(types, proxy.up);
        }
        /**
         * Add an event handler
         * @param  {function} handler
         */

        proxy.on = function (handler) {
          if (typeof handler !== "function") {
            return;
          }

          if (_.contains(handlers, handler)) {
            return;
          }

          handlers.push(handler);
        };
        /**
         * Remove an event handler
         * @param  {function} handler
         */

        proxy.off = function (handler) {
          // If no arguments supplied, clear all handlers
          if (!arguments.length) {
            handlers = [];
            return;
          } // Otherwise, remove handler from the list

          handlers = _.filter(handlers, function (h) {
            return h !== handler;
          });
        };

        return proxy;
      } // Webflow.location - Wrap window.location in api

      Webflow.location = function (url) {
        window.location = url;
      };

      if (Webflow.env()) {
        // Ignore redirects inside a Webflow design/edit environment
        Webflow.location = function () {};
      } // Webflow.ready - Call primary and secondary handlers

      Webflow.ready = function () {
        domready = true; // Restore modules after destroy

        if (destroyed) {
          restoreModules(); // Otherwise run primary ready methods
        } else {
          _.each(primary, callReady);
        } // Run secondary ready methods

        _.each(secondary, callReady); // Trigger resize

        Webflow.resize.up();
      };

      function callReady(readyFn) {
        isFunction(readyFn) && readyFn();
      }

      function restoreModules() {
        destroyed = false;

        _.each(modules, bindModule);
      }
      /**
       * Webflow.load - Add a window load handler that will run even if load event has already happened
       * @param  {function} handler
       */

      var deferLoad;

      Webflow.load = function (handler) {
        deferLoad.then(handler);
      };

      function bindLoad() {
        // Reject any previous deferred (to support destroy)
        if (deferLoad) {
          deferLoad.reject();
          $win.off("load", deferLoad.resolve);
        } // Create deferred and bind window load event

        deferLoad = new $.Deferred();
        $win.on("load", deferLoad.resolve);
      } // Webflow.destroy - Trigger a destroy event for all modules

      Webflow.destroy = function (options) {
        options = options || {};
        destroyed = true;
        $win.triggerHandler("__wf_destroy"); // Allow domready reset for tests

        if (options.domready != null) {
          domready = options.domready;
        } // Unbind modules

        _.each(modules, unbindModule); // Clear any proxy event handlers

        Webflow.resize.off();
        Webflow.scroll.off();
        Webflow.redraw.off(); // Clear any queued ready methods

        primary = [];
        secondary = []; // If load event has not yet fired, replace the deferred

        if (deferLoad.state() === "pending") {
          bindLoad();
        }
      }; // Listen for domready

      $(Webflow.ready); // Listen for window.onload and resolve deferred

      bindLoad(); // Export commonjs module

      module.exports = window.Webflow = Webflow;

      /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */
      // eslint-disable-next-line strict

      var IXEvents = __webpack_require__(3);

      function dispatchCustomEvent(element, eventName) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, null);
        element.dispatchEvent(event);
      }
      /**
       * Webflow: IX Event triggers for other modules
       */

      var $ = window.jQuery;
      var api = {};
      var namespace = ".w-ix";
      var eventTriggers = {
        reset: function reset(i, el) {
          IXEvents.triggers.reset(i, el);
        },
        intro: function intro(i, el) {
          IXEvents.triggers.intro(i, el);
          dispatchCustomEvent(el, "COMPONENT_ACTIVE");
        },
        outro: function outro(i, el) {
          IXEvents.triggers.outro(i, el);
          dispatchCustomEvent(el, "COMPONENT_INACTIVE");
        },
      };
      api.triggers = {};
      api.types = {
        INTRO: "w-ix-intro" + namespace,
        OUTRO: "w-ix-outro" + namespace,
      };
      $.extend(api.triggers, eventTriggers);
      module.exports = api;

      /***/
    },
    /* 2 */
    /***/ function (module, exports) {
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule
          ? obj
          : {
              default: obj,
            };
      }

      module.exports = _interopRequireDefault;

      /***/
    },
    /* 3 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window */

      /* eslint-disable no-var */

      /**
       * Webflow: IX Event triggers for other modules
       */
      // eslint-disable-next-line strict

      var $ = window.jQuery;
      var api = {};
      var eventQueue = [];
      var namespace = ".w-ix";
      var eventTriggers = {
        reset: function reset(i, el) {
          el.__wf_intro = null;
        },
        intro: function intro(i, el) {
          if (el.__wf_intro) {
            return;
          }

          el.__wf_intro = true;
          $(el).triggerHandler(api.types.INTRO);
        },
        outro: function outro(i, el) {
          if (!el.__wf_intro) {
            return;
          }

          el.__wf_intro = null;
          $(el).triggerHandler(api.types.OUTRO);
        },
      };
      api.triggers = {};
      api.types = {
        INTRO: "w-ix-intro" + namespace,
        OUTRO: "w-ix-outro" + namespace,
      }; // Trigger any events in queue + restore trigger methods

      api.init = function () {
        var count = eventQueue.length;

        for (var i = 0; i < count; i++) {
          var memo = eventQueue[i];
          memo[0](0, memo[1]);
        }

        eventQueue = [];
        $.extend(api.triggers, eventTriggers);
      }; // Replace all triggers with async wrapper to queue events until init

      api.async = function () {
        for (var key in eventTriggers) {
          var func = eventTriggers[key];

          if (!eventTriggers.hasOwnProperty(key)) {
            continue;
          } // Replace trigger method with async wrapper

          api.triggers[key] = function (i, el) {
            eventQueue.push([func, el]);
          };
        }
      }; // Default triggers to async queue

      api.async();
      module.exports = api;

      /***/
    },
    /* 4 */
    /***/ function (module, exports) {
      function _typeof2(obj) {
        if (
          typeof Symbol === "function" &&
          typeof Symbol.iterator === "symbol"
        ) {
          _typeof2 = function _typeof2(obj) {
            return typeof obj;
          };
        } else {
          _typeof2 = function _typeof2(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };
        }
        return _typeof2(obj);
      }

      function _typeof(obj) {
        if (
          typeof Symbol === "function" &&
          _typeof2(Symbol.iterator) === "symbol"
        ) {
          module.exports = _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          module.exports = _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }

      module.exports = _typeof;

      /***/
    },
    /* 5 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* eslint-disable eslint-comments/no-unlimited-disable */

      /* eslint-disable */

      /*!
       * tram.js v0.8.2-global
       * Cross-browser CSS3 transitions in JavaScript
       * https://github.com/bkwld/tram
       * MIT License
       */

      /* prettier-ignore */

      var _interopRequireDefault = __webpack_require__(2);

      var _typeof2 = _interopRequireDefault(__webpack_require__(4));

      window.tram = (function (a) {
        function b(a, b) {
          var c = new M.Bare();
          return c.init(a, b);
        }

        function c(a) {
          return a.replace(/[A-Z]/g, function (a) {
            return "-" + a.toLowerCase();
          });
        }

        function d(a) {
          var b = parseInt(a.slice(1), 16),
            c = (b >> 16) & 255,
            d = (b >> 8) & 255,
            e = 255 & b;
          return [c, d, e];
        }

        function e(a, b, c) {
          return (
            "#" + ((1 << 24) | (a << 16) | (b << 8) | c).toString(16).slice(1)
          );
        }

        function f() {}

        function g(a, b) {
          j(
            "Type warning: Expected: [" +
              a +
              "] Got: [" +
              (0, _typeof2["default"])(b) +
              "] " +
              b
          );
        }

        function h(a, b, c) {
          j("Units do not match [" + a + "]: " + b + ", " + c);
        }

        function i(a, b, c) {
          if ((void 0 !== b && (c = b), void 0 === a)) return c;
          var d = c;
          return (
            $.test(a) || !_.test(a)
              ? (d = parseInt(a, 10))
              : _.test(a) && (d = 1e3 * parseFloat(a)),
            0 > d && (d = 0),
            d === d ? d : c
          );
        }

        function j(a) {
          U.debug && window && window.console.warn(a);
        }

        function k(a) {
          for (var b = -1, c = a ? a.length : 0, d = []; ++b < c; ) {
            var e = a[b];
            e && d.push(e);
          }

          return d;
        }

        var l = (function (a, b, c) {
            function d(a) {
              return "object" == (0, _typeof2["default"])(a);
            }

            function e(a) {
              return "function" == typeof a;
            }

            function f() {}

            function g(h, i) {
              function j() {
                var a = new k();
                return e(a.init) && a.init.apply(a, arguments), a;
              }

              function k() {}

              i === c && ((i = h), (h = Object)), (j.Bare = k);
              var l,
                m = (f[a] = h[a]),
                n = (k[a] = j[a] = new f());
              return (
                (n.constructor = j),
                (j.mixin = function (b) {
                  return (k[a] = j[a] = g(j, b)[a]), j;
                }),
                (j.open = function (a) {
                  if (
                    ((l = {}),
                    e(a) ? (l = a.call(j, n, m, j, h)) : d(a) && (l = a),
                    d(l))
                  )
                    for (var c in l) {
                      b.call(l, c) && (n[c] = l[c]);
                    }
                  return e(n.init) || (n.init = h), j;
                }),
                j.open(i)
              );
            }

            return g;
          })("prototype", {}.hasOwnProperty),
          m = {
            ease: [
              "ease",
              function (a, b, c, d) {
                var e = (a /= d) * a,
                  f = e * a;
                return (
                  b +
                  c *
                    (-2.75 * f * e + 11 * e * e + -15.5 * f + 8 * e + 0.25 * a)
                );
              },
            ],
            "ease-in": [
              "ease-in",
              function (a, b, c, d) {
                var e = (a /= d) * a,
                  f = e * a;
                return b + c * (-1 * f * e + 3 * e * e + -3 * f + 2 * e);
              },
            ],
            "ease-out": [
              "ease-out",
              function (a, b, c, d) {
                var e = (a /= d) * a,
                  f = e * a;
                return (
                  b +
                  c *
                    (0.3 * f * e + -1.6 * e * e + 2.2 * f + -1.8 * e + 1.9 * a)
                );
              },
            ],
            "ease-in-out": [
              "ease-in-out",
              function (a, b, c, d) {
                var e = (a /= d) * a,
                  f = e * a;
                return b + c * (2 * f * e + -5 * e * e + 2 * f + 2 * e);
              },
            ],
            linear: [
              "linear",
              function (a, b, c, d) {
                return (c * a) / d + b;
              },
            ],
            "ease-in-quad": [
              "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
              function (a, b, c, d) {
                return c * (a /= d) * a + b;
              },
            ],
            "ease-out-quad": [
              "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
              function (a, b, c, d) {
                return -c * (a /= d) * (a - 2) + b;
              },
            ],
            "ease-in-out-quad": [
              "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
              function (a, b, c, d) {
                return (a /= d / 2) < 1
                  ? (c / 2) * a * a + b
                  : (-c / 2) * (--a * (a - 2) - 1) + b;
              },
            ],
            "ease-in-cubic": [
              "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
              function (a, b, c, d) {
                return c * (a /= d) * a * a + b;
              },
            ],
            "ease-out-cubic": [
              "cubic-bezier(0.215, 0.610, 0.355, 1)",
              function (a, b, c, d) {
                return c * ((a = a / d - 1) * a * a + 1) + b;
              },
            ],
            "ease-in-out-cubic": [
              "cubic-bezier(0.645, 0.045, 0.355, 1)",
              function (a, b, c, d) {
                return (a /= d / 2) < 1
                  ? (c / 2) * a * a * a + b
                  : (c / 2) * ((a -= 2) * a * a + 2) + b;
              },
            ],
            "ease-in-quart": [
              "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
              function (a, b, c, d) {
                return c * (a /= d) * a * a * a + b;
              },
            ],
            "ease-out-quart": [
              "cubic-bezier(0.165, 0.840, 0.440, 1)",
              function (a, b, c, d) {
                return -c * ((a = a / d - 1) * a * a * a - 1) + b;
              },
            ],
            "ease-in-out-quart": [
              "cubic-bezier(0.770, 0, 0.175, 1)",
              function (a, b, c, d) {
                return (a /= d / 2) < 1
                  ? (c / 2) * a * a * a * a + b
                  : (-c / 2) * ((a -= 2) * a * a * a - 2) + b;
              },
            ],
            "ease-in-quint": [
              "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
              function (a, b, c, d) {
                return c * (a /= d) * a * a * a * a + b;
              },
            ],
            "ease-out-quint": [
              "cubic-bezier(0.230, 1, 0.320, 1)",
              function (a, b, c, d) {
                return c * ((a = a / d - 1) * a * a * a * a + 1) + b;
              },
            ],
            "ease-in-out-quint": [
              "cubic-bezier(0.860, 0, 0.070, 1)",
              function (a, b, c, d) {
                return (a /= d / 2) < 1
                  ? (c / 2) * a * a * a * a * a + b
                  : (c / 2) * ((a -= 2) * a * a * a * a + 2) + b;
              },
            ],
            "ease-in-sine": [
              "cubic-bezier(0.470, 0, 0.745, 0.715)",
              function (a, b, c, d) {
                return -c * Math.cos((a / d) * (Math.PI / 2)) + c + b;
              },
            ],
            "ease-out-sine": [
              "cubic-bezier(0.390, 0.575, 0.565, 1)",
              function (a, b, c, d) {
                return c * Math.sin((a / d) * (Math.PI / 2)) + b;
              },
            ],
            "ease-in-out-sine": [
              "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
              function (a, b, c, d) {
                return (-c / 2) * (Math.cos((Math.PI * a) / d) - 1) + b;
              },
            ],
            "ease-in-expo": [
              "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
              function (a, b, c, d) {
                return 0 === a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b;
              },
            ],
            "ease-out-expo": [
              "cubic-bezier(0.190, 1, 0.220, 1)",
              function (a, b, c, d) {
                return a === d
                  ? b + c
                  : c * (-Math.pow(2, (-10 * a) / d) + 1) + b;
              },
            ],
            "ease-in-out-expo": [
              "cubic-bezier(1, 0, 0, 1)",
              function (a, b, c, d) {
                return 0 === a
                  ? b
                  : a === d
                  ? b + c
                  : (a /= d / 2) < 1
                  ? (c / 2) * Math.pow(2, 10 * (a - 1)) + b
                  : (c / 2) * (-Math.pow(2, -10 * --a) + 2) + b;
              },
            ],
            "ease-in-circ": [
              "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
              function (a, b, c, d) {
                return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b;
              },
            ],
            "ease-out-circ": [
              "cubic-bezier(0.075, 0.820, 0.165, 1)",
              function (a, b, c, d) {
                return c * Math.sqrt(1 - (a = a / d - 1) * a) + b;
              },
            ],
            "ease-in-out-circ": [
              "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
              function (a, b, c, d) {
                return (a /= d / 2) < 1
                  ? (-c / 2) * (Math.sqrt(1 - a * a) - 1) + b
                  : (c / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + b;
              },
            ],
            "ease-in-back": [
              "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
              function (a, b, c, d, e) {
                return (
                  void 0 === e && (e = 1.70158),
                  c * (a /= d) * a * ((e + 1) * a - e) + b
                );
              },
            ],
            "ease-out-back": [
              "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
              function (a, b, c, d, e) {
                return (
                  void 0 === e && (e = 1.70158),
                  c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
                );
              },
            ],
            "ease-in-out-back": [
              "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
              function (a, b, c, d, e) {
                return (
                  void 0 === e && (e = 1.70158),
                  (a /= d / 2) < 1
                    ? (c / 2) * a * a * (((e *= 1.525) + 1) * a - e) + b
                    : (c / 2) *
                        ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) +
                      b
                );
              },
            ],
          },
          n = {
            "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
            "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
          },
          o = document,
          p = window,
          q = "bkwld-tram",
          r = /[\-\.0-9]/g,
          s = /[A-Z]/,
          t = "number",
          u = /^(rgb|#)/,
          v = /(em|cm|mm|in|pt|pc|px)$/,
          w = /(em|cm|mm|in|pt|pc|px|%)$/,
          x = /(deg|rad|turn)$/,
          y = "unitless",
          z = /(all|none) 0s ease 0s/,
          A = /^(width|height)$/,
          B = " ",
          C = o.createElement("a"),
          D = ["Webkit", "Moz", "O", "ms"],
          E = ["-webkit-", "-moz-", "-o-", "-ms-"],
          F = function F(a) {
            if (a in C.style)
              return {
                dom: a,
                css: a,
              };
            var b,
              c,
              d = "",
              e = a.split("-");

            for (b = 0; b < e.length; b++) {
              d += e[b].charAt(0).toUpperCase() + e[b].slice(1);
            }

            for (b = 0; b < D.length; b++) {
              if (((c = D[b] + d), c in C.style))
                return {
                  dom: c,
                  css: E[b] + a,
                };
            }
          },
          G = (b.support = {
            bind: Function.prototype.bind,
            transform: F("transform"),
            transition: F("transition"),
            backface: F("backface-visibility"),
            timing: F("transition-timing-function"),
          });

        if (G.transition) {
          var H = G.timing.dom;
          if (((C.style[H] = m["ease-in-back"][0]), !C.style[H]))
            for (var I in n) {
              m[I][0] = n[I];
            }
        }

        var J = (b.frame = (function () {
            var a =
              p.requestAnimationFrame ||
              p.webkitRequestAnimationFrame ||
              p.mozRequestAnimationFrame ||
              p.oRequestAnimationFrame ||
              p.msRequestAnimationFrame;
            return a && G.bind
              ? a.bind(p)
              : function (a) {
                  p.setTimeout(a, 16);
                };
          })()),
          K = (b.now = (function () {
            var a = p.performance,
              b = a && (a.now || a.webkitNow || a.msNow || a.mozNow);
            return b && G.bind
              ? b.bind(a)
              : Date.now ||
                  function () {
                    return +new Date();
                  };
          })()),
          L = l(function (b) {
            function d(a, b) {
              var c = k(("" + a).split(B)),
                d = c[0];
              b = b || {};
              var e = Y[d];
              if (!e) return j("Unsupported property: " + d);

              if (!b.weak || !this.props[d]) {
                var f = e[0],
                  g = this.props[d];
                return (
                  g || (g = this.props[d] = new f.Bare()),
                  g.init(this.$el, c, e, b),
                  g
                );
              }
            }

            function e(a, b, c) {
              if (a) {
                var e = (0, _typeof2["default"])(a);
                if (
                  (b ||
                    (this.timer && this.timer.destroy(),
                    (this.queue = []),
                    (this.active = !1)),
                  "number" == e && b)
                )
                  return (
                    (this.timer = new S({
                      duration: a,
                      context: this,
                      complete: h,
                    })),
                    void (this.active = !0)
                  );

                if ("string" == e && b) {
                  switch (a) {
                    case "hide":
                      o.call(this);
                      break;

                    case "stop":
                      l.call(this);
                      break;

                    case "redraw":
                      p.call(this);
                      break;

                    default:
                      d.call(this, a, c && c[1]);
                  }

                  return h.call(this);
                }

                if ("function" == e) return void a.call(this, this);

                if ("object" == e) {
                  var f = 0;
                  u.call(
                    this,
                    a,
                    function (a, b) {
                      a.span > f && (f = a.span), a.stop(), a.animate(b);
                    },
                    function (a) {
                      "wait" in a && (f = i(a.wait, 0));
                    }
                  ),
                    t.call(this),
                    f > 0 &&
                      ((this.timer = new S({
                        duration: f,
                        context: this,
                      })),
                      (this.active = !0),
                      b && (this.timer.complete = h));
                  var g = this,
                    j = !1,
                    k = {};
                  J(function () {
                    u.call(g, a, function (a) {
                      a.active && ((j = !0), (k[a.name] = a.nextStyle));
                    }),
                      j && g.$el.css(k);
                  });
                }
              }
            }

            function f(a) {
              (a = i(a, 0)),
                this.active
                  ? this.queue.push({
                      options: a,
                    })
                  : ((this.timer = new S({
                      duration: a,
                      context: this,
                      complete: h,
                    })),
                    (this.active = !0));
            }

            function g(a) {
              return this.active
                ? (this.queue.push({
                    options: a,
                    args: arguments,
                  }),
                  void (this.timer.complete = h))
                : j(
                    "No active transition timer. Use start() or wait() before then()."
                  );
            }

            function h() {
              if (
                (this.timer && this.timer.destroy(),
                (this.active = !1),
                this.queue.length)
              ) {
                var a = this.queue.shift();
                e.call(this, a.options, !0, a.args);
              }
            }

            function l(a) {
              this.timer && this.timer.destroy(),
                (this.queue = []),
                (this.active = !1);
              var b;
              "string" == typeof a
                ? ((b = {}), (b[a] = 1))
                : (b =
                    "object" == (0, _typeof2["default"])(a) && null != a
                      ? a
                      : this.props),
                u.call(this, b, v),
                t.call(this);
            }

            function m(a) {
              l.call(this, a), u.call(this, a, w, x);
            }

            function n(a) {
              "string" != typeof a && (a = "block"),
                (this.el.style.display = a);
            }

            function o() {
              l.call(this), (this.el.style.display = "none");
            }

            function p() {
              this.el.offsetHeight;
            }

            function r() {
              l.call(this),
                a.removeData(this.el, q),
                (this.$el = this.el = null);
            }

            function t() {
              var a,
                b,
                c = [];
              this.upstream && c.push(this.upstream);

              for (a in this.props) {
                (b = this.props[a]), b.active && c.push(b.string);
              }

              (c = c.join(",")),
                this.style !== c &&
                  ((this.style = c), (this.el.style[G.transition.dom] = c));
            }

            function u(a, b, e) {
              var f,
                g,
                h,
                i,
                j = b !== v,
                k = {};

              for (f in a) {
                (h = a[f]),
                  f in Z
                    ? (k.transform || (k.transform = {}), (k.transform[f] = h))
                    : (s.test(f) && (f = c(f)),
                      f in Y ? (k[f] = h) : (i || (i = {}), (i[f] = h)));
              }

              for (f in k) {
                if (((h = k[f]), (g = this.props[f]), !g)) {
                  if (!j) continue;
                  g = d.call(this, f);
                }

                b.call(this, g, h);
              }

              e && i && e.call(this, i);
            }

            function v(a) {
              a.stop();
            }

            function w(a, b) {
              a.set(b);
            }

            function x(a) {
              this.$el.css(a);
            }

            function y(a, c) {
              b[a] = function () {
                return this.children
                  ? A.call(this, c, arguments)
                  : (this.el && c.apply(this, arguments), this);
              };
            }

            function A(a, b) {
              var c,
                d = this.children.length;

              for (c = 0; d > c; c++) {
                a.apply(this.children[c], b);
              }

              return this;
            }

            (b.init = function (b) {
              if (
                ((this.$el = a(b)),
                (this.el = this.$el[0]),
                (this.props = {}),
                (this.queue = []),
                (this.style = ""),
                (this.active = !1),
                U.keepInherited && !U.fallback)
              ) {
                var c = W(this.el, "transition");
                c && !z.test(c) && (this.upstream = c);
              }

              G.backface &&
                U.hideBackface &&
                V(this.el, G.backface.css, "hidden");
            }),
              y("add", d),
              y("start", e),
              y("wait", f),
              y("then", g),
              y("next", h),
              y("stop", l),
              y("set", m),
              y("show", n),
              y("hide", o),
              y("redraw", p),
              y("destroy", r);
          }),
          M = l(L, function (b) {
            function c(b, c) {
              var d = a.data(b, q) || a.data(b, q, new L.Bare());
              return d.el || d.init(b), c ? d.start(c) : d;
            }

            b.init = function (b, d) {
              var e = a(b);
              if (!e.length) return this;
              if (1 === e.length) return c(e[0], d);
              var f = [];
              return (
                e.each(function (a, b) {
                  f.push(c(b, d));
                }),
                (this.children = f),
                this
              );
            };
          }),
          N = l(function (a) {
            function b() {
              var a = this.get();
              this.update("auto");
              var b = this.get();
              return this.update(a), b;
            }

            function c(a, b, c) {
              return void 0 !== b && (c = b), a in m ? a : c;
            }

            function d(a) {
              var b = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(a);
              return (b ? e(b[1], b[2], b[3]) : a).replace(
                /#(\w)(\w)(\w)$/,
                "#$1$1$2$2$3$3"
              );
            }

            var f = {
              duration: 500,
              ease: "ease",
              delay: 0,
            };
            (a.init = function (a, b, d, e) {
              (this.$el = a), (this.el = a[0]);
              var g = b[0];
              d[2] && (g = d[2]),
                X[g] && (g = X[g]),
                (this.name = g),
                (this.type = d[1]),
                (this.duration = i(b[1], this.duration, f.duration)),
                (this.ease = c(b[2], this.ease, f.ease)),
                (this.delay = i(b[3], this.delay, f.delay)),
                (this.span = this.duration + this.delay),
                (this.active = !1),
                (this.nextStyle = null),
                (this.auto = A.test(this.name)),
                (this.unit = e.unit || this.unit || U.defaultUnit),
                (this.angle = e.angle || this.angle || U.defaultAngle),
                U.fallback || e.fallback
                  ? (this.animate = this.fallback)
                  : ((this.animate = this.transition),
                    (this.string =
                      this.name +
                      B +
                      this.duration +
                      "ms" +
                      ("ease" != this.ease ? B + m[this.ease][0] : "") +
                      (this.delay ? B + this.delay + "ms" : "")));
            }),
              (a.set = function (a) {
                (a = this.convert(a, this.type)), this.update(a), this.redraw();
              }),
              (a.transition = function (a) {
                (this.active = !0),
                  (a = this.convert(a, this.type)),
                  this.auto &&
                    ("auto" == this.el.style[this.name] &&
                      (this.update(this.get()), this.redraw()),
                    "auto" == a && (a = b.call(this))),
                  (this.nextStyle = a);
              }),
              (a.fallback = function (a) {
                var c =
                  this.el.style[this.name] ||
                  this.convert(this.get(), this.type);
                (a = this.convert(a, this.type)),
                  this.auto &&
                    ("auto" == c && (c = this.convert(this.get(), this.type)),
                    "auto" == a && (a = b.call(this))),
                  (this.tween = new R({
                    from: c,
                    to: a,
                    duration: this.duration,
                    delay: this.delay,
                    ease: this.ease,
                    update: this.update,
                    context: this,
                  }));
              }),
              (a.get = function () {
                return W(this.el, this.name);
              }),
              (a.update = function (a) {
                V(this.el, this.name, a);
              }),
              (a.stop = function () {
                (this.active || this.nextStyle) &&
                  ((this.active = !1),
                  (this.nextStyle = null),
                  V(this.el, this.name, this.get()));
                var a = this.tween;
                a && a.context && a.destroy();
              }),
              (a.convert = function (a, b) {
                if ("auto" == a && this.auto) return a;
                var c,
                  e = "number" == typeof a,
                  f = "string" == typeof a;

                switch (b) {
                  case t:
                    if (e) return a;
                    if (f && "" === a.replace(r, "")) return +a;
                    c = "number(unitless)";
                    break;

                  case u:
                    if (f) {
                      if ("" === a && this.original) return this.original;
                      if (b.test(a))
                        return "#" == a.charAt(0) && 7 == a.length ? a : d(a);
                    }

                    c = "hex or rgb string";
                    break;

                  case v:
                    if (e) return a + this.unit;
                    if (f && b.test(a)) return a;
                    c = "number(px) or string(unit)";
                    break;

                  case w:
                    if (e) return a + this.unit;
                    if (f && b.test(a)) return a;
                    c = "number(px) or string(unit or %)";
                    break;

                  case x:
                    if (e) return a + this.angle;
                    if (f && b.test(a)) return a;
                    c = "number(deg) or string(angle)";
                    break;

                  case y:
                    if (e) return a;
                    if (f && w.test(a)) return a;
                    c = "number(unitless) or string(unit or %)";
                }

                return g(c, a), a;
              }),
              (a.redraw = function () {
                this.el.offsetHeight;
              });
          }),
          O = l(N, function (a, b) {
            a.init = function () {
              b.init.apply(this, arguments),
                this.original || (this.original = this.convert(this.get(), u));
            };
          }),
          P = l(N, function (a, b) {
            (a.init = function () {
              b.init.apply(this, arguments), (this.animate = this.fallback);
            }),
              (a.get = function () {
                return this.$el[this.name]();
              }),
              (a.update = function (a) {
                this.$el[this.name](a);
              });
          }),
          Q = l(N, function (a, b) {
            function c(a, b) {
              var c, d, e, f, g;

              for (c in a) {
                (f = Z[c]),
                  (e = f[0]),
                  (d = f[1] || c),
                  (g = this.convert(a[c], e)),
                  b.call(this, d, g, e);
              }
            }

            (a.init = function () {
              b.init.apply(this, arguments),
                this.current ||
                  ((this.current = {}),
                  Z.perspective &&
                    U.perspective &&
                    ((this.current.perspective = U.perspective),
                    V(this.el, this.name, this.style(this.current)),
                    this.redraw()));
            }),
              (a.set = function (a) {
                c.call(this, a, function (a, b) {
                  this.current[a] = b;
                }),
                  V(this.el, this.name, this.style(this.current)),
                  this.redraw();
              }),
              (a.transition = function (a) {
                var b = this.values(a);
                this.tween = new T({
                  current: this.current,
                  values: b,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                });
                var c,
                  d = {};

                for (c in this.current) {
                  d[c] = c in b ? b[c] : this.current[c];
                }

                (this.active = !0), (this.nextStyle = this.style(d));
              }),
              (a.fallback = function (a) {
                var b = this.values(a);
                this.tween = new T({
                  current: this.current,
                  values: b,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                });
              }),
              (a.update = function () {
                V(this.el, this.name, this.style(this.current));
              }),
              (a.style = function (a) {
                var b,
                  c = "";

                for (b in a) {
                  c += b + "(" + a[b] + ") ";
                }

                return c;
              }),
              (a.values = function (a) {
                var b,
                  d = {};
                return (
                  c.call(this, a, function (a, c, e) {
                    (d[a] = c),
                      void 0 === this.current[a] &&
                        ((b = 0),
                        ~a.indexOf("scale") && (b = 1),
                        (this.current[a] = this.convert(b, e)));
                  }),
                  d
                );
              });
          }),
          R = l(function (b) {
            function c(a) {
              1 === n.push(a) && J(g);
            }

            function g() {
              var a,
                b,
                c,
                d = n.length;
              if (d)
                for (J(g), b = K(), a = d; a--; ) {
                  (c = n[a]), c && c.render(b);
                }
            }

            function i(b) {
              var c,
                d = a.inArray(b, n);
              d >= 0 &&
                ((c = n.slice(d + 1)),
                (n.length = d),
                c.length && (n = n.concat(c)));
            }

            function j(a) {
              return Math.round(a * o) / o;
            }

            function k(a, b, c) {
              return e(
                a[0] + c * (b[0] - a[0]),
                a[1] + c * (b[1] - a[1]),
                a[2] + c * (b[2] - a[2])
              );
            }

            var l = {
              ease: m.ease[1],
              from: 0,
              to: 1,
            };
            (b.init = function (a) {
              (this.duration = a.duration || 0), (this.delay = a.delay || 0);
              var b = a.ease || l.ease;
              m[b] && (b = m[b][1]),
                "function" != typeof b && (b = l.ease),
                (this.ease = b),
                (this.update = a.update || f),
                (this.complete = a.complete || f),
                (this.context = a.context || this),
                (this.name = a.name);
              var c = a.from,
                d = a.to;
              void 0 === c && (c = l.from),
                void 0 === d && (d = l.to),
                (this.unit = a.unit || ""),
                "number" == typeof c && "number" == typeof d
                  ? ((this.begin = c), (this.change = d - c))
                  : this.format(d, c),
                (this.value = this.begin + this.unit),
                (this.start = K()),
                a.autoplay !== !1 && this.play();
            }),
              (b.play = function () {
                this.active ||
                  (this.start || (this.start = K()),
                  (this.active = !0),
                  c(this));
              }),
              (b.stop = function () {
                this.active && ((this.active = !1), i(this));
              }),
              (b.render = function (a) {
                var b,
                  c = a - this.start;

                if (this.delay) {
                  if (c <= this.delay) return;
                  c -= this.delay;
                }

                if (c < this.duration) {
                  var d = this.ease(c, 0, 1, this.duration);
                  return (
                    (b = this.startRGB
                      ? k(this.startRGB, this.endRGB, d)
                      : j(this.begin + d * this.change)),
                    (this.value = b + this.unit),
                    void this.update.call(this.context, this.value)
                  );
                }

                (b = this.endHex || this.begin + this.change),
                  (this.value = b + this.unit),
                  this.update.call(this.context, this.value),
                  this.complete.call(this.context),
                  this.destroy();
              }),
              (b.format = function (a, b) {
                if (((b += ""), (a += ""), "#" == a.charAt(0)))
                  return (
                    (this.startRGB = d(b)),
                    (this.endRGB = d(a)),
                    (this.endHex = a),
                    (this.begin = 0),
                    void (this.change = 1)
                  );

                if (!this.unit) {
                  var c = b.replace(r, ""),
                    e = a.replace(r, "");
                  c !== e && h("tween", b, a), (this.unit = c);
                }

                (b = parseFloat(b)),
                  (a = parseFloat(a)),
                  (this.begin = this.value = b),
                  (this.change = a - b);
              }),
              (b.destroy = function () {
                this.stop(),
                  (this.context = null),
                  (this.ease = this.update = this.complete = f);
              });
            var n = [],
              o = 1e3;
          }),
          S = l(R, function (a) {
            (a.init = function (a) {
              (this.duration = a.duration || 0),
                (this.complete = a.complete || f),
                (this.context = a.context),
                this.play();
            }),
              (a.render = function (a) {
                var b = a - this.start;
                b < this.duration ||
                  (this.complete.call(this.context), this.destroy());
              });
          }),
          T = l(R, function (a, b) {
            (a.init = function (a) {
              (this.context = a.context),
                (this.update = a.update),
                (this.tweens = []),
                (this.current = a.current);
              var b, c;

              for (b in a.values) {
                (c = a.values[b]),
                  this.current[b] !== c &&
                    this.tweens.push(
                      new R({
                        name: b,
                        from: this.current[b],
                        to: c,
                        duration: a.duration,
                        delay: a.delay,
                        ease: a.ease,
                        autoplay: !1,
                      })
                    );
              }

              this.play();
            }),
              (a.render = function (a) {
                var b,
                  c,
                  d = this.tweens.length,
                  e = !1;

                for (b = d; b--; ) {
                  (c = this.tweens[b]),
                    c.context &&
                      (c.render(a), (this.current[c.name] = c.value), (e = !0));
                }

                return e
                  ? void (this.update && this.update.call(this.context))
                  : this.destroy();
              }),
              (a.destroy = function () {
                if ((b.destroy.call(this), this.tweens)) {
                  var a,
                    c = this.tweens.length;

                  for (a = c; a--; ) {
                    this.tweens[a].destroy();
                  }

                  (this.tweens = null), (this.current = null);
                }
              });
          }),
          U = (b.config = {
            debug: !1,
            defaultUnit: "px",
            defaultAngle: "deg",
            keepInherited: !1,
            hideBackface: !1,
            perspective: "",
            fallback: !G.transition,
            agentTests: [],
          });

        (b.fallback = function (a) {
          if (!G.transition) return (U.fallback = !0);
          U.agentTests.push("(" + a + ")");
          var b = new RegExp(U.agentTests.join("|"), "i");
          U.fallback = b.test(navigator.userAgent);
        }),
          b.fallback("6.0.[2-5] Safari"),
          (b.tween = function (a) {
            return new R(a);
          }),
          (b.delay = function (a, b, c) {
            return new S({
              complete: b,
              duration: a,
              context: c,
            });
          }),
          (a.fn.tram = function (a) {
            return b.call(null, this, a);
          });
        var V = a.style,
          W = a.css,
          X = {
            transform: G.transform && G.transform.css,
          },
          Y = {
            color: [O, u],
            background: [O, u, "background-color"],
            "outline-color": [O, u],
            "border-color": [O, u],
            "border-top-color": [O, u],
            "border-right-color": [O, u],
            "border-bottom-color": [O, u],
            "border-left-color": [O, u],
            "border-width": [N, v],
            "border-top-width": [N, v],
            "border-right-width": [N, v],
            "border-bottom-width": [N, v],
            "border-left-width": [N, v],
            "border-spacing": [N, v],
            "letter-spacing": [N, v],
            margin: [N, v],
            "margin-top": [N, v],
            "margin-right": [N, v],
            "margin-bottom": [N, v],
            "margin-left": [N, v],
            padding: [N, v],
            "padding-top": [N, v],
            "padding-right": [N, v],
            "padding-bottom": [N, v],
            "padding-left": [N, v],
            "outline-width": [N, v],
            opacity: [N, t],
            top: [N, w],
            right: [N, w],
            bottom: [N, w],
            left: [N, w],
            "font-size": [N, w],
            "text-indent": [N, w],
            "word-spacing": [N, w],
            width: [N, w],
            "min-width": [N, w],
            "max-width": [N, w],
            height: [N, w],
            "min-height": [N, w],
            "max-height": [N, w],
            "line-height": [N, y],
            "scroll-top": [P, t, "scrollTop"],
            "scroll-left": [P, t, "scrollLeft"],
          },
          Z = {};
        G.transform &&
          ((Y.transform = [Q]),
          (Z = {
            x: [w, "translateX"],
            y: [w, "translateY"],
            rotate: [x],
            rotateX: [x],
            rotateY: [x],
            scale: [t],
            scaleX: [t],
            scaleY: [t],
            skew: [x],
            skewX: [x],
            skewY: [x],
          })),
          G.transform &&
            G.backface &&
            ((Z.z = [w, "translateZ"]),
            (Z.rotateZ = [x]),
            (Z.scaleZ = [t]),
            (Z.perspective = [v]));
        var $ = /ms/,
          _ = /s|\./;
        return (a.tram = b);
      })(window.jQuery);

      /***/
    },
    /* 6 */
    /***/ function (module, exports, __webpack_require__) {
      __webpack_require__(7);
      __webpack_require__(8);
      __webpack_require__(9);
      __webpack_require__(11);
      __webpack_require__(12);
      __webpack_require__(13);
      __webpack_require__(14);
      __webpack_require__(3);
      __webpack_require__(15);
      __webpack_require__(16);
      __webpack_require__(17);
      __webpack_require__(18);
      __webpack_require__(19);
      __webpack_require__(20);
      __webpack_require__(25);
      __webpack_require__(26);
      __webpack_require__(27);
      __webpack_require__(28);
      module.exports = __webpack_require__(29);

      /***/
    },
    /* 7 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /*
 global
 window, document, Event
*/

      /*----------------------------------------
       * objectFitPolyfill 2.3.0
       *
       * Basic, no-frills version -
       * Defaults to object-fit: cover and object-position: 50% 50%
       *
       * Made by Constance Chen
       * Released under the MIT license
       *
       * https://github.com/constancecchen/object-fit-polyfill
       *--------------------------------------*/

      var _interopRequireDefault = __webpack_require__(2);

      var _typeof2 = _interopRequireDefault(__webpack_require__(4));

      (function () {
        // if the page is being rendered on the server, don't continue
        if (typeof window === "undefined") return; // Workaround for Edge 16+, which only implemented object-fit for <img> tags
        // TODO: Keep an eye on Edge to determine which version has full final support

        var edgeVersion = window.navigator.userAgent.match(/Edge\/(\d{2})\./);
        var edgePartialSupport = edgeVersion
          ? parseInt(edgeVersion[1], 10) >= 16
          : false; // If the browser does support object-fit, we don't need to continue

        var hasSupport =
          "objectFit" in document.documentElement.style !== false;

        if (hasSupport && !edgePartialSupport) {
          window.objectFitPolyfill = function () {
            return false;
          };

          return;
        }
        /**
         * Check the container's parent element to make sure it will
         * correctly handle and clip absolutely positioned children
         *
         * @param {node} $container - parent element
         */

        var checkParentContainer = function checkParentContainer($container) {
          var styles = window.getComputedStyle($container, null);
          var position = styles.getPropertyValue("position");
          var overflow = styles.getPropertyValue("overflow");
          var display = styles.getPropertyValue("display");

          if (!position || position === "static") {
            $container.style.position = "relative";
          }

          if (overflow !== "hidden") {
            $container.style.overflow = "hidden";
          } // Guesstimating that people want the parent to act like full width/height wrapper here.
          // Mostly attempts to target <picture> elements, which default to inline.

          if (!display || display === "inline") {
            $container.style.display = "block";
          }

          if ($container.clientHeight === 0) {
            $container.style.height = "100%";
          } // Add a CSS class hook, in case people need to override styles for any reason.

          if ($container.className.indexOf("object-fit-polyfill") === -1) {
            $container.className += " object-fit-polyfill";
          }
        };
        /**
         * Check for pre-set max-width/height, min-width/height,
         * positioning, or margins, which can mess up image calculations
         *
         * @param {node} $media - img/video element
         */

        var checkMediaProperties = function checkMediaProperties($media) {
          var styles = window.getComputedStyle($media, null);
          var constraints = {
            "max-width": "none",
            "max-height": "none",
            "min-width": "0px",
            "min-height": "0px",
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto",
            "margin-top": "0px",
            "margin-right": "0px",
            "margin-bottom": "0px",
            "margin-left": "0px",
          };

          for (var property in constraints) {
            var constraint = styles.getPropertyValue(property);

            if (constraint !== constraints[property]) {
              $media.style[property] = constraints[property];
            }
          }
        };
        /**
         * Calculate & set object-fit
         *
         * @param {node} $media - img/video/picture element
         */

        var objectFit = function objectFit($media) {
          // If necessary, make the parent container work with absolutely positioned elements
          var $container = $media.parentNode;
          checkParentContainer($container); // Check for any pre-set CSS which could mess up image calculations

          checkMediaProperties($media); // Mathematically figure out which side needs covering, and add CSS positioning & centering

          $media.style.position = "absolute";
          $media.style.height = "100%";
          $media.style.width = "auto";

          if ($media.clientWidth > $container.clientWidth) {
            $media.style.top = "0";
            $media.style.marginTop = "0";
            $media.style.left = "50%";
            $media.style.marginLeft = $media.clientWidth / -2 + "px";
          } else {
            $media.style.width = "100%";
            $media.style.height = "auto";
            $media.style.left = "0";
            $media.style.marginLeft = "0";
            $media.style.top = "50%";
            $media.style.marginTop = $media.clientHeight / -2 + "px";
          }
        };
        /**
         * Initialize plugin
         *
         * @param {node} media - Optional specific DOM node(s) to be polyfilled
         */

        var objectFitPolyfill = function objectFitPolyfill(media) {
          if (typeof media === "undefined" || media instanceof Event) {
            // If left blank, or a default event, all media on the page will be polyfilled.
            media = document.querySelectorAll("[data-object-fit]");
          } else if (media && media.nodeName) {
            // If it's a single node, wrap it in an array so it works.
            media = [media];
          } else if (
            (0, _typeof2["default"])(media) === "object" &&
            media.length &&
            media[0].nodeName
          ) {
            // If it's an array of DOM nodes (e.g. a jQuery selector), it's fine as-is.
            // eslint-disable-next-line no-self-assign
            media = media;
          } else {
            // Otherwise, if it's invalid or an incorrect type, return false to let people know.
            return false;
          }

          for (var i = 0; i < media.length; i++) {
            if (!media[i].nodeName) continue;
            var mediaType = media[i].nodeName.toLowerCase();

            if (mediaType === "img") {
              if (edgePartialSupport) continue; // Edge supports object-fit for images (but nothing else), so no need to polyfill

              if (media[i].complete) {
                objectFit(media[i]);
              } else {
                media[i].addEventListener("load", function () {
                  objectFit(this);
                });
              }
            } else if (mediaType === "video") {
              if (media[i].readyState > 0) {
                objectFit(media[i]);
              } else {
                media[i].addEventListener("loadedmetadata", function () {
                  objectFit(this);
                });
              }
            } else {
              objectFit(media[i]);
            }
          }

          return true;
        };

        if (document.readyState === "loading") {
          // Loading hasn't finished yet
          document.addEventListener("DOMContentLoaded", objectFitPolyfill);
        } else {
          // `DOMContentLoaded` has already fired
          objectFitPolyfill();
        }

        window.addEventListener("resize", objectFitPolyfill);
        window.objectFitPolyfill = objectFitPolyfill;
      })();

      /***/
    },
    /* 8 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /*
  global
  window, document, $, Webflow
*/

      (function () {
        // if the page is being rendered on the server, don't continue
        if (typeof window === "undefined") return;

        function setAllBackgroundVideoStates(shouldPlay) {
          if (Webflow.env("design")) {
            return;
          } // 1. set every video

          $("video").each(function () {
            shouldPlay && $(this).prop("autoplay") ? this.play() : this.pause();
          }); // 2. set every video controller button

          $(".w-background-video--control").each(function () {
            if (shouldPlay) {
              showPauseButton($(this));
            } else {
              showPlayButton($(this));
            }
          });
        }

        function showPlayButton($btn) {
          $btn.find("> span").each(function (i) {
            $(this).prop("hidden", function () {
              return i === 0;
            });
          });
        }

        function showPauseButton($btn) {
          $btn.find("> span").each(function (i) {
            $(this).prop("hidden", function () {
              return i === 1;
            });
          });
        }

        $(document).ready(function () {
          var watcher = window.matchMedia("(prefers-reduced-motion: reduce)"); // respond to changing preferences

          watcher.addEventListener("change", function (e) {
            setAllBackgroundVideoStates(!e.matches);
          });

          if (watcher.matches) {
            // user currently prefers reduced motion, pause all immediately
            setAllBackgroundVideoStates(false);
          } // show play button for videos without autoplay

          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                showPlayButton($(this));
              });
          });
          $(document).on("click", ".w-background-video--control", function (e) {
            if (Webflow.env("design")) return;
            var btn = $(e.currentTarget);
            var video = $("video#".concat(btn.attr("aria-controls"))).get(0);
            if (!video) return;

            if (video.paused) {
              var play = video.play();
              showPauseButton(btn); // IE does not return a promise from .play()

              if (play && typeof play["catch"] === "function") {
                play["catch"](function () {
                  // something went wrong and it's not playing
                  showPlayButton(btn);
                });
              }
            } else {
              video.pause();
              showPlayButton(btn);
            }
          });
        });
      })();

      /***/
    },
    /* 9 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals document, window, navigator */

      /* eslint-disable no-var */

      /**
       * Webflow: Brand pages on the subdomain
       */

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "brand",
        (module.exports = function ($) {
          var api = {};
          var doc = document;
          var $html = $("html");
          var $body = $("body");
          var location = window.location;
          var isPhantom = /PhantomJS/i.test(navigator.userAgent);
          var fullScreenEvents =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange";
          var brandElement; // -----------------------------------
          // Module methods

          // api.ready = function () {
          //   var shouldBrand = $html.attr("data-wf-status");
          //   var publishedDomain = $html.attr("data-wf-domain") || "";

          //   if (
          //     /\.webflow\.io$/i.test(publishedDomain) &&
          //     location.hostname !== publishedDomain
          //   ) {
          //     shouldBrand = true;
          //   }

          //   if (shouldBrand && !isPhantom) {
          //     brandElement = brandElement || createBadge();
          //     ensureBrand();
          //     setTimeout(ensureBrand, 500);
          //     $(doc)
          //       .off(fullScreenEvents, onFullScreenChange)
          //       .on(fullScreenEvents, onFullScreenChange);
          //   }
          // };

          function onFullScreenChange() {
            var fullScreen =
              doc.fullScreen ||
              doc.mozFullScreen ||
              doc.webkitIsFullScreen ||
              doc.msFullscreenElement ||
              Boolean(doc.webkitFullscreenElement);
            $(brandElement).attr(
              "style",
              fullScreen ? "display: none !important;" : ""
            );
          }

         

          function ensureBrand() {
            var found = $body.children(namespace);
            var match = found.length && found.get(0) === brandElement;
            var inEditor = Webflow.env("editor");

            if (match) {
              // Remove brand when Editor is active
              if (inEditor) {
                found.remove();
              } // Exit early, brand is in place

              return;
            } // Remove any invalid brand elements

            if (found.length) {
              found.remove();
            } // Append the brand (unless Editor is active)

            if (!inEditor) {
              $body.append(brandElement);
            }
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 10 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file
      // Include tram for frame-throttling

      /* globals window */

      /* eslint-disable no-var */

      var $ = window.$;
      var tram = __webpack_require__(5) && $.tram;
      /*!
       * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
       * _.each
       * _.map
       * _.find
       * _.filter
       * _.any
       * _.contains
       * _.delay
       * _.defer
       * _.throttle (webflow)
       * _.debounce
       * _.keys
       * _.has
       * _.now
       *
       * http://underscorejs.org
       * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
       * Underscore may be freely distributed under the MIT license.
       * @license MIT
       */

      module.exports = (function () {
        var _ = {}; // Current version.

        _.VERSION = "1.6.0-Webflow"; // Establish the object that gets returned to break out of a loop iteration.

        var breaker = {}; // Save bytes in the minified (but not gzipped) version:

        /* eslint-disable one-var */

        var ArrayProto = Array.prototype,
          ObjProto = Object.prototype,
          FuncProto = Function.prototype;
        /* eslint-enable one-var */
        // Create quick reference variables for speed access to core prototypes.

        /* eslint-disable one-var, no-unused-vars */

        var push = ArrayProto.push,
          slice = ArrayProto.slice,
          concat = ArrayProto.concat,
          toString = ObjProto.toString,
          hasOwnProperty = ObjProto.hasOwnProperty;
        /* eslint-enable one-var, no-unused-vars */
        // All **ECMAScript 5** native function implementations that we hope to use
        // are declared here.

        /* eslint-disable one-var, no-unused-vars */

        var nativeForEach = ArrayProto.forEach,
          nativeMap = ArrayProto.map,
          nativeReduce = ArrayProto.reduce,
          nativeReduceRight = ArrayProto.reduceRight,
          nativeFilter = ArrayProto.filter,
          nativeEvery = ArrayProto.every,
          nativeSome = ArrayProto.some,
          nativeIndexOf = ArrayProto.indexOf,
          nativeLastIndexOf = ArrayProto.lastIndexOf,
          nativeIsArray = Array.isArray,
          nativeKeys = Object.keys,
          nativeBind = FuncProto.bind;
        /* eslint-enable one-var, no-unused-vars */
        // Collection Functions
        // --------------------
        // The cornerstone, an `each` implementation, aka `forEach`.
        // Handles objects with the built-in `forEach`, arrays, and raw objects.
        // Delegates to **ECMAScript 5**'s native `forEach` if available.

        var each =
          (_.each =
          _.forEach =
            function (obj, iterator, context) {
              /* jshint shadow:true */
              if (obj == null) return obj;

              if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context); // eslint-disable-next-line no-implicit-coercion
              } else if (obj.length === +obj.length) {
                for (var i = 0, length = obj.length; i < length; i++) {
                  if (iterator.call(context, obj[i], i, obj) === breaker)
                    return;
                }
              } else {
                var keys = _.keys(obj); // eslint-disable-next-line no-redeclare

                for (var i = 0, length = keys.length; i < length; i++) {
                  if (
                    iterator.call(context, obj[keys[i]], keys[i], obj) ===
                    breaker
                  )
                    return;
                }
              }

              return obj;
            }); // Return the results of applying the iterator to each element.
        // Delegates to **ECMAScript 5**'s native `map` if available.

        _.map = _.collect = function (obj, iterator, context) {
          var results = [];
          if (obj == null) return results;
          if (nativeMap && obj.map === nativeMap)
            return obj.map(iterator, context);
          each(obj, function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
          });
          return results;
        }; // Return the first value which passes a truth test. Aliased as `detect`.

        _.find = _.detect = function (obj, predicate, context) {
          var result;
          any(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list)) {
              result = value;
              return true;
            }
          });
          return result;
        }; // Return all the elements that pass a truth test.
        // Delegates to **ECMAScript 5**'s native `filter` if available.
        // Aliased as `select`.

        _.filter = _.select = function (obj, predicate, context) {
          var results = [];
          if (obj == null) return results;
          if (nativeFilter && obj.filter === nativeFilter)
            return obj.filter(predicate, context);
          each(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list))
              results.push(value);
          });
          return results;
        }; // Determine if at least one element in the object matches a truth test.
        // Delegates to **ECMAScript 5**'s native `some` if available.
        // Aliased as `any`.

        var any =
          (_.some =
          _.any =
            function (obj, predicate, context) {
              predicate || (predicate = _.identity);
              var result = false;
              if (obj == null) return result;
              if (nativeSome && obj.some === nativeSome)
                return obj.some(predicate, context);
              each(obj, function (value, index, list) {
                if (
                  result ||
                  (result = predicate.call(context, value, index, list))
                )
                  return breaker;
              });
              return !!result; // eslint-disable-line no-implicit-coercion
            }); // Determine if the array or object contains a given value (using `===`).
        // Aliased as `include`.

        _.contains = _.include = function (obj, target) {
          if (obj == null) return false;
          if (nativeIndexOf && obj.indexOf === nativeIndexOf)
            // eslint-disable-next-line eqeqeq
            return obj.indexOf(target) != -1;
          return any(obj, function (value) {
            return value === target;
          });
        }; // Function (ahem) Functions
        // --------------------
        // Delays a function for the given number of milliseconds, and then calls
        // it with the arguments supplied.

        _.delay = function (func, wait) {
          var args = slice.call(arguments, 2);
          return setTimeout(function () {
            return func.apply(null, args);
          }, wait);
        }; // Defers a function, scheduling it to run after the current call stack has
        // cleared.

        _.defer = function (func) {
          return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
        }; // Returns a function, that, when invoked, will only be triggered once every
        // browser animation frame - using tram's requestAnimationFrame polyfill.

        _.throttle = function (func) {
          // eslint-disable-next-line one-var
          var wait, args, context;
          return function () {
            if (wait) return;
            wait = true;
            args = arguments;
            context = this;
            tram.frame(function () {
              wait = false;
              func.apply(context, args);
            });
          };
        }; // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.

        _.debounce = function (func, wait, immediate) {
          // eslint-disable-next-line one-var
          var timeout, args, context, timestamp, result;

          var later = function later() {
            var last = _.now() - timestamp;

            if (last < wait) {
              timeout = setTimeout(later, wait - last);
            } else {
              timeout = null;

              if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
              }
            }
          };

          return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;

            if (!timeout) {
              timeout = setTimeout(later, wait);
            }

            if (callNow) {
              result = func.apply(context, args);
              context = args = null;
            }

            return result;
          };
        }; // Object Functions
        // ----------------
        // Fill in a given object with default properties.

        _.defaults = function (obj) {
          if (!_.isObject(obj)) return obj;

          for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];

            for (var prop in source) {
              // eslint-disable-next-line no-void
              if (obj[prop] === void 0) obj[prop] = source[prop];
            }
          }

          return obj;
        }; // Retrieve the names of an object's properties.
        // Delegates to **ECMAScript 5**'s native `Object.keys`

        _.keys = function (obj) {
          if (!_.isObject(obj)) return [];
          if (nativeKeys) return nativeKeys(obj);
          var keys = [];

          for (var key in obj) {
            if (_.has(obj, key)) keys.push(key);
          }

          return keys;
        }; // Shortcut function for checking if an object has a given property directly
        // on itself (in other words, not on a prototype).

        _.has = function (obj, key) {
          return hasOwnProperty.call(obj, key);
        }; // Is a given variable an object?

        _.isObject = function (obj) {
          return obj === Object(obj);
        }; // Utility Functions
        // -----------------
        // A (possibly faster) way to get the current timestamp as an integer.

        _.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }; // By default, Underscore uses ERB-style template delimiters, change the
        // following template settings to use alternative delimiters.

        _.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        }; // When customizing `templateSettings`, if you don't want to define an
        // interpolation, evaluation or escaping regex, we need one that is
        // guaranteed not to match.

        var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
        // string literal.

        var escapes = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        };
        var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

        var escapeChar = function escapeChar(match) {
          return "\\" + escapes[match];
        }; // JavaScript micro-templating, similar to John Resig's implementation.
        // Underscore templating handles arbitrary delimiters, preserves whitespace,
        // and correctly escapes quotes within interpolated code.
        // NB: `oldSettings` only exists for backwards compatibility.

        _.template = function (text, settings, oldSettings) {
          if (!settings && oldSettings) settings = oldSettings;
          settings = _.defaults({}, settings, _.templateSettings); // Combine delimiters into one regular expression via alternation.

          var matcher = RegExp(
            [
              (settings.escape || noMatch).source,
              (settings.interpolate || noMatch).source,
              (settings.evaluate || noMatch).source,
            ].join("|") + "|$",
            "g"
          ); // Compile the template source, escaping string literals appropriately.

          var index = 0;
          var source = "__p+='";
          text.replace(
            matcher,
            function (match, escape, interpolate, evaluate, offset) {
              source += text.slice(index, offset).replace(escaper, escapeChar);
              index = offset + match.length;

              if (escape) {
                source +=
                  "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
              } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
              } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
              } // Adobe VMs need the match returned to produce the correct offest.

              return match;
            }
          );
          source += "';\n"; // If a variable is not specified, place data values in local scope.

          if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
          source =
            "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source +
            "return __p;\n";

          try {
            // eslint-disable-next-line no-new-func
            var render = new Function(settings.variable || "obj", "_", source);
          } catch (e) {
            e.source = source;
            throw e;
          }

          var template = function template(data) {
            return render.call(this, data, _);
          }; // Provide the compiled source as a convenience for precompilation.

          var argument = settings.variable || "obj";
          template.source = "function(" + argument + "){\n" + source + "}";
          return template;
        }; // Export underscore

        return _;
      })();
      /* eslint-enable */

      /***/
    },
    /* 11 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals document, window, localStorage, WEBFLOW_API_HOST, WEBFLOW_DEFAULT_HOST */

      /* eslint-disable no-var */

      /**
       * Webflow: Editor loader
       */

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "edit",
        (module.exports = function ($, _, options) {
          options = options || {}; // Exit early in test env or when inside an iframe

          if (Webflow.env("test") || Webflow.env("frame")) {
            // Allow test fixtures to continue
            if (!options.fixture && !inCypress()) {
              return {
                exit: 1,
              };
            }
          }

          var api = {};
          var $win = $(window);
          var $html = $(document.documentElement);
          var location = document.location;
          var hashchange = "hashchange";
          var loaded;
          var loadEditor = options.load || load;
          var hasLocalStorage = false;

          try {
            // Check localStorage for editor data
            hasLocalStorage =
              localStorage &&
              localStorage.getItem &&
              localStorage.getItem("WebflowEditor");
          } catch (e) {
            // SecurityError: browser storage has been disabled
          }

          if (hasLocalStorage) {
            loadEditor();
          } else if (location.search) {
            // Check url query for `edit` parameter or any url ending in `?edit`
            if (
              /[?&](edit)(?:[=&?]|$)/.test(location.search) ||
              /\?edit$/.test(location.href)
            ) {
              loadEditor();
            }
          } else {
            // Check hash fragment to support `#hash?edit`
            $win.on(hashchange, checkHash).triggerHandler(hashchange);
          }

          function checkHash() {
            if (loaded) {
              return;
            } // Load editor when hash contains `?edit`

            if (/\?edit/.test(location.hash)) {
              loadEditor();
            }
          }

          function load() {
            loaded = true; // Predefine global immediately to benefit Webflow.env

            window.WebflowEditor = true;
            $win.off(hashchange, checkHash);
            checkThirdPartyCookieSupport(function (thirdPartyCookiesSupported) {
              $.ajax({
                url: cleanSlashes(
                  "https://editor-api.webflow.com" + "/api/editor/view"
                ),
                data: {
                  siteId: $html.attr("data-wf-site"),
                },
                xhrFields: {
                  withCredentials: true,
                },
                dataType: "json",
                crossDomain: true,
                success: success(thirdPartyCookiesSupported),
              });
            });
          }

          function success(thirdPartyCookiesSupported) {
            return function (data) {
              if (!data) {
                console.error("Could not load editor data");
                return;
              }

              data.thirdPartyCookiesSupported = thirdPartyCookiesSupported;
              getScript(prefix(data.bugReporterScriptPath), function () {
                getScript(prefix(data.scriptPath), function () {
                  window.WebflowEditor(data);
                });
              });
            };
          }

          function getScript(url, done) {
            $.ajax({
              type: "GET",
              url: url,
              dataType: "script",
              cache: true,
            }).then(done, error);
          }

          function error(jqXHR, textStatus, errorThrown) {
            console.error("Could not load editor script: " + textStatus);
            throw errorThrown;
          }

          function prefix(url) {
            return url.indexOf("//") >= 0
              ? url
              : cleanSlashes("https://editor-api.webflow.com" + url);
          }

          function cleanSlashes(url) {
            return url.replace(/([^:])\/\//g, "$1/");
          }

          function checkThirdPartyCookieSupport(callback) {
            var iframe = window.document.createElement("iframe");
            iframe.src =
              "https://webflow.com" + "/site/third-party-cookie-check.html";
            iframe.style.display = "none";
            iframe.sandbox = "allow-scripts allow-same-origin";

            var handleMessage = function handleMessage(event) {
              if (event.data === "WF_third_party_cookies_unsupported") {
                cleanUpCookieCheckerIframe(iframe, handleMessage);
                callback(false);
              } else if (event.data === "WF_third_party_cookies_supported") {
                cleanUpCookieCheckerIframe(iframe, handleMessage);
                callback(true);
              }
            };

            iframe.onerror = function () {
              cleanUpCookieCheckerIframe(iframe, handleMessage);
              callback(false);
            };

            window.addEventListener("message", handleMessage, false);
            window.document.body.appendChild(iframe);
          }

          function cleanUpCookieCheckerIframe(iframe, listener) {
            window.removeEventListener("message", listener, false);
            iframe.remove();
          } // Export module

          return api;
        })
      );

      function inCypress() {
        try {
          return window.top.__Cypress__;
        } catch (e) {
          return false;
        }
      }

      /***/
    },
    /* 12 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: focus-visible
       */

      var Webflow = __webpack_require__(0);
      /*
       * This polyfill comes from https://github.com/WICG/focus-visible
       */

      Webflow.define(
        "focus-visible",
        (module.exports = function () {
          /**
           * Applies the :focus-visible polyfill at the given scope.
           * A scope in this case is either the top-level Document or a Shadow Root.
           *
           * @param {(Document|ShadowRoot)} scope
           * @see https://github.com/WICG/focus-visible
           */
          function applyFocusVisiblePolyfill(scope) {
            var hadKeyboardEvent = true;
            var hadFocusVisibleRecently = false;
            var hadFocusVisibleRecentlyTimeout = null;
            var inputTypesAllowlist = {
              text: true,
              search: true,
              url: true,
              tel: true,
              email: true,
              password: true,
              number: true,
              date: true,
              month: true,
              week: true,
              time: true,
              datetime: true,
              "datetime-local": true,
            };
            /**
             * Helper function for legacy browsers and iframes which sometimes focus
             * elements like document, body, and non-interactive SVG.
             * @param {Element} el
             */

            function isValidFocusTarget(el) {
              if (
                el &&
                el !== document &&
                el.nodeName !== "HTML" &&
                el.nodeName !== "BODY" &&
                "classList" in el &&
                "contains" in el.classList
              ) {
                return true;
              }

              return false;
            }
            /**
             * Computes whether the given element should automatically trigger the
             * `focus-visible` class being added, i.e. whether it should always match
             * `:focus-visible` when focused.
             * @param {Element} el
             * @return {boolean}
             */

            function focusTriggersKeyboardModality(el) {
              var type = el.type;
              var tagName = el.tagName;

              if (
                tagName === "INPUT" &&
                inputTypesAllowlist[type] &&
                !el.readOnly
              ) {
                return true;
              }

              if (tagName === "TEXTAREA" && !el.readOnly) {
                return true;
              }

              if (el.isContentEditable) {
                return true;
              }

              return false;
            }

            function addFocusVisibleAttribute(el) {
              if (el.getAttribute("data-wf-focus-visible")) {
                return;
              }

              el.setAttribute("data-wf-focus-visible", "true");
            }

            function removeFocusVisibleAttribute(el) {
              if (!el.getAttribute("data-wf-focus-visible")) {
                return;
              }

              el.removeAttribute("data-wf-focus-visible");
            }
            /**
             * If the most recent user interaction was via the keyboard;
             * and the key press did not include a meta, alt/option, or control key;
             * then the modality is keyboard. Otherwise, the modality is not keyboard.
             * Apply `focus-visible` to any current active element and keep track
             * of our keyboard modality state with `hadKeyboardEvent`.
             * @param {KeyboardEvent} e
             */

            function onKeyDown(e) {
              if (e.metaKey || e.altKey || e.ctrlKey) {
                return;
              }

              if (isValidFocusTarget(scope.activeElement)) {
                addFocusVisibleAttribute(scope.activeElement);
              }

              hadKeyboardEvent = true;
            }
            /**
             * If at any point a user clicks with a pointing device, ensure that we change
             * the modality away from keyboard.
             * This avoids the situation where a user presses a key on an already focused
             * element, and then clicks on a different element, focusing it with a
             * pointing device, while we still think we're in keyboard modality.
             * @param {Event} e
             */

            function onPointerDown() {
              hadKeyboardEvent = false;
            }
            /**
             * On `focus`, add the `focus-visible` class to the target if:
             * - the target received focus as a result of keyboard navigation, or
             * - the event target is an element that will likely require interaction
             *   via the keyboard (e.g. a text box)
             * @param {Event} e
             */

            function onFocus(e) {
              // Prevent IE from focusing the document or HTML element.
              if (!isValidFocusTarget(e.target)) {
                return;
              }

              if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
                addFocusVisibleAttribute(e.target);
              }
            }
            /**
             * On `blur`, remove the `focus-visible` class from the target.
             * @param {Event} e
             */

            function onBlur(e) {
              if (!isValidFocusTarget(e.target)) {
                return;
              }

              if (e.target.hasAttribute("data-wf-focus-visible")) {
                // To detect a tab/window switch, we look for a blur event followed
                // rapidly by a visibility change.
                // If we don't see a visibility change within 100ms, it's probably a
                // regular focus change.
                hadFocusVisibleRecently = true;
                window.clearTimeout(hadFocusVisibleRecentlyTimeout);
                hadFocusVisibleRecentlyTimeout = window.setTimeout(function () {
                  hadFocusVisibleRecently = false;
                }, 100);
                removeFocusVisibleAttribute(e.target);
              }
            }
            /**
             * If the user changes tabs, keep track of whether or not the previously
             * focused element had .focus-visible.
             * @param {Event} e
             */

            function onVisibilityChange() {
              if (document.visibilityState === "hidden") {
                // If the tab becomes active again, the browser will handle calling focus
                // on the element (Safari actually calls it twice).
                // If this tab change caused a blur on an element with focus-visible,
                // re-apply the class when the user switches back to the tab.
                if (hadFocusVisibleRecently) {
                  hadKeyboardEvent = true;
                }

                addInitialPointerMoveListeners();
              }
            }
            /**
             * Add a group of listeners to detect usage of any pointing devices.
             * These listeners will be added when the polyfill first loads, and anytime
             * the window is blurred, so that they are active when the window regains
             * focus.
             */

            function addInitialPointerMoveListeners() {
              document.addEventListener("mousemove", onInitialPointerMove);
              document.addEventListener("mousedown", onInitialPointerMove);
              document.addEventListener("mouseup", onInitialPointerMove);
              document.addEventListener("pointermove", onInitialPointerMove);
              document.addEventListener("pointerdown", onInitialPointerMove);
              document.addEventListener("pointerup", onInitialPointerMove);
              document.addEventListener("touchmove", onInitialPointerMove);
              document.addEventListener("touchstart", onInitialPointerMove);
              document.addEventListener("touchend", onInitialPointerMove);
            }

            function removeInitialPointerMoveListeners() {
              document.removeEventListener("mousemove", onInitialPointerMove);
              document.removeEventListener("mousedown", onInitialPointerMove);
              document.removeEventListener("mouseup", onInitialPointerMove);
              document.removeEventListener("pointermove", onInitialPointerMove);
              document.removeEventListener("pointerdown", onInitialPointerMove);
              document.removeEventListener("pointerup", onInitialPointerMove);
              document.removeEventListener("touchmove", onInitialPointerMove);
              document.removeEventListener("touchstart", onInitialPointerMove);
              document.removeEventListener("touchend", onInitialPointerMove);
            }
            /**
             * When the polfyill first loads, assume the user is in keyboard modality.
             * If any event is received from a pointing device (e.g. mouse, pointer,
             * touch), turn off keyboard modality.
             * This accounts for situations where focus enters the page from the URL bar.
             * @param {Event} e
             */

            function onInitialPointerMove(e) {
              // Work around a Safari quirk that fires a mousemove on <html> whenever the
              // window blurs, even if you're tabbing out of the page. Â¯\_(ãƒ„)_/Â¯
              if (
                e.target.nodeName &&
                e.target.nodeName.toLowerCase() === "html"
              ) {
                return;
              }

              hadKeyboardEvent = false;
              removeInitialPointerMoveListeners();
            } // For some kinds of state, we are interested in changes at the global scope
            // only. For example, global pointer input, global key presses and global
            // visibility change should affect the state at every scope:

            document.addEventListener("keydown", onKeyDown, true);
            document.addEventListener("mousedown", onPointerDown, true);
            document.addEventListener("pointerdown", onPointerDown, true);
            document.addEventListener("touchstart", onPointerDown, true);
            document.addEventListener(
              "visibilitychange",
              onVisibilityChange,
              true
            );
            addInitialPointerMoveListeners(); // For focus and blur, we specifically care about state changes in the local
            // scope. This is because focus / blur events that originate from within a
            // shadow root are not re-dispatched from the host element if it was already
            // the active element in its own scope:

            scope.addEventListener("focus", onFocus, true);
            scope.addEventListener("blur", onBlur, true);
          }

          function ready() {
            if (typeof document !== "undefined") {
              try {
                // check for native support; this will throw if the selector is not considered valid
                document.querySelector(":focus-visible");
              } catch (e) {
                // :focus-visible pseudo-selector is not supported natively
                applyFocusVisiblePolyfill(document);
              }
            }
          } // Export module

          return {
            ready: ready,
          };
        })
      );

      /***/
    },
    /* 13 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: focus-within
       */

      var Webflow = __webpack_require__(0); // polyfill based off of https://github.com/matteobad/focus-within-polyfill

      Webflow.define(
        "focus-within",
        (module.exports = function () {
          /**
           * Calculate the entire event path.
           *
           * @param {Element} node
           * @return {Array} computedPath
           */
          function computeEventPath(node) {
            var path = [node];
            var parent = null;

            while (
              (parent = node.parentNode || node.host || node.defaultView)
            ) {
              path.push(parent);
              node = parent;
            }

            return path;
          }

          function addFocusWithinAttribute(el) {
            if (
              typeof el.getAttribute !== "function" ||
              el.getAttribute("data-wf-focus-within")
            ) {
              return;
            }

            el.setAttribute("data-wf-focus-within", "true");
          }

          function removeFocusWithinAttribute(el) {
            if (
              typeof el.getAttribute !== "function" ||
              !el.getAttribute("data-wf-focus-within")
            ) {
              return;
            }

            el.removeAttribute("data-wf-focus-within");
          }
          /**
           * Attach event listerns to initiate polyfill
           * @return {boolean}
           */

          function loadFocusWithinPolyfill() {
            var handler = function handler(e) {
              var running;
              /**
               * Request animation frame callback.
               * Remove previously applied attributes.
               * Add new attributes.
               */

              function action() {
                running = false;

                if ("blur" === e.type) {
                  Array.prototype.slice
                    .call(computeEventPath(e.target))
                    .forEach(removeFocusWithinAttribute);
                }

                if ("focus" === e.type) {
                  Array.prototype.slice
                    .call(computeEventPath(e.target))
                    .forEach(addFocusWithinAttribute);
                }
              }

              if (!running) {
                window.requestAnimationFrame(action);
                running = true;
              }
            };

            document.addEventListener("focus", handler, true);
            document.addEventListener("blur", handler, true);
            addFocusWithinAttribute(document.body);
            return true;
          }

          function ready() {
            if (
              typeof document !== "undefined" &&
              document.body.hasAttribute("data-wf-focus-within")
            ) {
              try {
                // check for native support; this will throw if the selector is not considered valid
                document.querySelector(":focus-within");
              } catch (e) {
                loadFocusWithinPolyfill();
              }
            }
          } // Export module

          return {
            ready: ready,
          };
        })
      );

      /***/
    },
    /* 14 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals document, MouseEvent */

      /* eslint-disable no-var */

      /**
       * Webflow: focus
       */

      var Webflow = __webpack_require__(0);
      /*
 * Safari has a weird bug where it doesn't support :focus for links with hrefs,
 * buttons, and input[type=button|submit], so we listen for mousedown events
 * instead and force the element to emit a focus event in those cases.

 * See these webkit bugs for reference:
 * https://bugs.webkit.org/show_bug.cgi?id=22261
 * https://bugs.webkit.org/show_bug.cgi?id=229895
 */

      Webflow.define(
        "focus",
        (module.exports = function () {
          var capturedEvents = [];
          var capturing = false;

          function captureEvent(e) {
            if (capturing) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              capturedEvents.unshift(e);
            }
          }
          /*
           * The only mousedown events we care about here are ones emanating from
           * (A) anchor links with href attribute,
           * (B) non-disabled buttons,
           * (C) non-disabled textarea,
           * (D) non-disabled inputs of type "button", "reset", "checkbox", "radio", "submit"
           * (E) non-interactive elements (button, a, input, textarea, select) that have a tabindex with a numeric value
           * (F) audio elements
           * (G) video elements with controls attribute
           */

          function isPolyfilledFocusEvent(e) {
            var el = e.target;
            var tag = el.tagName;
            return (
              (/^a$/i.test(tag) && el.href != null) || // (A)
              (/^(button|textarea)$/i.test(tag) && el.disabled !== true) || // (B) (C)
              (/^input$/i.test(tag) &&
                /^(button|reset|submit|radio|checkbox)$/i.test(el.type) &&
                !el.disabled) || // (D)
              (!/^(button|input|textarea|select|a)$/i.test(tag) &&
                !Number.isNaN(Number.parseFloat(el.tabIndex))) || // (E)
              /^audio$/i.test(tag) || // (F)
              (/^video$/i.test(tag) && el.controls === true) // (G)
            );
          }

          function handler(e) {
            if (isPolyfilledFocusEvent(e)) {
              // start capturing possible out-of-order mouse events
              capturing = true;
              /*
               * enqueue the focus event _after_ the current batch of events, which
               * includes any blur events. The correct order of events is:
               *
               * [this element] MOUSEDOWN               <-- this event
               * [previously active element] BLUR
               * [previously active element] FOCUSOUT
               * [this element] FOCUS                   <-- forced event
               * [this element] FOCUSIN                 <-- forced event
               * [this element] MOUSEUP                 <-- possibly captured event (it may have fired _before_ the FOCUS event)
               * [this element] CLICK                   <-- possibly captured event (it may have fired _before_ the FOCUS event)
               */

              setTimeout(function () {
                // stop capturing possible out-of-order mouse events
                capturing = false; // trigger focus event

                e.target.focus(); // re-dispatch captured mouse events in order

                while (capturedEvents.length > 0) {
                  var event = capturedEvents.pop();
                  event.target.dispatchEvent(new MouseEvent(event.type, event));
                }
              }, 0);
            }
          }

          function ready() {
            if (
              typeof document !== "undefined" &&
              document.body.hasAttribute("data-wf-focus-within") &&
              Webflow.env.safari
            ) {
              document.addEventListener("mousedown", handler, true);
              document.addEventListener("mouseup", captureEvent, true);
              document.addEventListener("click", captureEvent, true);
            }
          } // Export module

          return {
            ready: ready,
          };
        })
      );

      /***/
    },
    /* 15 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window */

      /* eslint-disable no-var */

      /**
       * Webflow: Interactions
       */

      var Webflow = __webpack_require__(0);

      var IXEvents = __webpack_require__(3);

      Webflow.define(
        "ix",
        (module.exports = function ($, _) {
          var api = {};
          var designer;
          var $win = $(window);
          var namespace = ".w-ix";
          var tram = $.tram;
          var env = Webflow.env;
          var inApp = env();
          var emptyFix = env.chrome && env.chrome < 35;
          var transNone = "none 0s ease 0s";
          var $subs = $();
          var config = {};
          var anchors = [];
          var loads = [];
          var readys = [];
          var destroyed;
          var readyDelay = 1; // Component types and proxy selectors

          var components = {
            tabs: ".w-tab-link, .w-tab-pane",
            dropdown: ".w-dropdown",
            slider: ".w-slide",
            navbar: ".w-nav",
          }; // -----------------------------------
          // Module methods

          api.init = function (list) {
            setTimeout(function () {
              configure(list);
            }, 1);
          };

          api.preview = function () {
            designer = false;
            readyDelay = 100;
            setTimeout(function () {
              configure(window.__wf_ix);
            }, 1);
          };

          api.design = function () {
            designer = true;
            api.destroy();
          };

          api.destroy = function () {
            destroyed = true;
            $subs.each(teardown);
            Webflow.scroll.off(scroll);
            IXEvents.async();
            anchors = [];
            loads = [];
            readys = [];
          };

          api.ready = function () {
            // Redirect IX init while in design/preview modes
            if (inApp) {
              return env("design") ? api.design() : api.preview();
            } // Ready should only be used after destroy, as a way to re-init

            if (config && destroyed) {
              destroyed = false;
              init();
            }
          };

          api.run = run;
          api.style = inApp ? styleApp : stylePub; // -----------------------------------
          // Private methods

          function configure(list) {
            if (!list) {
              return;
            } // Map all interactions by slug

            config = {};

            _.each(list, function (item) {
              config[item.slug] = item.value;
            }); // Init ix after config

            init();
          }

          function init() {
            initIX1Engine(); // Need init IXEvents regardless if IX1 events exist since
            // IXEvents _also_ dispatch IX2 events.
            // Trigger queued events, must happen after init

            IXEvents.init(); // Trigger a redraw to ensure all IX intros play

            Webflow.redraw.up();
          }

          function initIX1Engine() {
            // Build each element's interaction keying from data attribute
            var els = $("[data-ix]");

            if (!els.length) {
              return;
            }

            els.each(teardown);
            els.each(build); // Listen for scroll events if any anchors exist

            if (anchors.length) {
              Webflow.scroll.on(scroll);
              setTimeout(scroll, 1);
            } // Handle loads or readys if they exist

            if (loads.length) {
              Webflow.load(runLoads);
            }

            if (readys.length) {
              setTimeout(runReadys, readyDelay);
            }
          }

          function build(i, el) {
            var $el = $(el);
            var id = $el.attr("data-ix");
            var ix = config[id];

            if (!ix) {
              return;
            }

            var triggers = ix.triggers;

            if (!triggers) {
              return;
            } // Set styles immediately to provide tram with starting transform values

            api.style($el, ix.style);

            _.each(triggers, function (trigger) {
              var state = {};
              var type = trigger.type;
              var stepsB = trigger.stepsB && trigger.stepsB.length;

              function runA() {
                run(trigger, $el, {
                  group: "A",
                });
              }

              function runB() {
                run(trigger, $el, {
                  group: "B",
                });
              }

              if (type === "load") {
                trigger.preload && !inApp
                  ? loads.push(runA)
                  : readys.push(runA);
                return;
              }

              if (type === "click") {
                $el.on("click" + namespace, function (evt) {
                  // Avoid late clicks on touch devices
                  if (!Webflow.validClick(evt.currentTarget)) {
                    return;
                  } // Prevent default on empty hash urls

                  if ($el.attr("href") === "#") {
                    evt.preventDefault();
                  }

                  run(trigger, $el, {
                    group: state.clicked ? "B" : "A",
                  });

                  if (stepsB) {
                    state.clicked = !state.clicked;
                  }
                });
                $subs = $subs.add($el);
                return;
              }

              if (type === "hover") {
                $el.on("mouseenter" + namespace, runA);
                $el.on("mouseleave" + namespace, runB);
                $subs = $subs.add($el);
                return;
              }

              if (type === "scroll") {
                anchors.push({
                  el: $el,
                  trigger: trigger,
                  state: {
                    active: false,
                  },
                  offsetTop: convert(trigger.offsetTop),
                  offsetBot: convert(trigger.offsetBot),
                });
                return;
              } // Check for a proxy component selector
              // type == [tabs, dropdown, slider, navbar]

              var proxy = components[type];

              if (proxy) {
                var $proxy = $el.closest(proxy);
                $proxy
                  .on(IXEvents.types.INTRO, runA)
                  .on(IXEvents.types.OUTRO, runB);
                $subs = $subs.add($proxy);
                return;
              }
            });
          }

          function convert(offset) {
            if (!offset) {
              return 0;
            }

            offset = String(offset);
            var result = parseInt(offset, 10); // eslint-disable-next-line no-self-compare

            if (result !== result) {
              return 0;
            }

            if (offset.indexOf("%") > 0) {
              result /= 100;

              if (result >= 1) {
                result = 0.999;
              }
            }

            return result;
          }

          function teardown(i, el) {
            $(el).off(namespace);
          }

          function scroll() {
            var viewTop = $win.scrollTop();
            var viewHeight = $win.height(); // Check each anchor for a valid scroll trigger

            var count = anchors.length;

            for (var i = 0; i < count; i++) {
              var anchor = anchors[i];
              var $el = anchor.el;
              var trigger = anchor.trigger;
              var stepsB = trigger.stepsB && trigger.stepsB.length;
              var state = anchor.state;
              var top = $el.offset().top;
              var height = $el.outerHeight();
              var offsetTop = anchor.offsetTop;
              var offsetBot = anchor.offsetBot;

              if (offsetTop < 1 && offsetTop > 0) {
                offsetTop *= viewHeight;
              }

              if (offsetBot < 1 && offsetBot > 0) {
                offsetBot *= viewHeight;
              }

              var active =
                top + height - offsetTop >= viewTop &&
                top + offsetBot <= viewTop + viewHeight;

              if (active === state.active) {
                continue;
              }

              if (active === false && !stepsB) {
                continue;
              }

              state.active = active;
              run(trigger, $el, {
                group: active ? "A" : "B",
              });
            }
          }

          function runLoads() {
            var count = loads.length;

            for (var i = 0; i < count; i++) {
              loads[i]();
            }
          }

          function runReadys() {
            var count = readys.length;

            for (var i = 0; i < count; i++) {
              readys[i]();
            }
          }

          function run(trigger, $el, opts, replay) {
            opts = opts || {};
            var done = opts.done;
            var preserve3d = trigger.preserve3d; // Do not run in designer unless forced

            if (designer && !opts.force) {
              return;
            } // Operate on a set of grouped steps

            var group = opts.group || "A";
            var loop = trigger["loop" + group];
            var steps = trigger["steps" + group];

            if (!steps || !steps.length) {
              return;
            }

            if (steps.length < 2) {
              loop = false;
            } // One-time init before any loops

            if (!replay) {
              // Find selector within element descendants, siblings, or query whole document
              var selector = trigger.selector;

              if (selector) {
                if (trigger.descend) {
                  $el = $el.find(selector);
                } else if (trigger.siblings) {
                  $el = $el.siblings(selector);
                } else {
                  $el = $(selector);
                }

                if (inApp) {
                  $el.attr("data-ix-affect", 1);
                }
              } // Apply empty fix for certain Chrome versions

              if (emptyFix) {
                $el.addClass("w-ix-emptyfix");
              } // Set preserve3d for triggers with 3d transforms

              if (preserve3d) {
                $el.css("transform-style", "preserve-3d");
              }
            }

            var _tram = tram($el); // Add steps

            var meta = {
              omit3d: !preserve3d,
            };

            for (var i = 0; i < steps.length; i++) {
              addStep(_tram, steps[i], meta);
            }

            function fin() {
              // Run trigger again if looped
              if (loop) {
                return run(trigger, $el, opts, true);
              } // Reset any 'auto' values

              if (meta.width === "auto") {
                _tram.set({
                  width: "auto",
                });
              }

              if (meta.height === "auto") {
                _tram.set({
                  height: "auto",
                });
              } // Run callback

              done && done();
            } // Add final step to queue if tram has started

            meta.start ? _tram.then(fin) : fin();
          }

          function addStep(_tram, step, meta) {
            var addMethod = "add";
            var startMethod = "start"; // Once the transition has started, we will always use then() to add to the queue.

            if (meta.start) {
              addMethod = startMethod = "then";
            } // Parse transitions string on the current step

            var transitions = step.transition;

            if (transitions) {
              transitions = transitions.split(",");

              for (var i = 0; i < transitions.length; i++) {
                var transition = transitions[i];

                _tram[addMethod](transition);
              }
            } // Build a clean object to pass to the tram method

            var clean = tramify(step, meta) || {}; // Store last width and height values

            if (clean.width != null) {
              meta.width = clean.width;
            }

            if (clean.height != null) {
              meta.height = clean.height;
            } // When transitions are not present, set values immediately and continue queue.

            if (transitions == null) {
              // If we have started, wrap set() in then() and reset queue
              if (meta.start) {
                _tram.then(function () {
                  var queue = this.queue;
                  this.set(clean);

                  if (clean.display) {
                    _tram.redraw();

                    Webflow.redraw.up();
                  }

                  this.queue = queue;
                  this.next();
                });
              } else {
                _tram.set(clean); // Always redraw after setting display

                if (clean.display) {
                  _tram.redraw();

                  Webflow.redraw.up();
                }
              } // Use the wait() method to kick off queue in absence of transitions.

              var wait = clean.wait;

              if (wait != null) {
                _tram.wait(wait);

                meta.start = true;
              } // Otherwise, when transitions are present
            } else {
              // If display is present, handle it separately
              if (clean.display) {
                var display = clean.display; // eslint-disable-next-line webflow/no-delete

                delete clean.display; // If we've already started, we need to wrap it in a then()

                if (meta.start) {
                  _tram.then(function () {
                    var queue = this.queue;
                    this.set({
                      display: display,
                    }).redraw();
                    Webflow.redraw.up();
                    this.queue = queue;
                    this.next();
                  });
                } else {
                  _tram
                    .set({
                      display: display,
                    })
                    .redraw();

                  Webflow.redraw.up();
                }
              } // Otherwise, start a transition using the current start method.

              _tram[startMethod](clean);

              meta.start = true;
            }
          } // (In app) Set styles immediately and manage upstream transition

          function styleApp(el, data) {
            var _tram = tram(el); // Exit early when data is empty to avoid clearing upstream

            if ($.isEmptyObject(data)) {
              return;
            } // Get computed transition value

            el.css("transition", "");
            var computed = el.css("transition"); // If computed is set to none, clear upstream

            if (computed === transNone) {
              computed = _tram.upstream = null;
            } // Set upstream transition to none temporarily

            _tram.upstream = transNone; // Set values immediately

            _tram.set(tramify(data)); // Only restore upstream in preview mode

            _tram.upstream = computed;
          } // (Published) Set styles immediately on specified jquery element

          function stylePub(el, data) {
            tram(el).set(tramify(data));
          } // Build a clean object for tram

          function tramify(obj, meta) {
            var omit3d = meta && meta.omit3d;
            var result = {};
            var found = false;

            for (var key in obj) {
              if (key === "transition") {
                continue;
              }

              if (key === "keysort") {
                continue;
              }

              if (omit3d) {
                if (
                  key === "z" ||
                  key === "rotateX" ||
                  key === "rotateY" ||
                  key === "scaleZ"
                ) {
                  continue;
                }
              }

              result[key] = obj[key];
              found = true;
            } // If empty, return null for tram.set/stop compliance

            return found ? result : null;
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 16 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: Auto-select links to current page or section
       */

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "links",
        (module.exports = function ($, _) {
          var api = {};
          var $win = $(window);
          var designer;
          var inApp = Webflow.env();
          var location = window.location;
          var tempLink = document.createElement("a");
          var linkCurrent = "w--current";
          var indexPage = /index\.(html|php)$/;
          var dirList = /\/$/;
          var anchors;
          var slug; // -----------------------------------
          // Module methods

          api.ready = api.design = api.preview = init; // -----------------------------------
          // Private methods

          function init() {
            designer = inApp && Webflow.env("design");
            slug = Webflow.env("slug") || location.pathname || ""; // Reset scroll listener, init anchors

            Webflow.scroll.off(scroll);
            anchors = []; // Test all links for a selectable href

            var links = document.links;

            for (var i = 0; i < links.length; ++i) {
              select(links[i]);
            } // Listen for scroll if any anchors exist

            if (anchors.length) {
              Webflow.scroll.on(scroll);
              scroll();
            }
          }

          function select(link) {
            var href =
              (designer && link.getAttribute("href-disabled")) ||
              link.getAttribute("href");
            tempLink.href = href; // Ignore any hrefs with a colon to safely avoid all uri schemes

            if (href.indexOf(":") >= 0) {
              return;
            }

            var $link = $(link); // Check for all links with hash (eg (this-host)(/this-path)#section) to this page

            if (
              tempLink.hash.length > 1 &&
              tempLink.host + tempLink.pathname ===
                location.host + location.pathname
            ) {
              // Ignore any hrefs with Google Translate type hash
              // Example: jQuery can't parse $('#googtrans(en|es)')
              // https://forum.webflow.com/t/dropdown-menus-not-working-on-site/87140
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(tempLink.hash)) {
                return;
              }

              var $section = $(tempLink.hash);
              $section.length &&
                anchors.push({
                  link: $link,
                  sec: $section,
                  active: false,
                });
              return;
            } // Ignore empty # links

            if (href === "#" || href === "") {
              return;
            } // Determine whether the link should be selected

            var match =
              tempLink.href === location.href ||
              href === slug ||
              (indexPage.test(href) && dirList.test(slug));
            setClass($link, linkCurrent, match);
          }

          function scroll() {
            var viewTop = $win.scrollTop();
            var viewHeight = $win.height(); // Check each anchor for a section in view

            _.each(anchors, function (anchor) {
              var $link = anchor.link;
              var $section = anchor.sec;
              var top = $section.offset().top;
              var height = $section.outerHeight();
              var offset = viewHeight * 0.5;
              var active =
                $section.is(":visible") &&
                top + height - offset >= viewTop &&
                top + offset <= viewTop + viewHeight;

              if (anchor.active === active) {
                return;
              }

              anchor.active = active;
              setClass($link, linkCurrent, active);
            });
          }

          function setClass($elem, className, add) {
            var exists = $elem.hasClass(className);

            if (add && exists) {
              return;
            }

            if (!add && !exists) {
              return;
            }

            add ? $elem.addClass(className) : $elem.removeClass(className);
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 17 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: Smooth scroll
       */

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "scroll",
        (module.exports = function ($) {
          /**
           * A collection of namespaced events found in this module.
           * Namespaced events encapsulate our code, and make it safer and easier
           * for designers to apply custom code overrides.
           * @see https://api.jquery.com/on/#event-names
           * @typedef {Object.<string>} NamespacedEventsCollection
           */
          var NS_EVENTS = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          };
          var loc = window.location;
          var history = inIframe() ? null : window.history;
          var $win = $(window);
          var $doc = $(document);
          var $body = $(document.body);

          var animate =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (fn) {
              window.setTimeout(fn, 15);
            };

          var rootTag = Webflow.env("editor") ? ".w-editor-body" : "body";
          var headerSelector =
            "header, " +
            rootTag +
            " > .header, " +
            rootTag +
            " > .w-nav:not([data-no-scroll])";
          var emptyHrefSelector = 'a[href="#"]';
          /**
           * Select only links whose href:
           * - contains a #
           * - is not one of our namespaced TabLink elements
           * - is not _only_ a #
           */

          var localHrefSelector =
            'a[href*="#"]:not(.w-tab-link):not(' + emptyHrefSelector + ")";
          var scrollTargetOutlineCSS =
            '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}';
          var focusStylesEl = document.createElement("style");
          focusStylesEl.appendChild(
            document.createTextNode(scrollTargetOutlineCSS)
          );

          function inIframe() {
            try {
              return Boolean(window.frameElement);
            } catch (e) {
              return true;
            }
          }

          var validHash = /^#[a-zA-Z0-9][\w:.-]*$/;
          /**
           * Determine if link navigates to current page
           * @param {HTMLAnchorElement} link
           */

          function linksToCurrentPage(link) {
            return (
              validHash.test(link.hash) &&
              link.host + link.pathname === loc.host + loc.pathname
            );
          }
          /**
           * Check if the designer has indicated that this page should
           * have no scroll animation, or if the end user has set
           * prefers-reduced-motion in their OS
           */

          var reducedMotionMediaQuery =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)");

          function reducedMotionEnabled() {
            return (
              document.body.getAttribute("data-wf-scroll-motion") === "none" ||
              reducedMotionMediaQuery.matches
            );
          }

          function setFocusable($el, action) {
            var initialTabindex;

            switch (action) {
              case "add":
                initialTabindex = $el.attr("tabindex");

                if (initialTabindex) {
                  $el.attr("data-wf-tabindex-swap", initialTabindex);
                } else {
                  $el.attr("tabindex", "-1");
                }

                break;

              case "remove":
                initialTabindex = $el.attr("data-wf-tabindex-swap");

                if (initialTabindex) {
                  $el.attr("tabindex", initialTabindex);
                  $el.removeAttr("data-wf-tabindex-swap");
                } else {
                  $el.removeAttr("tabindex");
                }

                break;
            }

            $el.toggleClass("wf-force-outline-none", action === "add");
          }
          /**
           * Determine if we should execute custom scroll
           */

          function validateScroll(evt) {
            var target = evt.currentTarget;

            if (
              // Bail if in Designer
              Webflow.env("design") || // Ignore links being used by jQuery mobile
              (window.$.mobile &&
                /(?:^|\s)ui-link(?:$|\s)/.test(target.className))
            ) {
              return;
            }

            var hash = linksToCurrentPage(target) ? target.hash : "";
            if (hash === "") return;
            var $el = $(hash);

            if (!$el.length) {
              return;
            }

            if (evt) {
              evt.preventDefault();
              evt.stopPropagation();
            }

            updateHistory(hash, evt);
            window.setTimeout(
              function () {
                scroll($el, function setFocus() {
                  setFocusable($el, "add");
                  $el.get(0).focus({
                    preventScroll: true,
                  });
                  setFocusable($el, "remove");
                });
              },
              evt ? 0 : 300
            );
          }

          function updateHistory(hash) {
            // Push new history state
            if (
              loc.hash !== hash &&
              history &&
              history.pushState && // Navigation breaks Chrome when the protocol is `file:`.
              !(Webflow.env.chrome && loc.protocol === "file:")
            ) {
              var oldHash = history.state && history.state.hash;

              if (oldHash !== hash) {
                history.pushState(
                  {
                    hash: hash,
                  },
                  "",
                  hash
                );
              }
            }
          }

          function scroll($targetEl, cb) {
            var start = $win.scrollTop();
            var end = calculateScrollEndPosition($targetEl);
            if (start === end) return;
            var duration = calculateScrollDuration($targetEl, start, end);
            var clock = Date.now();

            var step = function step() {
              var elapsed = Date.now() - clock;
              window.scroll(0, getY(start, end, elapsed, duration));

              if (elapsed <= duration) {
                animate(step);
              } else if (typeof cb === "function") {
                cb();
              }
            };

            animate(step);
          }

          function calculateScrollEndPosition($targetEl) {
            // If a fixed header exists, offset for the height
            var $header = $(headerSelector);
            var offsetY =
              $header.css("position") === "fixed" ? $header.outerHeight() : 0;
            var end = $targetEl.offset().top - offsetY; // If specified, scroll so that the element ends up in the middle of the viewport

            if ($targetEl.data("scroll") === "mid") {
              var available = $win.height() - offsetY;
              var elHeight = $targetEl.outerHeight();

              if (elHeight < available) {
                end -= Math.round((available - elHeight) / 2);
              }
            }

            return end;
          }

          function calculateScrollDuration($targetEl, start, end) {
            if (reducedMotionEnabled()) return 0;
            var mult = 1; // Check for custom time multiplier on the body and the scroll target

            $body.add($targetEl).each(function (_, el) {
              var time = parseFloat(el.getAttribute("data-scroll-time"));

              if (!isNaN(time) && time >= 0) {
                mult = time;
              }
            });
            return (
              (472.143 * Math.log(Math.abs(start - end) + 125) - 2000) * mult
            );
          }

          function getY(start, end, elapsed, duration) {
            if (elapsed > duration) {
              return end;
            }

            return start + (end - start) * ease(elapsed / duration);
          }

          function ease(t) {
            return t < 0.5
              ? 4 * t * t * t
              : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          }

          function ready() {
            var WF_CLICK_EMPTY = NS_EVENTS.WF_CLICK_EMPTY,
              WF_CLICK_SCROLL = NS_EVENTS.WF_CLICK_SCROLL;
            $doc.on(WF_CLICK_SCROLL, localHrefSelector, validateScroll);
            /**
             * Prevent empty hash links from triggering scroll.
             * Legacy feature to preserve: use the default "#" link
             * to trigger an interaction, and do not want the page
             * to scroll to the top.
             */

            $doc.on(WF_CLICK_EMPTY, emptyHrefSelector, function (e) {
              e.preventDefault();
            });
            document.head.insertBefore(focusStylesEl, document.head.firstChild);
          } // Export module

          return {
            ready: ready,
          };
        })
      );

      /***/
    },
    /* 18 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals document, window */

      /* eslint-disable no-var */

      /**
       * Webflow: Touch events
       * Supports legacy 'tap' event
       * Adds a 'swipe' event to desktop and mobile
       */

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "touch",
        (module.exports = function ($) {
          var api = {};
          var getSelection = window.getSelection; // Delegate all legacy 'tap' events to 'click'

          $.event.special.tap = {
            bindType: "click",
            delegateType: "click",
          };

          api.init = function (el) {
            el = typeof el === "string" ? $(el).get(0) : el;
            return el ? new Touch(el) : null;
          };

          function Touch(el) {
            var active = false;
            var useTouch = false;
            var thresholdX = Math.min(Math.round(window.innerWidth * 0.04), 40);
            var startX;
            var lastX;
            el.addEventListener("touchstart", start, false);
            el.addEventListener("touchmove", move, false);
            el.addEventListener("touchend", end, false);
            el.addEventListener("touchcancel", cancel, false);
            el.addEventListener("mousedown", start, false);
            el.addEventListener("mousemove", move, false);
            el.addEventListener("mouseup", end, false);
            el.addEventListener("mouseout", cancel, false);

            function start(evt) {
              // We donâ€™t handle multi-touch events yet.
              var touches = evt.touches;

              if (touches && touches.length > 1) {
                return;
              }

              active = true;

              if (touches) {
                useTouch = true;
                startX = touches[0].clientX;
              } else {
                startX = evt.clientX;
              }

              lastX = startX;
            }

            function move(evt) {
              if (!active) {
                return;
              }

              if (useTouch && evt.type === "mousemove") {
                evt.preventDefault();
                evt.stopPropagation();
                return;
              }

              var touches = evt.touches;
              var x = touches ? touches[0].clientX : evt.clientX;
              var velocityX = x - lastX;
              lastX = x; // Allow swipes while pointer is down, but prevent them during text selection

              if (
                Math.abs(velocityX) > thresholdX &&
                getSelection &&
                String(getSelection()) === ""
              ) {
                triggerEvent("swipe", evt, {
                  direction: velocityX > 0 ? "right" : "left",
                });
                cancel();
              }
            }

            function end(evt) {
              if (!active) {
                return;
              }

              active = false;

              if (useTouch && evt.type === "mouseup") {
                evt.preventDefault();
                evt.stopPropagation();
                useTouch = false;
                return;
              }
            }

            function cancel() {
              active = false;
            }

            function destroy() {
              el.removeEventListener("touchstart", start, false);
              el.removeEventListener("touchmove", move, false);
              el.removeEventListener("touchend", end, false);
              el.removeEventListener("touchcancel", cancel, false);
              el.removeEventListener("mousedown", start, false);
              el.removeEventListener("mousemove", move, false);
              el.removeEventListener("mouseup", end, false);
              el.removeEventListener("mouseout", cancel, false);
              el = null;
            } // Public instance methods

            this.destroy = destroy;
          } // Wrap native event to supoprt preventdefault + stopPropagation

          function triggerEvent(type, evt, data) {
            var newEvent = $.Event(type, {
              originalEvent: evt,
            });
            $(evt.target).trigger(newEvent, data);
          } // Listen for touch events on all nodes by default.

          api.instance = api.init(document); // Export module

          return api;
        })
      );

      /***/
    },
    /* 19 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: Dropdown component
       */

      var Webflow = __webpack_require__(0);

      var IXEvents = __webpack_require__(1);

      var KEY_CODES = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
      var FORCE_CLOSE = true;
      /**
       * This pattern matches links that begin with a `#` AND have some alphanumeric
       * characters after it, including also hyphens and underscores
       *
       * Matches:
       * #foo
       * #999
       * #foo-bar_baz
       *
       * Does not match:
       * #
       */

      var INTERNAL_PAGE_LINK_HASHES_PATTERN = /^#[a-zA-Z0-9\-_]+$/;
      Webflow.define(
        "dropdown",
        (module.exports = function ($, _) {
          var debounce = _.debounce;
          var api = {};
          var inApp = Webflow.env();
          var inPreview = false;
          var inDesigner;
          var touch = Webflow.env.touch;
          var namespace = ".w-dropdown";
          var openStateClassName = "w--open";
          var ix = IXEvents.triggers;
          var defaultZIndex = 900; // @dropdown-depth

          var focusOutEvent = "focusout" + namespace;
          var keydownEvent = "keydown" + namespace;
          var mouseEnterEvent = "mouseenter" + namespace;
          var mouseMoveEvent = "mousemove" + namespace;
          var mouseLeaveEvent = "mouseleave" + namespace;
          var mouseUpEvent = (touch ? "click" : "mouseup") + namespace;
          var closeEvent = "w-close" + namespace;
          var settingEvent = "setting" + namespace;
          var $doc = $(document);
          var $dropdowns; // -----------------------------------
          // Module methods

          api.ready = init;

          api.design = function () {
            // Close all when returning from preview
            if (inPreview) {
              closeAll();
            }

            inPreview = false;
            init();
          };

          api.preview = function () {
            inPreview = true;
            init();
          }; // -----------------------------------
          // Private methods

          function init() {
            inDesigner = inApp && Webflow.env("design"); // Find all instances on the page

            $dropdowns = $doc.find(namespace);
            $dropdowns.each(build);
          }

          function build(i, el) {
            var $el = $(el); // Store state in data

            var data = $.data(el, namespace);

            if (!data) {
              data = $.data(el, namespace, {
                open: false,
                el: $el,
                config: {},
                selectedIdx: -1,
              });
            }

            data.toggle = data.el.children(".w-dropdown-toggle");
            data.list = data.el.children(".w-dropdown-list");
            data.links = data.list.find("a:not(.w-dropdown .w-dropdown a)");
            data.complete = complete(data);
            data.mouseLeave = makeMouseLeaveHandler(data);
            data.mouseUpOutside = outside(data);
            data.mouseMoveOutside = moveOutside(data); // Set config from data attributes

            configure(data); // Store the IDs of the toggle button & list

            var toggleId = data.toggle.attr("id");
            var listId = data.list.attr("id"); // If user did not provide toggle ID, set it

            if (!toggleId) {
              toggleId = "w-dropdown-toggle-" + i;
            } // If user did not provide list ID, set it

            if (!listId) {
              listId = "w-dropdown-list-" + i;
            } // Add attributes to toggle element

            data.toggle.attr("id", toggleId);
            data.toggle.attr("aria-controls", listId);
            data.toggle.attr("aria-haspopup", "menu");
            data.toggle.attr("aria-expanded", "false"); // Hide toggle icon from ATs

            data.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"); // If toggle element is not a button

            if (data.toggle.prop("tagName") !== "BUTTON") {
              // Give it an appropriate role
              data.toggle.attr("role", "button"); // And give it a tabindex if user has not provided one

              if (!data.toggle.attr("tabindex")) {
                data.toggle.attr("tabindex", "0");
              }
            } // Add attributes to list element

            data.list.attr("id", listId);
            data.list.attr("aria-labelledby", toggleId);
            data.links.each(function (idx, link) {
              /**
               * In macOS Safari, links don't take focus on click unless they have
               * a tabindex. Without this, the dropdown will break.
               * @see https://gist.github.com/cvrebert/68659d0333a578d75372
               */
              if (!link.hasAttribute("tabindex"))
                link.setAttribute("tabindex", "0"); // We want to close the drop down if the href links somewhere internally
              // to the page

              if (INTERNAL_PAGE_LINK_HASHES_PATTERN.test(link.hash)) {
                link.addEventListener("click", close.bind(null, data));
              }
            }); // Remove old events

            data.el.off(namespace);
            data.toggle.off(namespace);

            if (data.nav) {
              data.nav.off(namespace);
            }

            var initialToggler = makeToggler(data, FORCE_CLOSE);

            if (inDesigner) {
              data.el.on(settingEvent, makeSettingEventHandler(data));
            }

            if (!inDesigner) {
              // Close in preview mode and clean the data.hovering state
              if (inApp) {
                data.hovering = false;
                close(data);
              }

              if (data.config.hover) {
                data.toggle.on(mouseEnterEvent, makeMouseEnterHandler(data));
              }

              data.el.on(closeEvent, initialToggler);
              data.el.on(keydownEvent, makeDropdownKeydownHandler(data));
              data.el.on(focusOutEvent, makeDropdownFocusOutHandler(data));
              data.toggle.on(mouseUpEvent, initialToggler);
              data.toggle.on(keydownEvent, makeToggleKeydownHandler(data));
              data.nav = data.el.closest(".w-nav");
              data.nav.on(closeEvent, initialToggler);
            }
          }
          /**
           * Mutate the data object with a new config property
           */

          function configure(data) {
            // Determine if z-index should be managed
            var zIndex = Number(data.el.css("z-index"));
            data.manageZ =
              zIndex === defaultZIndex || zIndex === defaultZIndex + 1;
            data.config = {
              hover: data.el.attr("data-hover") === "true" && !touch,
              delay: data.el.attr("data-delay"),
            };
          }

          function makeSettingEventHandler(data) {
            return function (evt, options) {
              options = options || {};
              configure(data);
              options.open === true && open(data, true);
              options.open === false &&
                close(data, {
                  immediate: true,
                });
            };
          }

          function makeToggler(data, forceClose) {
            return debounce(function (evt) {
              if (data.open || (evt && evt.type === "w-close")) {
                return close(data, {
                  forceClose: forceClose,
                });
              }

              open(data);
            });
          }

          function open(data) {
            if (data.open) {
              return;
            }

            closeOthers(data);
            data.open = true;
            data.list.addClass(openStateClassName);
            data.toggle.addClass(openStateClassName);
            data.toggle.attr("aria-expanded", "true"); // ARIA

            ix.intro(0, data.el[0]);
            Webflow.redraw.up(); // Increase z-index to keep above other managed dropdowns

            data.manageZ && data.el.css("z-index", defaultZIndex + 1); // Listen for click outside events

            var isEditor = Webflow.env("editor");

            if (!inDesigner) {
              $doc.on(mouseUpEvent, data.mouseUpOutside);
            }

            if (data.hovering && !isEditor) {
              data.el.on(mouseLeaveEvent, data.mouseLeave);
            }

            if (data.hovering && isEditor) {
              $doc.on(mouseMoveEvent, data.mouseMoveOutside);
            } // Clear previous delay

            window.clearTimeout(data.delayId);
          }

          function close(data) {
            var _ref =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : {},
              immediate = _ref.immediate,
              forceClose = _ref.forceClose;

            if (!data.open) {
              return;
            } // Do not close hover-based menus if currently hovering

            if (data.config.hover && data.hovering && !forceClose) {
              return;
            }

            data.toggle.attr("aria-expanded", "false");
            data.open = false;
            var config = data.config;
            ix.outro(0, data.el[0]); // Stop listening for click outside events

            $doc.off(mouseUpEvent, data.mouseUpOutside);
            $doc.off(mouseMoveEvent, data.mouseMoveOutside);
            data.el.off(mouseLeaveEvent, data.mouseLeave); // Clear previous delay

            window.clearTimeout(data.delayId); // Skip delay during immediate

            if (!config.delay || immediate) {
              return data.complete();
            } // Optionally wait for delay before close

            data.delayId = window.setTimeout(data.complete, config.delay);
          }

          function closeAll() {
            $doc.find(namespace).each(function (i, el) {
              $(el).triggerHandler(closeEvent);
            });
          }

          function closeOthers(data) {
            var self = data.el[0];
            $dropdowns.each(function (i, other) {
              var $other = $(other);

              if ($other.is(self) || $other.has(self).length) {
                return;
              }

              $other.triggerHandler(closeEvent);
            });
          }

          function outside(data) {
            // Unbind previous click handler if it exists
            if (data.mouseUpOutside) {
              $doc.off(mouseUpEvent, data.mouseUpOutside);
            } // Close menu when clicked outside

            return debounce(function (evt) {
              if (!data.open) {
                return;
              }

              var $target = $(evt.target);

              if ($target.closest(".w-dropdown-toggle").length) {
                return;
              }

              var isEventOutsideDropdowns =
                $.inArray(data.el[0], $target.parents(namespace)) === -1;
              var isEditor = Webflow.env("editor");

              if (isEventOutsideDropdowns) {
                if (isEditor) {
                  var isEventOnDetachedSvg =
                    $target.parents().length === 1 &&
                    $target.parents("svg").length === 1;
                  var isEventOnHoverControls = $target.parents(
                    ".w-editor-bem-EditorHoverControls"
                  ).length;

                  if (isEventOnDetachedSvg || isEventOnHoverControls) {
                    return;
                  }
                }

                close(data);
              }
            });
          }

          function complete(data) {
            return function () {
              data.list.removeClass(openStateClassName);
              data.toggle.removeClass(openStateClassName); // Reset z-index for managed dropdowns

              data.manageZ && data.el.css("z-index", "");
            };
          }

          function makeMouseEnterHandler(data) {
            return function () {
              data.hovering = true;
              open(data);
            };
          }

          function makeMouseLeaveHandler(data) {
            return function () {
              data.hovering = false; // We do not want the list to close upon mouseleave
              // if one of the links has focus

              if (!data.links.is(":focus")) {
                close(data);
              }
            };
          }

          function moveOutside(data) {
            return debounce(function (evt) {
              if (!data.open) {
                return;
              }

              var $target = $(evt.target);
              var isEventOutsideDropdowns =
                $.inArray(data.el[0], $target.parents(namespace)) === -1;

              if (isEventOutsideDropdowns) {
                var isEventOnHoverControls = $target.parents(
                  ".w-editor-bem-EditorHoverControls"
                ).length;
                var isEventOnHoverToolbar = $target.parents(
                  ".w-editor-bem-RTToolbar"
                ).length;
                var $editorOverlay = $(".w-editor-bem-EditorOverlay");
                var isDropdownInEdition =
                  $editorOverlay.find(".w-editor-edit-outline").length ||
                  $editorOverlay.find(".w-editor-bem-RTToolbar").length;

                if (
                  isEventOnHoverControls ||
                  isEventOnHoverToolbar ||
                  isDropdownInEdition
                ) {
                  return;
                }

                data.hovering = false;
                close(data);
              }
            });
          }

          function makeDropdownKeydownHandler(data) {
            return function (evt) {
              // Don't respond to keyboard in designer or if the list is not open
              if (inDesigner || !data.open) {
                return;
              } // Realign selectedIdx with the menu item that is currently in focus.
              // We need this because we do not track the `Tab` key activity!

              data.selectedIdx = data.links.index(document.activeElement); // Evaluate item-selection logic

              switch (evt.keyCode) {
                case KEY_CODES.HOME: {
                  if (!data.open) return;
                  data.selectedIdx = 0;
                  focusSelectedLink(data);
                  return evt.preventDefault();
                }

                case KEY_CODES.END: {
                  if (!data.open) return;
                  data.selectedIdx = data.links.length - 1;
                  focusSelectedLink(data);
                  return evt.preventDefault();
                }

                case KEY_CODES.ESCAPE: {
                  close(data);
                  data.toggle.focus();
                  return evt.stopPropagation();
                }

                case KEY_CODES.ARROW_RIGHT:
                case KEY_CODES.ARROW_DOWN: {
                  data.selectedIdx = Math.min(
                    data.links.length - 1,
                    data.selectedIdx + 1
                  );
                  focusSelectedLink(data);
                  return evt.preventDefault();
                }

                case KEY_CODES.ARROW_LEFT:
                case KEY_CODES.ARROW_UP: {
                  data.selectedIdx = Math.max(-1, data.selectedIdx - 1);
                  focusSelectedLink(data);
                  return evt.preventDefault();
                }
              }
            };
          }

          function focusSelectedLink(data) {
            if (data.links[data.selectedIdx]) {
              data.links[data.selectedIdx].focus();
            }
          }

          function makeToggleKeydownHandler(data) {
            // We want to close immediately
            // if interacting via keyboard
            var toggler = makeToggler(data, FORCE_CLOSE);
            return function (evt) {
              if (inDesigner) return; // If the menu is not open, we don't want
              // the up or Down arrows to do anything

              if (!data.open) {
                switch (evt.keyCode) {
                  case KEY_CODES.ARROW_UP:
                  case KEY_CODES.ARROW_DOWN: {
                    return evt.stopPropagation();
                  }
                }
              }

              switch (evt.keyCode) {
                case KEY_CODES.SPACE:
                case KEY_CODES.ENTER: {
                  toggler();
                  evt.stopPropagation();
                  return evt.preventDefault();
                }
              }
            };
          }

          function makeDropdownFocusOutHandler(data) {
            return debounce(function (evt) {
              var relatedTarget = evt.relatedTarget,
                target = evt.target;
              var menuEl = data.el[0];
              /**
               * Close menu
               * With focusout events, the `relatedTarget` is the element that will next receive focus.
               * @see: https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
               */

              var menuContainsFocus =
                menuEl.contains(relatedTarget) || menuEl.contains(target);

              if (!menuContainsFocus) {
                close(data);
              }

              return evt.stopPropagation();
            });
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 20 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals
  window,
  document,
  FormData,
  WEBFLOW_FORM_API_HOST,
  WEBFLOW_FORM_OLDIE_HOST
*/

      /* eslint-disable no-var */

      /**
       * Webflow: Forms
       */

      var _interopRequireDefault = __webpack_require__(2);

      var _slicedToArray2 = _interopRequireDefault(__webpack_require__(21));

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "forms",
        (module.exports = function ($, _) {
          var api = {};
          var $doc = $(document);
          var $forms;
          var loc = window.location;
          var retro = window.XDomainRequest && !window.atob;
          var namespace = ".w-form";
          var siteId;
          var emailField = /e(-)?mail/i;
          var emailValue = /^\S+@\S+$/;
          var alert = window.alert;
          var inApp = Webflow.env();
          var listening;
          var formUrl;
          var signFileUrl; // MailChimp domains: list-manage.com + mirrors

          var chimpRegex = /list-manage[1-9]?.com/i;

          var disconnected = _.debounce(function () {
            alert(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);

          api.ready =
            api.design =
            api.preview =
              function () {
                // Init forms
                init(); // Wire document events on published site only once

                if (!inApp && !listening) {
                  addListeners();
                }
              };

          function init() {
            siteId = $("html").attr("data-wf-site");
            formUrl = "https://webflow.com" + "/api/v1/form/" + siteId; // Work around same-protocol IE XDR limitation - without this IE9 and below forms won't submit

            if (retro && formUrl.indexOf("https://webflow.com") >= 0) {
              formUrl = formUrl.replace(
                "https://webflow.com",
                "http://formdata.webflow.com"
              );
            }

            signFileUrl = "".concat(formUrl, "/signFile");
            $forms = $(namespace + " form");

            if (!$forms.length) {
              return;
            }

            $forms.each(build);
          }

          function build(i, el) {
            // Store form state using namespace
            var $el = $(el);
            var data = $.data(el, namespace);

            if (!data) {
              data = $.data(el, namespace, {
                form: $el,
              });
            } // data.form

            reset(data);
            var wrap = $el.closest("div.w-form");
            data.done = wrap.find("> .w-form-done");
            data.fail = wrap.find("> .w-form-fail");
            data.fileUploads = wrap.find(".w-file-upload");
            data.fileUploads.each(function (j) {
              initFileUpload(j, data);
            }); // Accessiblity fixes

            var formName =
              data.form.attr("aria-label") ||
              data.form.attr("data-name") ||
              "Form";

            if (!data.done.attr("aria-label")) {
              data.form.attr("aria-label", formName);
            }

            data.done.attr("tabindex", "-1");
            data.done.attr("role", "region");

            if (!data.done.attr("aria-label")) {
              data.done.attr("aria-label", formName + " success");
            }

            data.fail.attr("tabindex", "-1");
            data.fail.attr("role", "region");

            if (!data.fail.attr("aria-label")) {
              data.fail.attr("aria-label", formName + " failure");
            }

            var action = (data.action = $el.attr("action"));
            data.handler = null;
            data.redirect = $el.attr("data-redirect"); // MailChimp form

            if (chimpRegex.test(action)) {
              data.handler = submitMailChimp;
              return;
            } // Custom form action

            if (action) {
              return;
            } // Webflow forms for hosting accounts

            if (siteId) {
              data.handler =
                typeof hostedSubmitWebflow === "function"
                  ? hostedSubmitWebflow
                  : exportedSubmitWebflow;
              return;
            } // Alert for disconnected Webflow forms

            disconnected();
          }

          function addListeners() {
            listening = true; // Handle form submission for Webflow forms

            $doc.on("submit", namespace + " form", function (evt) {
              var data = $.data(this, namespace);

              if (data.handler) {
                data.evt = evt;
                data.handler(data);
              }
            }); // handle checked ui for custom checkbox and radio button

            var CHECKBOX_CLASS_NAME = ".w-checkbox-input";
            var RADIO_INPUT_CLASS_NAME = ".w-radio-input";
            var CHECKED_CLASS = "w--redirected-checked";
            var FOCUSED_CLASS = "w--redirected-focus";
            var FOCUSED_VISIBLE_CLASS = "w--redirected-focus-visible";
            var focusVisibleSelectors =
              ":focus-visible, [data-wf-focus-visible]";
            var CUSTOM_CONTROLS = [
              ["checkbox", CHECKBOX_CLASS_NAME],
              ["radio", RADIO_INPUT_CLASS_NAME],
            ];
            $doc.on(
              "change",
              namespace +
                ' form input[type="checkbox"]:not(' +
                CHECKBOX_CLASS_NAME +
                ")",
              function (evt) {
                $(evt.target)
                  .siblings(CHECKBOX_CLASS_NAME)
                  .toggleClass(CHECKED_CLASS);
              }
            );
            $doc.on(
              "change",
              namespace + ' form input[type="radio"]',
              function (evt) {
                $(
                  'input[name="'
                    .concat(evt.target.name, '"]:not(')
                    .concat(CHECKBOX_CLASS_NAME, ")")
                ).map(function (i, el) {
                  return $(el)
                    .siblings(RADIO_INPUT_CLASS_NAME)
                    .removeClass(CHECKED_CLASS);
                });
                var $target = $(evt.target);

                if (!$target.hasClass("w-radio-input")) {
                  $target
                    .siblings(RADIO_INPUT_CLASS_NAME)
                    .addClass(CHECKED_CLASS);
                }
              }
            );
            CUSTOM_CONTROLS.forEach(function (_ref) {
              var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                controlType = _ref2[0],
                customControlClassName = _ref2[1];

              $doc.on(
                "focus",
                namespace +
                  ' form input[type="'.concat(controlType, '"]:not(') +
                  customControlClassName +
                  ")",
                function (evt) {
                  $(evt.target)
                    .siblings(customControlClassName)
                    .addClass(FOCUSED_CLASS);
                  $(evt.target)
                    .filter(focusVisibleSelectors)
                    .siblings(customControlClassName)
                    .addClass(FOCUSED_VISIBLE_CLASS);
                }
              );
              $doc.on(
                "blur",
                namespace +
                  ' form input[type="'.concat(controlType, '"]:not(') +
                  customControlClassName +
                  ")",
                function (evt) {
                  $(evt.target)
                    .siblings(customControlClassName)
                    .removeClass(
                      ""
                        .concat(FOCUSED_CLASS, " ")
                        .concat(FOCUSED_VISIBLE_CLASS)
                    );
                }
              );
            });
          } // Reset data common to all submit handlers

          function reset(data) {
            var btn = (data.btn = data.form.find(':input[type="submit"]'));
            data.wait = data.btn.attr("data-wait") || null;
            data.success = false;
            btn.prop("disabled", false);
            data.label && btn.val(data.label);
          } // Disable submit button

          function disableBtn(data) {
            var btn = data.btn;
            var wait = data.wait;
            btn.prop("disabled", true); // Show wait text and store previous label

            if (wait) {
              data.label = btn.val();
              btn.val(wait);
            }
          } // Find form fields, validate, and set value pairs

          function findFields(form, result) {
            var status = null;
            result = result || {}; // The ":input" selector is a jQuery shortcut to select all inputs, selects, textareas

            form
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (i, el) {
                var field = $(el);
                var type = field.attr("type");
                var name =
                  field.attr("data-name") ||
                  field.attr("name") ||
                  "Field " + (i + 1);
                var value = field.val();

                if (type === "checkbox") {
                  value = field.is(":checked");
                } else if (type === "radio") {
                  // Radio group value already processed
                  if (
                    result[name] === null ||
                    typeof result[name] === "string"
                  ) {
                    return;
                  }

                  value =
                    form
                      .find('input[name="' + field.attr("name") + '"]:checked')
                      .val() || null;
                }

                if (typeof value === "string") {
                  value = $.trim(value);
                }

                result[name] = value;
                status = status || getStatus(field, type, name, value);
              });
            return status;
          }

          function findFileUploads(form) {
            var result = {};
            form.find(':input[type="file"]').each(function (i, el) {
              var field = $(el);
              var name =
                field.attr("data-name") ||
                field.attr("name") ||
                "File " + (i + 1);
              var value = field.attr("data-value");

              if (typeof value === "string") {
                value = $.trim(value);
              }

              result[name] = value;
            });
            return result;
          }

          var trackingCookieNameMap = {
            _mkto_trk: "marketo", // __hstc: 'hubspot',
          };

          function collectEnterpriseTrackingCookies() {
            var cookies = document.cookie
              .split("; ")
              .reduce(function (acc, cookie) {
                var splitCookie = cookie.split("=");
                var name = splitCookie[0];

                if (name in trackingCookieNameMap) {
                  var mappedName = trackingCookieNameMap[name];
                  var value = splitCookie.slice(1).join("=");
                  acc[mappedName] = value;
                }

                return acc;
              }, {});
            return cookies;
          }

          function getStatus(field, type, name, value) {
            var status = null;

            if (type === "password") {
              status = "Passwords cannot be submitted.";
            } else if (field.attr("required")) {
              if (!value) {
                status = "Please fill out the required field: " + name;
              } else if (emailField.test(field.attr("type"))) {
                if (!emailValue.test(value)) {
                  status = "Please enter a valid email address for: " + name;
                }
              }
            } else if (name === "g-recaptcha-response" && !value) {
              status = "Please confirm youâ€™re not a robot.";
            }

            return status;
          }

          function exportedSubmitWebflow(data) {
            preventDefault(data);
            afterSubmit(data);
          }
          /* WEBFLOW_HOSTED_BLOCK:START */
          // Submit form to Webflow

          function hostedSubmitWebflow(data) {
            reset(data);
            var form = data.form;
            var payload = {
              name:
                form.attr("data-name") || form.attr("name") || "Untitled Form",
              source: loc.href,
              test: Webflow.env(),
              fields: {},
              fileUploads: {},
              dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
                form.html()
              ),
              trackingCookies: collectEnterpriseTrackingCookies(),
            };
            var wfFlow = form.attr("data-wf-flow");

            if (wfFlow) {
              payload.wfFlow = wfFlow;
            }

            preventDefault(data); // Find & populate all fields

            var status = findFields(form, payload.fields);

            if (status) {
              return alert(status);
            }

            payload.fileUploads = findFileUploads(form); // Disable submit button

            disableBtn(data); // Read site ID
            // NOTE: If this site is exported, the HTML tag must retain the data-wf-site attribute for forms to work

            if (!siteId) {
              afterSubmit(data);
              return;
            }

            $.ajax({
              url: formUrl,
              type: "POST",
              data: payload,
              dataType: "json",
              crossDomain: true,
            })
              .done(function (response) {
                if (response && response.code === 200) {
                  data.success = true;
                }

                afterSubmit(data);
              })
              .fail(function () {
                afterSubmit(data);
              });
          }
          /* WEBFLOW_HOSTED_BLOCK:END */
          // Submit form to MailChimp

          function submitMailChimp(data) {
            reset(data);
            var form = data.form;
            var payload = {}; // Skip Ajax submission if http/s mismatch, fallback to POST instead

            if (/^https/.test(loc.href) && !/^https/.test(data.action)) {
              form.attr("method", "post");
              return;
            }

            preventDefault(data); // Find & populate all fields

            var status = findFields(form, payload);

            if (status) {
              return alert(status);
            } // Disable submit button

            disableBtn(data); // Use special format for MailChimp params

            var fullName;

            _.each(payload, function (value, key) {
              if (emailField.test(key)) {
                payload.EMAIL = value;
              }

              if (/^((full[ _-]?)?name)$/i.test(key)) {
                fullName = value;
              }

              if (/^(first[ _-]?name)$/i.test(key)) {
                payload.FNAME = value;
              }

              if (/^(last[ _-]?name)$/i.test(key)) {
                payload.LNAME = value;
              }
            });

            if (fullName && !payload.FNAME) {
              fullName = fullName.split(" ");
              payload.FNAME = fullName[0];
              payload.LNAME = payload.LNAME || fullName[1];
            } // Use the (undocumented) MailChimp jsonp api

            var url = data.action.replace("/post?", "/post-json?") + "&c=?"; // Add special param to prevent bot signups

            var userId = url.indexOf("u=") + 2;
            userId = url.substring(userId, url.indexOf("&", userId));
            var listId = url.indexOf("id=") + 3;
            listId = url.substring(listId, url.indexOf("&", listId));
            payload["b_" + userId + "_" + listId] = "";
            $.ajax({
              url: url,
              data: payload,
              dataType: "jsonp",
            })
              .done(function (resp) {
                data.success =
                  resp.result === "success" || /already/.test(resp.msg);

                if (!data.success) {
                  console.info("MailChimp error: " + resp.msg);
                }

                afterSubmit(data);
              })
              .fail(function () {
                afterSubmit(data);
              });
          } // Common callback which runs after all Ajax submissions

          function afterSubmit(data) {
            var form = data.form;
            var redirect = data.redirect;
            var success = data.success; // Redirect to a success url if defined

            if (success && redirect) {
              Webflow.location(redirect);
              return;
            } // Show or hide status divs

            data.done.toggle(success);
            data.fail.toggle(!success);

            if (success) {
              data.done.focus();
            } else {
              data.fail.focus();
            } // Hide form on success

            form.toggle(!success); // Reset data and enable submit button

            reset(data);
          }

          function preventDefault(data) {
            data.evt && data.evt.preventDefault();
            data.evt = null;
          }

          function initFileUpload(i, form) {
            if (!form.fileUploads || !form.fileUploads[i]) {
              return;
            }

            var file;
            var $el = $(form.fileUploads[i]);
            var $defaultWrap = $el.find("> .w-file-upload-default");
            var $uploadingWrap = $el.find("> .w-file-upload-uploading");
            var $successWrap = $el.find("> .w-file-upload-success");
            var $errorWrap = $el.find("> .w-file-upload-error");
            var $input = $defaultWrap.find(".w-file-upload-input");
            var $label = $defaultWrap.find(".w-file-upload-label");
            var $labelChildren = $label.children();
            var $errorMsgEl = $errorWrap.find(".w-file-upload-error-msg");
            var $fileEl = $successWrap.find(".w-file-upload-file");
            var $removeEl = $successWrap.find(".w-file-remove-link");
            var $fileNameEl = $fileEl.find(".w-file-upload-file-name");
            var sizeErrMsg = $errorMsgEl.attr("data-w-size-error");
            var typeErrMsg = $errorMsgEl.attr("data-w-type-error");
            var genericErrMsg = $errorMsgEl.attr("data-w-generic-error"); // Accessiblity fixes
            // The file upload Input is not stylable by the designer, so we are
            // going to pretend the Label is the input. Â¯\_(ãƒ„)_/Â¯

            if (!inApp) {
              $label.on("click keydown", function (e) {
                if (e.type === "keydown" && e.which !== 13 && e.which !== 32) {
                  return;
                }

                e.preventDefault();
                $input.click();
              });
            } // Both of these are added through CSS

            $label.find(".w-icon-file-upload-icon").attr("aria-hidden", "true");
            $removeEl
              .find(".w-icon-file-upload-remove")
              .attr("aria-hidden", "true");

            if (!inApp) {
              $removeEl.on("click keydown", function (e) {
                if (e.type === "keydown") {
                  if (e.which !== 13 && e.which !== 32) {
                    return;
                  }

                  e.preventDefault();
                }

                $input.removeAttr("data-value");
                $input.val("");
                $fileNameEl.html("");
                $defaultWrap.toggle(true);
                $successWrap.toggle(false);
                $label.focus();
              });
              $input.on("change", function (e) {
                file = e.target && e.target.files && e.target.files[0];

                if (!file) {
                  return;
                } // Show uploading

                $defaultWrap.toggle(false);
                $errorWrap.toggle(false);
                $uploadingWrap.toggle(true);
                $uploadingWrap.focus(); // Set filename

                $fileNameEl.text(file.name); // Disable submit button

                if (!isUploading()) {
                  disableBtn(form);
                }

                form.fileUploads[i].uploading = true;
                signFile(file, afterSign);
              }); // Setting input width 1px and height equal label
              // This is so the browser required error will show up

              var height = $label.outerHeight();
              $input.height(height);
              $input.width(1);
            } else {
              $input.on("click", function (e) {
                e.preventDefault();
              });
              $label.on("click", function (e) {
                e.preventDefault();
              });
              $labelChildren.on("click", function (e) {
                e.preventDefault();
              });
            }

            function parseError(err) {
              var errorMsg = err.responseJSON && err.responseJSON.msg;
              var userError = genericErrMsg;

              if (
                typeof errorMsg === "string" &&
                errorMsg.indexOf("InvalidFileTypeError") === 0
              ) {
                userError = typeErrMsg;
              } else if (
                typeof errorMsg === "string" &&
                errorMsg.indexOf("MaxFileSizeError") === 0
              ) {
                userError = sizeErrMsg;
              }

              $errorMsgEl.text(userError);
              $input.removeAttr("data-value");
              $input.val("");
              $uploadingWrap.toggle(false);
              $defaultWrap.toggle(true);
              $errorWrap.toggle(true);
              $errorWrap.focus();
              form.fileUploads[i].uploading = false;

              if (!isUploading()) {
                reset(form);
              }
            }

            function afterSign(err, data) {
              if (err) {
                return parseError(err);
              }

              var fileName = data.fileName;
              var postData = data.postData;
              var fileId = data.fileId;
              var s3Url = data.s3Url;
              $input.attr("data-value", fileId);
              uploadS3(s3Url, postData, file, fileName, afterUpload);
            }

            function afterUpload(err) {
              if (err) {
                return parseError(err);
              } // Show success

              $uploadingWrap.toggle(false);
              $successWrap.css("display", "inline-block");
              $successWrap.focus();
              form.fileUploads[i].uploading = false;

              if (!isUploading()) {
                reset(form);
              }
            }

            function isUploading() {
              var uploads =
                (form.fileUploads && form.fileUploads.toArray()) || [];
              return uploads.some(function (value) {
                return value.uploading;
              });
            }
          }

          function signFile(file, cb) {
            var payload = new URLSearchParams({
              name: file.name,
              size: file.size,
            });
            $.ajax({
              type: "GET",
              url: "".concat(signFileUrl, "?").concat(payload),
              crossDomain: true,
            })
              .done(function (data) {
                cb(null, data);
              })
              .fail(function (err) {
                cb(err);
              });
          }

          function uploadS3(url, data, file, fileName, cb) {
            var formData = new FormData();

            for (var k in data) {
              formData.append(k, data[k]);
            }

            formData.append("file", file, fileName);
            $.ajax({
              type: "POST",
              url: url,
              data: formData,
              processData: false,
              contentType: false,
            })
              .done(function () {
                cb(null);
              })
              .fail(function (err) {
                cb(err);
              });
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 21 */
    /***/ function (module, exports, __webpack_require__) {
      var arrayWithHoles = __webpack_require__(22);

      var iterableToArrayLimit = __webpack_require__(23);

      var nonIterableRest = __webpack_require__(24);

      function _slicedToArray(arr, i) {
        return (
          arrayWithHoles(arr) ||
          iterableToArrayLimit(arr, i) ||
          nonIterableRest()
        );
      }

      module.exports = _slicedToArray;

      /***/
    },
    /* 22 */
    /***/ function (module, exports) {
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      module.exports = _arrayWithHoles;

      /***/
    },
    /* 23 */
    /***/ function (module, exports) {
      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (
            var _i = arr[Symbol.iterator](), _s;
            !(_n = (_s = _i.next()).done);
            _n = true
          ) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      module.exports = _iterableToArrayLimit;

      /***/
    },
    /* 24 */
    /***/ function (module, exports) {
      function _nonIterableRest() {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      }

      module.exports = _nonIterableRest;

      /***/
    },
    /* 25 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document, jQuery */

      /* eslint-disable no-var */

      /**
       * Webflow: Lightbox component
       */

      var Webflow = __webpack_require__(0);

      var CONDITION_INVISIBLE_CLASS = "w-condition-invisible";
      var CONDVIS_SELECTOR = "." + CONDITION_INVISIBLE_CLASS;

      function withoutConditionallyHidden(items) {
        return items.filter(function (item) {
          return !isConditionallyHidden(item);
        });
      }

      function isConditionallyHidden(item) {
        return Boolean(item.$el && item.$el.closest(CONDVIS_SELECTOR).length);
      }

      function getPreviousVisibleIndex(start, items) {
        for (var i = start; i >= 0; i--) {
          if (!isConditionallyHidden(items[i])) {
            return i;
          }
        }

        return -1;
      }

      function getNextVisibleIndex(start, items) {
        for (var i = start; i <= items.length - 1; i++) {
          if (!isConditionallyHidden(items[i])) {
            return i;
          }
        }

        return -1;
      }

      function shouldSetArrowLeftInactive(currentIndex, items) {
        return getPreviousVisibleIndex(currentIndex - 1, items) === -1;
      }

      function shouldSetArrowRightInactive(currentIndex, items) {
        return getNextVisibleIndex(currentIndex + 1, items) === -1;
      }

      function setAriaLabelIfEmpty($element, labelText) {
        if (!$element.attr("aria-label")) {
          $element.attr("aria-label", labelText);
        }
      }

      function createLightbox(window, document, $, container) {
        var tram = $.tram;
        var isArray = Array.isArray;
        var namespace = "w-lightbox";
        var prefix = namespace + "-";
        var prefixRegex = /(^|\s+)/g; // Array of objects describing items to be displayed.

        var items = []; // Index of the currently displayed item.

        var currentIndex; // Object holding references to jQuery wrapped nodes.

        var $refs; // Instance of Spinner

        var spinner; // Tracks data on element visiblity modified when lightbox opens

        var resetVisibilityState = [];

        function lightbox(thing, index) {
          items = isArray(thing) ? thing : [thing];

          if (!$refs) {
            lightbox.build();
          }

          if (withoutConditionallyHidden(items).length > 1) {
            $refs.items = $refs.empty;
            items.forEach(function (item, idx) {
              var $thumbnail = dom("thumbnail");
              var $item = dom("item")
                .prop("tabIndex", 0)
                .attr("aria-controls", "w-lightbox-view")
                .attr("role", "tab")
                .append($thumbnail);
              setAriaLabelIfEmpty(
                $item,
                "show item ".concat(idx + 1, " of ").concat(items.length)
              );

              if (isConditionallyHidden(item)) {
                $item.addClass(CONDITION_INVISIBLE_CLASS);
              }

              $refs.items = $refs.items.add($item);
              loadImage(item.thumbnailUrl || item.url, function ($image) {
                if ($image.prop("width") > $image.prop("height")) {
                  addClass($image, "wide");
                } else {
                  addClass($image, "tall");
                }

                $thumbnail.append(addClass($image, "thumbnail-image"));
              });
            });
            $refs.strip.empty().append($refs.items);
            addClass($refs.content, "group");
          }

          tram(
            // Focus the lightbox to receive keyboard events.
            removeClass($refs.lightbox, "hide").trigger("focus")
          )
            .add("opacity .3s")
            .start({
              opacity: 1,
            }); // Prevent document from scrolling while lightbox is active.

          addClass($refs.html, "noscroll");
          return lightbox.show(index || 0);
        }
        /**
         * Creates the DOM structure required by the lightbox.
         */

        lightbox.build = function () {
          // In case `build` is called more than once.
          lightbox.destroy();
          $refs = {
            html: $(document.documentElement),
            // Empty jQuery object can be used to build new ones using `.add`.
            empty: $(),
          };
          $refs.arrowLeft = dom("control left inactive")
            .attr("role", "button")
            .attr("aria-hidden", true)
            .attr("aria-controls", "w-lightbox-view");
          $refs.arrowRight = dom("control right inactive")
            .attr("role", "button")
            .attr("aria-hidden", true)
            .attr("aria-controls", "w-lightbox-view");
          $refs.close = dom("control close").attr("role", "button"); // Only set `aria-label` values if not already present

          setAriaLabelIfEmpty($refs.arrowLeft, "previous image");
          setAriaLabelIfEmpty($refs.arrowRight, "next image");
          setAriaLabelIfEmpty($refs.close, "close lightbox");
          $refs.spinner = dom("spinner")
            .attr("role", "progressbar")
            .attr("aria-live", "polite")
            .attr("aria-hidden", false)
            .attr("aria-busy", true)
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image");
          $refs.strip = dom("strip").attr("role", "tablist");
          spinner = new Spinner($refs.spinner, prefixed("hide"));
          $refs.content = dom("content").append(
            $refs.spinner,
            $refs.arrowLeft,
            $refs.arrowRight,
            $refs.close
          );
          $refs.container = dom("container").append($refs.content, $refs.strip);
          $refs.lightbox = dom("backdrop hide").append($refs.container); // We are delegating events for performance reasons and also
          // to not have to reattach handlers when images change.

          $refs.strip.on("click", selector("item"), itemTapHandler);
          $refs.content
            .on("swipe", swipeHandler)
            .on("click", selector("left"), handlerPrev)
            .on("click", selector("right"), handlerNext)
            .on("click", selector("close"), handlerHide)
            .on("click", selector("image, caption"), handlerNext);
          $refs.container
            .on("click", selector("view"), handlerHide) // Prevent images from being dragged around.
            .on("dragstart", selector("img"), preventDefault);
          $refs.lightbox
            .on("keydown", keyHandler) // IE loses focus to inner nodes without letting us know.
            .on("focusin", focusThis);
          $(container).append($refs.lightbox);
          return lightbox;
        };
        /**
         * Dispose of DOM nodes created by the lightbox.
         */

        lightbox.destroy = function () {
          if (!$refs) {
            return;
          } // Event handlers are also removed.

          removeClass($refs.html, "noscroll");
          $refs.lightbox.remove();
          $refs = undefined;
        };
        /**
         * Show a specific item.
         */

        lightbox.show = function (index) {
          // Bail if we are already showing this item.
          if (index === currentIndex) {
            return;
          }

          var item = items[index];

          if (!item) {
            return lightbox.hide();
          }

          if (isConditionallyHidden(item)) {
            if (index < currentIndex) {
              var previousVisibleIndex = getPreviousVisibleIndex(
                index - 1,
                items
              );
              index = previousVisibleIndex > -1 ? previousVisibleIndex : index;
            } else {
              var nextVisibleIndex = getNextVisibleIndex(index + 1, items);
              index = nextVisibleIndex > -1 ? nextVisibleIndex : index;
            }

            item = items[index];
          }

          var previousIndex = currentIndex;
          currentIndex = index;
          $refs.spinner
            .attr("aria-hidden", false)
            .attr("aria-busy", true)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image");
          spinner.show(); // For videos, load an empty SVG with the video dimensions to preserve
          // the videoâ€™s aspect ratio while being responsive.

          var url =
            (item.html && svgDataUri(item.width, item.height)) || item.url;
          loadImage(url, function ($image) {
            // Make sure this is the last item requested to be shown since
            // images can finish loading in a different order than they were
            // requested in.
            if (index !== currentIndex) {
              return;
            }

            var $figure = dom("figure", "figure").append(
              addClass($image, "image")
            );
            var $frame = dom("frame").append($figure);
            var $newView = dom("view")
              .prop("tabIndex", 0)
              .attr("id", "w-lightbox-view")
              .append($frame);
            var $html;
            var isIframe;

            if (item.html) {
              $html = $(item.html);
              isIframe = $html.is("iframe");

              if (isIframe) {
                $html.on("load", transitionToNewView);
              }

              $figure.append(addClass($html, "embed"));
            }

            if (item.caption) {
              $figure.append(dom("caption", "figcaption").text(item.caption));
            }

            $refs.spinner.before($newView);

            if (!isIframe) {
              transitionToNewView();
            }

            function transitionToNewView() {
              $refs.spinner
                .attr("aria-hidden", true)
                .attr("aria-busy", false)
                .attr("aria-valuenow", 100)
                .attr("aria-valuetext", "Loaded image");
              spinner.hide();

              if (index !== currentIndex) {
                $newView.remove();
                return;
              }

              var shouldHideLeftArrow = shouldSetArrowLeftInactive(
                index,
                items
              );
              toggleClass($refs.arrowLeft, "inactive", shouldHideLeftArrow);
              toggleHidden($refs.arrowLeft, shouldHideLeftArrow);

              if (shouldHideLeftArrow && $refs.arrowLeft.is(":focus")) {
                // Refocus on right arrow as left arrow is hidden
                $refs.arrowRight.focus();
              }

              var shouldHideRightArrow = shouldSetArrowRightInactive(
                index,
                items
              );
              toggleClass($refs.arrowRight, "inactive", shouldHideRightArrow);
              toggleHidden($refs.arrowRight, shouldHideRightArrow);

              if (shouldHideRightArrow && $refs.arrowRight.is(":focus")) {
                // Refocus on left arrow as right arrow is hidden
                $refs.arrowLeft.focus();
              }

              if ($refs.view) {
                tram($refs.view)
                  .add("opacity .3s")
                  .start({
                    opacity: 0,
                  })
                  .then(remover($refs.view));
                tram($newView)
                  .add("opacity .3s")
                  .add("transform .3s")
                  .set({
                    x: index > previousIndex ? "80px" : "-80px",
                  })
                  .start({
                    opacity: 1,
                    x: 0,
                  });
              } else {
                $newView.css("opacity", 1);
              }

              $refs.view = $newView;
              $refs.view.prop("tabIndex", 0);

              if ($refs.items) {
                removeClass($refs.items, "active");
                $refs.items.removeAttr("aria-selected"); // Mark proper thumbnail as active

                var $activeThumb = $refs.items.eq(index);
                addClass($activeThumb, "active");
                $activeThumb.attr("aria-selected", true); // Scroll into view

                maybeScroll($activeThumb);
              }
            }
          });
          $refs.close.prop("tabIndex", 0); // Track the focused item on page prior to lightbox opening,
          // so we can return focus on hide

          $(":focus").addClass("active-lightbox"); // Build is only called once per site (across multiple lightboxes),
          // while the show function is called when opening lightbox but also
          // when changing image.
          // So checking resetVisibilityState seems to be one approach to
          // trigger something only when the lightbox is opened

          if (resetVisibilityState.length === 0) {
            // Take all elements on the page out of the accessibility flow by marking
            // them hidden and preventing tab index while lightbox is open.
            $("body")
              .children()
              .each(function () {
                // We don't include the lightbox wrapper or script tags
                if (
                  $(this).hasClass("w-lightbox-backdrop") ||
                  $(this).is("script")
                ) {
                  return;
                } // Store the elements previous visiblity state

                resetVisibilityState.push({
                  node: $(this),
                  hidden: $(this).attr("aria-hidden"),
                  tabIndex: $(this).attr("tabIndex"),
                }); // Hide element from the accessiblity tree

                $(this).attr("aria-hidden", true).attr("tabIndex", -1);
              }); // Start focus on the close icon

            $refs.close.focus();
          }

          return lightbox;
        };
        /**
         * Hides the lightbox.
         */

        lightbox.hide = function () {
          tram($refs.lightbox)
            .add("opacity .3s")
            .start({
              opacity: 0,
            })
            .then(hideLightbox);
          return lightbox;
        };

        lightbox.prev = function () {
          var previousVisibleIndex = getPreviousVisibleIndex(
            currentIndex - 1,
            items
          );

          if (previousVisibleIndex > -1) {
            lightbox.show(previousVisibleIndex);
          }
        };

        lightbox.next = function () {
          var nextVisibleIndex = getNextVisibleIndex(currentIndex + 1, items);

          if (nextVisibleIndex > -1) {
            lightbox.show(nextVisibleIndex);
          }
        };

        function createHandler(action) {
          return function (event) {
            // We only care about events triggered directly on the bound selectors.
            if (this !== event.target) {
              return;
            }

            event.stopPropagation();
            event.preventDefault();
            action();
          };
        }

        var handlerPrev = createHandler(lightbox.prev);
        var handlerNext = createHandler(lightbox.next);
        var handlerHide = createHandler(lightbox.hide);

        var itemTapHandler = function itemTapHandler(event) {
          var index = $(this).index();
          event.preventDefault();
          lightbox.show(index);
        };

        var swipeHandler = function swipeHandler(event, data) {
          // Prevent scrolling.
          event.preventDefault();

          if (data.direction === "left") {
            lightbox.next();
          } else if (data.direction === "right") {
            lightbox.prev();
          }
        };

        var focusThis = function focusThis() {
          this.focus();
        };

        function preventDefault(event) {
          event.preventDefault();
        }

        function keyHandler(event) {
          var keyCode = event.keyCode; // [esc] or ([enter] or [space] while close button is focused)

          if (keyCode === 27 || checkForFocusTrigger(keyCode, "close")) {
            lightbox.hide(); // [â—€] or ([enter] or [space] while left button is focused)
          } else if (keyCode === 37 || checkForFocusTrigger(keyCode, "left")) {
            lightbox.prev(); // [â–¶] or ([enter] or [space] while right button is focused)
          } else if (keyCode === 39 || checkForFocusTrigger(keyCode, "right")) {
            lightbox.next(); // [enter] or [space] while a thumbnail is focused
          } else if (checkForFocusTrigger(keyCode, "item")) {
            $(":focus").click();
          }
        }
        /**
         * checkForFocusTrigger will check if the current focused element includes the matching class
         * and that the user has pressed either enter or space to trigger an action.
         * @param  {number} The numerical keyCode from the `keydown` event
         * @param  {string} The unique part of the `className` from the element we are checking. E.g. `close` will be prefixed into `w-lightbox-close`
         * @return {boolean}
         */

        function checkForFocusTrigger(keyCode, classMatch) {
          if (keyCode !== 13 && keyCode !== 32) {
            return false;
          }

          var currentElementClasses = $(":focus").attr("class");
          var classToFind = prefixed(classMatch).trim();
          return currentElementClasses.includes(classToFind);
        }

        function hideLightbox() {
          // If the lightbox hasn't been destroyed already
          if ($refs) {
            // Reset strip scroll, otherwise next lightbox opens scrolled to last position
            $refs.strip.scrollLeft(0).empty();
            removeClass($refs.html, "noscroll");
            addClass($refs.lightbox, "hide");
            $refs.view && $refs.view.remove(); // Reset some stuff

            removeClass($refs.content, "group");
            addClass($refs.arrowLeft, "inactive");
            addClass($refs.arrowRight, "inactive");
            currentIndex = $refs.view = undefined; // Bring the page elements back into the accessiblity tree

            resetVisibilityState.forEach(function (visibilityState) {
              var node = visibilityState.node;

              if (!node) {
                return;
              }

              if (visibilityState.hidden) {
                node.attr("aria-hidden", visibilityState.hidden);
              } else {
                node.removeAttr("aria-hidden");
              }

              if (visibilityState.tabIndex) {
                node.attr("tabIndex", visibilityState.tabIndex);
              } else {
                node.removeAttr("tabIndex");
              }
            }); // Clear out the reset visibility state

            resetVisibilityState = []; // Re-focus on the element that triggered the lightbox

            $(".active-lightbox").removeClass("active-lightbox").focus();
          }
        }

        function loadImage(url, callback) {
          var $image = dom("img", "img");
          $image.one("load", function () {
            callback($image);
          }); // Start loading image.

          $image.attr("src", url);
          return $image;
        }

        function remover($element) {
          return function () {
            $element.remove();
          };
        }

        function maybeScroll($item) {
          var itemElement = $item.get(0);
          var stripElement = $refs.strip.get(0);
          var itemLeft = itemElement.offsetLeft;
          var itemWidth = itemElement.clientWidth;
          var stripScrollLeft = stripElement.scrollLeft;
          var stripWidth = stripElement.clientWidth;
          var stripScrollLeftMax = stripElement.scrollWidth - stripWidth;
          var newScrollLeft;

          if (itemLeft < stripScrollLeft) {
            newScrollLeft = Math.max(0, itemLeft + itemWidth - stripWidth);
          } else if (itemLeft + itemWidth > stripWidth + stripScrollLeft) {
            newScrollLeft = Math.min(itemLeft, stripScrollLeftMax);
          }

          if (newScrollLeft != null) {
            tram($refs.strip).add("scroll-left 500ms").start({
              "scroll-left": newScrollLeft,
            });
          }
        }
        /**
         * Spinner
         */

        function Spinner($spinner, className, delay) {
          this.$element = $spinner;
          this.className = className;
          this.delay = delay || 200;
          this.hide();
        }

        Spinner.prototype.show = function () {
          // eslint-disable-next-line no-shadow
          var spinner = this; // Bail if we are already showing the spinner.

          if (spinner.timeoutId) {
            return;
          }

          spinner.timeoutId = setTimeout(function () {
            spinner.$element.removeClass(spinner.className); // eslint-disable-next-line webflow/no-delete

            delete spinner.timeoutId;
          }, spinner.delay);
        };

        Spinner.prototype.hide = function () {
          // eslint-disable-next-line no-shadow
          var spinner = this;

          if (spinner.timeoutId) {
            clearTimeout(spinner.timeoutId); // eslint-disable-next-line webflow/no-delete

            delete spinner.timeoutId;
            return;
          }

          spinner.$element.addClass(spinner.className);
        };

        function prefixed(string, isSelector) {
          return string.replace(
            prefixRegex,
            (isSelector ? " ." : " ") + prefix
          );
        }

        function selector(string) {
          return prefixed(string, true);
        }
        /**
         * jQuery.addClass with auto-prefixing
         * @param  {jQuery} Element to add class to
         * @param  {string} Class name that will be prefixed and added to element
         * @return {jQuery}
         */

        function addClass($element, className) {
          return $element.addClass(prefixed(className));
        }
        /**
         * jQuery.removeClass with auto-prefixing
         * @param  {jQuery} Element to remove class from
         * @param  {string} Class name that will be prefixed and removed from element
         * @return {jQuery}
         */

        function removeClass($element, className) {
          return $element.removeClass(prefixed(className));
        }
        /**
         * jQuery.toggleClass with auto-prefixing
         * @param  {jQuery}  Element where class will be toggled
         * @param  {string}  Class name that will be prefixed and toggled
         * @param  {boolean} Optional boolean that determines if class will be added or removed
         * @return {jQuery}
         */

        function toggleClass($element, className, shouldAdd) {
          return $element.toggleClass(prefixed(className), shouldAdd);
        }
        /**
         * jQuery.toggleHidden
         * @param  {jQuery}  Element where attribute will be set
         * @param  {boolean} Boolean that determines if aria-hidden will be true or false
         * @return {jQuery}
         */

        function toggleHidden($element, isHidden) {
          return $element
            .attr("aria-hidden", isHidden)
            .attr("tabIndex", isHidden ? -1 : 0);
        }
        /**
         * Create a new DOM element wrapped in a jQuery object,
         * decorated with our custom methods.
         * @param  {string} className
         * @param  {string} [tag]
         * @return {jQuery}
         */

        function dom(className, tag) {
          return addClass($(document.createElement(tag || "div")), className);
        }

        function svgDataUri(width, height) {
          var svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="' +
            width +
            '" height="' +
            height +
            '"/>';
          return "data:image/svg+xml;charset=utf-8," + encodeURI(svg);
        } // Compute some dimensions manually for iOS < 8, because of buggy support for VH.
        // Also, Android built-in browser does not support viewport units.

        (function () {
          var ua = window.navigator.userAgent;
          var iOSRegex = /(iPhone|iPad|iPod);[^OS]*OS (\d)/;
          var iOSMatches = ua.match(iOSRegex);
          var android =
            ua.indexOf("Android ") > -1 && ua.indexOf("Chrome") === -1;

          if (!android && (!iOSMatches || iOSMatches[2] > 7)) {
            return;
          }

          var styleNode = document.createElement("style");
          document.head.appendChild(styleNode);
          window.addEventListener("resize", refresh, true);

          function refresh() {
            var vh = window.innerHeight;
            var vw = window.innerWidth;
            var content =
              ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {" +
              "height:" +
              vh +
              "px" +
              "}" +
              ".w-lightbox-view {" +
              "width:" +
              vw +
              "px" +
              "}" +
              ".w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {" +
              "height:" +
              0.86 * vh +
              "px" +
              "}" +
              ".w-lightbox-image {" +
              "max-width:" +
              vw +
              "px;" +
              "max-height:" +
              vh +
              "px" +
              "}" +
              ".w-lightbox-group .w-lightbox-image {" +
              "max-height:" +
              0.86 * vh +
              "px" +
              "}" +
              ".w-lightbox-strip {" +
              "padding: 0 " +
              0.01 * vh +
              "px" +
              "}" +
              ".w-lightbox-item {" +
              "width:" +
              0.1 * vh +
              "px;" +
              "padding:" +
              0.02 * vh +
              "px " +
              0.01 * vh +
              "px" +
              "}" +
              ".w-lightbox-thumbnail {" +
              "height:" +
              0.1 * vh +
              "px" +
              "}" +
              "@media (min-width: 768px) {" +
              ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {" +
              "height:" +
              0.96 * vh +
              "px" +
              "}" +
              ".w-lightbox-content {" +
              "margin-top:" +
              0.02 * vh +
              "px" +
              "}" +
              ".w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {" +
              "height:" +
              0.84 * vh +
              "px" +
              "}" +
              ".w-lightbox-image {" +
              "max-width:" +
              0.96 * vw +
              "px;" +
              "max-height:" +
              0.96 * vh +
              "px" +
              "}" +
              ".w-lightbox-group .w-lightbox-image {" +
              "max-width:" +
              0.823 * vw +
              "px;" +
              "max-height:" +
              0.84 * vh +
              "px" +
              "}" +
              "}";
            styleNode.textContent = content;
          }

          refresh();
        })();

        return lightbox;
      }

      Webflow.define(
        "lightbox",
        (module.exports = function ($) {
          var api = {};
          var inApp = Webflow.env();
          var lightbox = createLightbox(
            window,
            document,
            $,
            inApp ? "#lightbox-mountpoint" : "body"
          );
          var $doc = $(document);
          var $lightboxes;
          var designer;
          var namespace = ".w-lightbox";
          var groups; // -----------------------------------
          // Module methods

          api.ready = api.design = api.preview = init; // -----------------------------------
          // Private methods

          function init() {
            designer = inApp && Webflow.env("design"); // Reset Lightbox

            lightbox.destroy(); // Reset groups

            groups = {}; // Find all instances on the page

            $lightboxes = $doc.find(namespace); // Instantiate all lighboxes

            $lightboxes.webflowLightBox(); // Set accessibility properties that are useful prior
            // to a lightbox being opened

            $lightboxes.each(function () {
              setAriaLabelIfEmpty($(this), "open lightbox");
              $(this).attr("aria-haspopup", "dialog");
            });
          }

          jQuery.fn.extend({
            webflowLightBox: function webflowLightBox() {
              var $el = this;
              $.each($el, function (i, el) {
                // Store state in data
                var data = $.data(el, namespace);

                if (!data) {
                  data = $.data(el, namespace, {
                    el: $(el),
                    mode: "images",
                    images: [],
                    embed: "",
                  });
                } // Remove old events

                data.el.off(namespace); // Set config from json script tag

                configure(data); // Add events based on mode

                if (designer) {
                  data.el.on("setting" + namespace, configure.bind(null, data));
                } else {
                  data.el
                    .on("click" + namespace, clickHandler(data)) // Prevent page scrolling to top when clicking on lightbox triggers.
                    .on("click" + namespace, function (e) {
                      e.preventDefault();
                    });
                }
              });
            },
          });

          function configure(data) {
            var json = data.el.children(".w-json").html();
            var groupName;
            var groupItems;

            if (!json) {
              data.items = [];
              return;
            }

            try {
              json = JSON.parse(json);
            } catch (e) {
              console.error("Malformed lightbox JSON configuration.", e);
            }

            supportOldLightboxJson(json);
            json.items.forEach(function (item) {
              item.$el = data.el;
            });
            groupName = json.group;

            if (groupName) {
              groupItems = groups[groupName];

              if (!groupItems) {
                groupItems = groups[groupName] = [];
              }

              data.items = groupItems;

              if (json.items.length) {
                data.index = groupItems.length;
                groupItems.push.apply(groupItems, json.items);
              }
            } else {
              data.items = json.items;
              data.index = 0;
            }
          }

          function clickHandler(data) {
            return function () {
              data.items.length && lightbox(data.items, data.index || 0);
            };
          }

          function supportOldLightboxJson(data) {
            if (data.images) {
              data.images.forEach(function (item) {
                item.type = "image";
              });
              data.items = data.images;
            }

            if (data.embed) {
              data.embed.type = "video";
              data.items = [data.embed];
            }

            if (data.groupId) {
              data.group = data.groupId;
            }
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 26 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: Navbar component
       */

      var Webflow = __webpack_require__(0);

      var IXEvents = __webpack_require__(1);

      var KEY_CODES = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
      Webflow.define(
        "navbar",
        (module.exports = function ($, _) {
          var api = {};
          var tram = $.tram;
          var $win = $(window);
          var $doc = $(document);
          var debounce = _.debounce;
          var $body;
          var $navbars;
          var designer;
          var inEditor;
          var inApp = Webflow.env();
          var overlay = '<div class="w-nav-overlay" data-wf-ignore />';
          var namespace = ".w-nav";
          var navbarOpenedButton = "w--open";
          var navbarOpenedDropdown = "w--nav-dropdown-open";
          var navbarOpenedDropdownToggle = "w--nav-dropdown-toggle-open";
          var navbarOpenedDropdownList = "w--nav-dropdown-list-open";
          var navbarOpenedLink = "w--nav-link-open";
          var ix = IXEvents.triggers;
          var menuSibling = $(); // -----------------------------------
          // Module methods

          api.ready = api.design = api.preview = init;

          api.destroy = function () {
            menuSibling = $();
            removeListeners();

            if ($navbars && $navbars.length) {
              $navbars.each(teardown);
            }
          }; // -----------------------------------
          // Private methods

          function init() {
            designer = inApp && Webflow.env("design");
            inEditor = Webflow.env("editor");
            $body = $(document.body); // Find all instances on the page

            $navbars = $doc.find(namespace);

            if (!$navbars.length) {
              return;
            }

            $navbars.each(build); // Wire events

            removeListeners();
            addListeners();
          }

          function removeListeners() {
            Webflow.resize.off(resizeAll);
          }

          function addListeners() {
            Webflow.resize.on(resizeAll);
          }

          function resizeAll() {
            $navbars.each(resize);
          }

          function build(i, el) {
            var $el = $(el); // Store state in data

            var data = $.data(el, namespace);

            if (!data) {
              data = $.data(el, namespace, {
                open: false,
                el: $el,
                config: {},
                selectedIdx: -1,
              });
            }

            data.menu = $el.find(".w-nav-menu");
            data.links = data.menu.find(".w-nav-link");
            data.dropdowns = data.menu.find(".w-dropdown");
            data.dropdownToggle = data.menu.find(".w-dropdown-toggle");
            data.dropdownList = data.menu.find(".w-dropdown-list");
            data.button = $el.find(".w-nav-button");
            data.container = $el.find(".w-container");
            data.overlayContainerId = "w-nav-overlay-" + i;
            data.outside = outside(data); //   If the brand links exists and is set to link to the homepage, the
            // default setting, then add an aria-label

            var navBrandLink = $el.find(".w-nav-brand");

            if (
              navBrandLink &&
              navBrandLink.attr("href") === "/" &&
              navBrandLink.attr("aria-label") == null
            ) {
              navBrandLink.attr("aria-label", "home");
            } //   VoiceOver bug, when items that disallow user selection are focused
            // VoiceOver gets confused and scrolls to the end of the page. Â¯\_(ãƒ„)_/Â¯

            data.button.attr("style", "-webkit-user-select: text;"); // Add attributes to toggle element

            if (data.button.attr("aria-label") == null) {
              data.button.attr("aria-label", "menu");
            }

            data.button.attr("role", "button");
            data.button.attr("tabindex", "0");
            data.button.attr("aria-controls", data.overlayContainerId);
            data.button.attr("aria-haspopup", "menu");
            data.button.attr("aria-expanded", "false"); // Remove old events

            data.el.off(namespace);
            data.button.off(namespace);
            data.menu.off(namespace); // Set config from data attributes

            configure(data); // Add events based on mode

            if (designer) {
              removeOverlay(data);
              data.el.on("setting" + namespace, handler(data));
            } else {
              addOverlay(data);
              data.button.on("click" + namespace, toggle(data));
              data.menu.on("click" + namespace, "a", navigate(data));
              data.button.on(
                "keydown" + namespace,
                makeToggleButtonKeyboardHandler(data)
              );
              data.el.on("keydown" + namespace, makeLinksKeyboardHandler(data));
            } // Trigger initial resize

            resize(i, el);
          }

          function teardown(i, el) {
            var data = $.data(el, namespace);

            if (data) {
              removeOverlay(data);
              $.removeData(el, namespace);
            }
          }

          function removeOverlay(data) {
            if (!data.overlay) {
              return;
            }

            close(data, true);
            data.overlay.remove();
            data.overlay = null;
          }

          function addOverlay(data) {
            if (data.overlay) {
              return;
            }

            data.overlay = $(overlay).appendTo(data.el);
            data.overlay.attr("id", data.overlayContainerId);
            data.parent = data.menu.parent();
            close(data, true);
          }

          function configure(data) {
            var config = {};
            var old = data.config || {}; // Set config options from data attributes

            var animation = (config.animation =
              data.el.attr("data-animation") || "default");
            config.animOver = /^over/.test(animation);
            config.animDirect = /left$/.test(animation) ? -1 : 1; // Re-open menu if the animation type changed

            if (old.animation !== animation) {
              data.open && _.defer(reopen, data);
            }

            config.easing = data.el.attr("data-easing") || "ease";
            config.easing2 = data.el.attr("data-easing2") || "ease";
            var duration = data.el.attr("data-duration");
            config.duration = duration != null ? Number(duration) : 400;
            config.docHeight = data.el.attr("data-doc-height"); // Store config in data

            data.config = config;
          }

          function handler(data) {
            return function (evt, options) {
              options = options || {};
              var winWidth = $win.width();
              configure(data);
              options.open === true && open(data, true);
              options.open === false && close(data, true); // Reopen if media query changed after setting

              data.open &&
                _.defer(function () {
                  if (winWidth !== $win.width()) {
                    reopen(data);
                  }
                });
            };
          }

          function makeToggleButtonKeyboardHandler(data) {
            return function (evt) {
              switch (evt.keyCode) {
                case KEY_CODES.SPACE:
                case KEY_CODES.ENTER: {
                  // Toggle returns a function
                  toggle(data)();
                  evt.preventDefault();
                  return evt.stopPropagation();
                }

                case KEY_CODES.ESCAPE: {
                  close(data);
                  evt.preventDefault();
                  return evt.stopPropagation();
                }

                case KEY_CODES.ARROW_RIGHT:
                case KEY_CODES.ARROW_DOWN:
                case KEY_CODES.HOME:
                case KEY_CODES.END: {
                  if (!data.open) {
                    evt.preventDefault();
                    return evt.stopPropagation();
                  }

                  if (evt.keyCode === KEY_CODES.END) {
                    data.selectedIdx = data.links.length - 1;
                  } else {
                    data.selectedIdx = 0;
                  }

                  focusSelectedLink(data);
                  evt.preventDefault();
                  return evt.stopPropagation();
                }
              }
            };
          }

          function makeLinksKeyboardHandler(data) {
            return function (evt) {
              if (!data.open) {
                return;
              } // Realign selectedIdx with the menu item that is currently in focus.
              // We need this because we do not track the `Tab` key activity!

              data.selectedIdx = data.links.index(document.activeElement);

              switch (evt.keyCode) {
                case KEY_CODES.HOME:
                case KEY_CODES.END: {
                  if (evt.keyCode === KEY_CODES.END) {
                    data.selectedIdx = data.links.length - 1;
                  } else {
                    data.selectedIdx = 0;
                  }

                  focusSelectedLink(data);
                  evt.preventDefault();
                  return evt.stopPropagation();
                }

                case KEY_CODES.ESCAPE: {
                  close(data); // Focus toggle button

                  data.button.focus();
                  evt.preventDefault();
                  return evt.stopPropagation();
                }

                case KEY_CODES.ARROW_LEFT:
                case KEY_CODES.ARROW_UP: {
                  data.selectedIdx = Math.max(-1, data.selectedIdx - 1);
                  focusSelectedLink(data);
                  evt.preventDefault();
                  return evt.stopPropagation();
                }

                case KEY_CODES.ARROW_RIGHT:
                case KEY_CODES.ARROW_DOWN: {
                  data.selectedIdx = Math.min(
                    data.links.length - 1,
                    data.selectedIdx + 1
                  );
                  focusSelectedLink(data);
                  evt.preventDefault();
                  return evt.stopPropagation();
                }
              }
            };
          }

          function focusSelectedLink(data) {
            if (data.links[data.selectedIdx]) {
              var selectedElement = data.links[data.selectedIdx];
              selectedElement.focus();
              navigate(selectedElement);
            }
          }

          function reopen(data) {
            if (!data.open) {
              return;
            }

            close(data, true);
            open(data, true);
          }

          function toggle(data) {
            // Debounce toggle to wait for accurate open state
            return debounce(function () {
              data.open ? close(data) : open(data);
            });
          }

          function navigate(data) {
            return function (evt) {
              var link = $(this);
              var href = link.attr("href"); // Avoid late clicks on touch devices

              if (!Webflow.validClick(evt.currentTarget)) {
                evt.preventDefault();
                return;
              } // Close when navigating to an in-page anchor

              if (href && href.indexOf("#") === 0 && data.open) {
                close(data);
              }
            };
          }

          function outside(data) {
            // Unbind previous click handler if it exists
            if (data.outside) {
              $doc.off("click" + namespace, data.outside);
            }

            return function (evt) {
              var $target = $(evt.target); // Ignore clicks on Editor overlay UI

              if (
                inEditor &&
                $target.closest(".w-editor-bem-EditorOverlay").length
              ) {
                return;
              } // Close menu when clicked outside, debounced to wait for state

              outsideDebounced(data, $target);
            };
          }

          var outsideDebounced = debounce(function (data, $target) {
            if (!data.open) {
              return;
            }

            var menu = $target.closest(".w-nav-menu");

            if (!data.menu.is(menu)) {
              close(data);
            }
          });

          function resize(i, el) {
            var data = $.data(el, namespace); // Check for collapsed state based on button display

            var collapsed = (data.collapsed =
              data.button.css("display") !== "none"); // Close menu if button is no longer visible (and not in designer)

            if (data.open && !collapsed && !designer) {
              close(data, true);
            } // Set max-width of links + dropdowns to match container

            if (data.container.length) {
              var updateEachMax = updateMax(data);
              data.links.each(updateEachMax);
              data.dropdowns.each(updateEachMax);
            } // If currently open, update height to match body

            if (data.open) {
              setOverlayHeight(data);
            }
          }

          var maxWidth = "max-width";

          function updateMax(data) {
            // Set max-width of each element to match container
            var containMax = data.container.css(maxWidth);

            if (containMax === "none") {
              containMax = "";
            }

            return function (i, link) {
              link = $(link);
              link.css(maxWidth, ""); // Don't set the max-width if an upstream value exists

              if (link.css(maxWidth) === "none") {
                link.css(maxWidth, containMax);
              }
            };
          }

          function addMenuOpen(i, el) {
            el.setAttribute("data-nav-menu-open", "");
          }

          function removeMenuOpen(i, el) {
            el.removeAttribute("data-nav-menu-open");
          }

          function open(data, immediate) {
            if (data.open) {
              return;
            }

            data.open = true;
            data.menu.each(addMenuOpen);
            data.links.addClass(navbarOpenedLink);
            data.dropdowns.addClass(navbarOpenedDropdown);
            data.dropdownToggle.addClass(navbarOpenedDropdownToggle);
            data.dropdownList.addClass(navbarOpenedDropdownList);
            data.button.addClass(navbarOpenedButton);
            var config = data.config;
            var animation = config.animation;

            if (
              animation === "none" ||
              !tram.support.transform ||
              config.duration <= 0
            ) {
              immediate = true;
            }

            var bodyHeight = setOverlayHeight(data);
            var menuHeight = data.menu.outerHeight(true);
            var menuWidth = data.menu.outerWidth(true);
            var navHeight = data.el.height();
            var navbarEl = data.el[0];
            resize(0, navbarEl);
            ix.intro(0, navbarEl);
            Webflow.redraw.up(); // Listen for click outside events

            if (!designer) {
              $doc.on("click" + namespace, data.outside);
            } // No transition for immediate

            if (immediate) {
              complete();
              return;
            }

            var transConfig =
              "transform " + config.duration + "ms " + config.easing; // Add menu to overlay

            if (data.overlay) {
              menuSibling = data.menu.prev();
              data.overlay.show().append(data.menu);
            } // Over left/right

            if (config.animOver) {
              tram(data.menu)
                .add(transConfig)
                .set({
                  x: config.animDirect * menuWidth,
                  height: bodyHeight,
                })
                .start({
                  x: 0,
                })
                .then(complete);
              data.overlay && data.overlay.width(menuWidth);
              return;
            } // Drop Down

            var offsetY = navHeight + menuHeight;
            tram(data.menu)
              .add(transConfig)
              .set({
                y: -offsetY,
              })
              .start({
                y: 0,
              })
              .then(complete);

            function complete() {
              data.button.attr("aria-expanded", "true");
            }
          }

          function setOverlayHeight(data) {
            var config = data.config;
            var bodyHeight = config.docHeight ? $doc.height() : $body.height();

            if (config.animOver) {
              data.menu.height(bodyHeight);
            } else if (data.el.css("position") !== "fixed") {
              bodyHeight -= data.el.outerHeight(true);
            }

            data.overlay && data.overlay.height(bodyHeight);
            return bodyHeight;
          }

          function close(data, immediate) {
            if (!data.open) {
              return;
            }

            data.open = false;
            data.button.removeClass(navbarOpenedButton);
            var config = data.config;

            if (
              config.animation === "none" ||
              !tram.support.transform ||
              config.duration <= 0
            ) {
              immediate = true;
            }

            ix.outro(0, data.el[0]); // Stop listening for click outside events

            $doc.off("click" + namespace, data.outside);

            if (immediate) {
              tram(data.menu).stop();
              complete();
              return;
            }

            var transConfig =
              "transform " + config.duration + "ms " + config.easing2;
            var menuHeight = data.menu.outerHeight(true);
            var menuWidth = data.menu.outerWidth(true);
            var navHeight = data.el.height(); // Over left/right

            if (config.animOver) {
              tram(data.menu)
                .add(transConfig)
                .start({
                  x: menuWidth * config.animDirect,
                })
                .then(complete);
              return;
            } // Drop Down

            var offsetY = navHeight + menuHeight;
            tram(data.menu)
              .add(transConfig)
              .start({
                y: -offsetY,
              })
              .then(complete);

            function complete() {
              data.menu.height("");
              tram(data.menu).set({
                x: 0,
                y: 0,
              });
              data.menu.each(removeMenuOpen);
              data.links.removeClass(navbarOpenedLink);
              data.dropdowns.removeClass(navbarOpenedDropdown);
              data.dropdownToggle.removeClass(navbarOpenedDropdownToggle);
              data.dropdownList.removeClass(navbarOpenedDropdownList);

              if (data.overlay && data.overlay.children().length) {
                // Move menu back to parent at the original location
                menuSibling.length
                  ? data.menu.insertAfter(menuSibling)
                  : data.menu.prependTo(data.parent);
                data.overlay.attr("style", "").hide();
              } // Trigger event so other components can hook in (dropdown)

              data.el.triggerHandler("w-close");
              data.button.attr("aria-expanded", "false");
            }
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 27 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* global window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: Slider component
       */

      var Webflow = __webpack_require__(0);

      var IXEvents = __webpack_require__(1);

      var KEY_CODES = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
      var FOCUSABLE_SELECTOR =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
      Webflow.define(
        "slider",
        (module.exports = function ($, _) {
          var api = {};
          var tram = $.tram;
          var $doc = $(document);
          var $sliders;
          var designer;
          var inApp = Webflow.env();
          var namespace = ".w-slider";
          var dot = '<div class="w-slider-dot" data-wf-ignore />';
          var ariaLiveLabelHtml =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />';
          var forceShow = "w-slider-force-show";
          var ix = IXEvents.triggers;
          var fallback;
          var inRedraw = false; // -----------------------------------
          // Module methods

          api.ready = function () {
            designer = Webflow.env("design");
            init();
          };

          api.design = function () {
            designer = true; // Helps slider init on Designer load.

            setTimeout(init, 1000);
          };

          api.preview = function () {
            designer = false;
            init();
          };

          api.redraw = function () {
            inRedraw = true;
            init();
            inRedraw = false;
          };

          api.destroy = removeListeners; // -----------------------------------
          // Private methods

          function init() {
            // Find all sliders on the page
            $sliders = $doc.find(namespace);

            if (!$sliders.length) {
              return;
            }

            $sliders.each(build);

            if (fallback) {
              return;
            }

            removeListeners();
            addListeners();
          }

          function removeListeners() {
            Webflow.resize.off(renderAll);
            Webflow.redraw.off(api.redraw);
          }

          function addListeners() {
            Webflow.resize.on(renderAll);
            Webflow.redraw.on(api.redraw);
          }

          function renderAll() {
            $sliders.filter(":visible").each(render);
          }

          function build(i, el) {
            var $el = $(el); // Store slider state in data

            var data = $.data(el, namespace);

            if (!data) {
              data = $.data(el, namespace, {
                index: 0,
                depth: 1,
                hasFocus: {
                  keyboard: false,
                  mouse: false,
                },
                el: $el,
                config: {},
              });
            }

            data.mask = $el.children(".w-slider-mask");
            data.left = $el.children(".w-slider-arrow-left");
            data.right = $el.children(".w-slider-arrow-right");
            data.nav = $el.children(".w-slider-nav");
            data.slides = data.mask.children(".w-slide");
            data.slides.each(ix.reset);

            if (inRedraw) {
              data.maskWidth = 0;
            }

            if ($el.attr("role") === undefined) {
              $el.attr("role", "region");
            }

            if ($el.attr("aria-label") === undefined) {
              $el.attr("aria-label", "carousel");
            } // Store the ID of the slider slide view mask

            var slideViewId = data.mask.attr("id"); // If user did not provide an ID, set it

            if (!slideViewId) {
              slideViewId = "w-slider-mask-" + i;
              data.mask.attr("id", slideViewId);
            } // Create aria live label

            if (!designer && !data.ariaLiveLabel) {
              data.ariaLiveLabel = $(ariaLiveLabelHtml).appendTo(data.mask);
            } // Add attributes to left/right buttons

            data.left.attr("role", "button");
            data.left.attr("tabindex", "0");
            data.left.attr("aria-controls", slideViewId);

            if (data.left.attr("aria-label") === undefined) {
              data.left.attr("aria-label", "previous slide");
            }

            data.right.attr("role", "button");
            data.right.attr("tabindex", "0");
            data.right.attr("aria-controls", slideViewId);

            if (data.right.attr("aria-label") === undefined) {
              data.right.attr("aria-label", "next slide");
            } // Disable in old browsers

            if (!tram.support.transform) {
              data.left.hide();
              data.right.hide();
              data.nav.hide();
              fallback = true;
              return;
            } // Remove old events

            data.el.off(namespace);
            data.left.off(namespace);
            data.right.off(namespace);
            data.nav.off(namespace); // Set config from data attributes

            configure(data); // Add events based on mode

            if (designer) {
              data.el.on("setting" + namespace, handler(data));
              stopTimer(data);
              data.hasTimer = false;
            } else {
              data.el.on("swipe" + namespace, handler(data));
              data.left.on("click" + namespace, previousFunction(data));
              data.right.on("click" + namespace, next(data));
              data.left.on(
                "keydown" + namespace,
                keyboardSlideButtonsFunction(data, previousFunction)
              );
              data.right.on(
                "keydown" + namespace,
                keyboardSlideButtonsFunction(data, next)
              ); // Listen to nav keyboard events

              data.nav.on("keydown" + namespace, "> div", handler(data)); // Start timer if autoplay is true, only once

              if (data.config.autoplay && !data.hasTimer) {
                data.hasTimer = true;
                data.timerCount = 1;
                startTimer(data);
              }

              data.el.on(
                "mouseenter" + namespace,
                hasFocus(data, true, "mouse")
              );
              data.el.on(
                "focusin" + namespace,
                hasFocus(data, true, "keyboard")
              );
              data.el.on(
                "mouseleave" + namespace,
                hasFocus(data, false, "mouse")
              );
              data.el.on(
                "focusout" + namespace,
                hasFocus(data, false, "keyboard")
              );
            } // Listen to nav click events

            data.nav.on("click" + namespace, "> div", handler(data)); // Remove gaps from formatted html (for inline-blocks)

            if (!inApp) {
              data.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
            } // If slider or any parent is hidden, temporarily show for measurements (https://github.com/webflow/webflow/issues/24921)

            var $elHidden = $el.filter(":hidden");
            $elHidden.addClass(forceShow);
            var $elHiddenParents = $el.parents(":hidden");
            $elHiddenParents.addClass(forceShow); // Run first render

            if (!inRedraw) {
              render(i, el);
            } // If slider or any parent is hidden, reset after temporarily showing for measurements

            $elHidden.removeClass(forceShow);
            $elHiddenParents.removeClass(forceShow);
          }

          function configure(data) {
            var config = {};
            config.crossOver = 0; // Set config options from data attributes

            config.animation = data.el.attr("data-animation") || "slide";

            if (config.animation === "outin") {
              config.animation = "cross";
              config.crossOver = 0.5;
            }

            config.easing = data.el.attr("data-easing") || "ease";
            var duration = data.el.attr("data-duration");
            config.duration = duration != null ? parseInt(duration, 10) : 500;

            if (isAttrTrue(data.el.attr("data-infinite"))) {
              config.infinite = true;
            }

            if (isAttrTrue(data.el.attr("data-disable-swipe"))) {
              config.disableSwipe = true;
            }

            if (isAttrTrue(data.el.attr("data-hide-arrows"))) {
              config.hideArrows = true;
            } else if (data.config.hideArrows) {
              data.left.show();
              data.right.show();
            }

            if (isAttrTrue(data.el.attr("data-autoplay"))) {
              config.autoplay = true;
              config.delay = parseInt(data.el.attr("data-delay"), 10) || 2000;
              config.timerMax = parseInt(
                data.el.attr("data-autoplay-limit"),
                10
              ); // Disable timer on first touch or mouse down

              var touchEvents =
                "mousedown" + namespace + " touchstart" + namespace;

              if (!designer) {
                data.el.off(touchEvents).one(touchEvents, function () {
                  stopTimer(data);
                });
              }
            } // Use edge buffer to help calculate page count

            var arrowWidth = data.right.width();
            config.edge = arrowWidth ? arrowWidth + 40 : 100; // Store config in data

            data.config = config;
          }

          function isAttrTrue(value) {
            return value === "1" || value === "true";
          }

          function hasFocus(data, focusIn, eventType) {
            return function (evt) {
              if (!focusIn) {
                // Prevent Focus Out if moving to another element in the slider
                if ($.contains(data.el.get(0), evt.relatedTarget)) {
                  return;
                }

                data.hasFocus[eventType] = focusIn; // Prevent Aria live change if focused by other input

                if (
                  (data.hasFocus.mouse && eventType === "keyboard") ||
                  (data.hasFocus.keyboard && eventType === "mouse")
                ) {
                  return;
                }
              } else {
                data.hasFocus[eventType] = focusIn;
              }

              if (focusIn) {
                data.ariaLiveLabel.attr("aria-live", "polite");

                if (data.hasTimer) {
                  stopTimer(data);
                }
              } else {
                data.ariaLiveLabel.attr("aria-live", "off");

                if (data.hasTimer) {
                  startTimer(data);
                }
              }

              return;
            };
          }

          function keyboardSlideButtonsFunction(data, directionFunction) {
            return function (evt) {
              switch (evt.keyCode) {
                case KEY_CODES.SPACE:
                case KEY_CODES.ENTER: {
                  // DirectionFunction returns a function
                  directionFunction(data)();
                  evt.preventDefault();
                  return evt.stopPropagation();
                }
              }
            };
          }

          function previousFunction(data) {
            return function () {
              change(data, {
                index: data.index - 1,
                vector: -1,
              });
            };
          }

          function next(data) {
            return function () {
              change(data, {
                index: data.index + 1,
                vector: 1,
              });
            };
          }

          function select(data, value) {
            // Select page based on slide element index
            var found = null;

            if (value === data.slides.length) {
              init();
              layout(data); // Rebuild and find new slides
            }

            _.each(data.anchors, function (anchor, index) {
              $(anchor.els).each(function (i, el) {
                if ($(el).index() === value) {
                  found = index;
                }
              });
            });

            if (found != null) {
              change(data, {
                index: found,
                immediate: true,
              });
            }
          }

          function startTimer(data) {
            stopTimer(data);
            var config = data.config;
            var timerMax = config.timerMax;

            if (timerMax && data.timerCount++ > timerMax) {
              return;
            }

            data.timerId = window.setTimeout(function () {
              if (data.timerId == null || designer) {
                return;
              }

              next(data)();
              startTimer(data);
            }, config.delay);
          }

          function stopTimer(data) {
            window.clearTimeout(data.timerId);
            data.timerId = null;
          }

          function handler(data) {
            return function (evt, options) {
              options = options || {};
              var config = data.config; // Designer settings

              if (designer && evt.type === "setting") {
                if (options.select === "prev") {
                  return previousFunction(data)();
                }

                if (options.select === "next") {
                  return next(data)();
                }

                configure(data);
                layout(data);

                if (options.select == null) {
                  return;
                }

                select(data, options.select);
                return;
              } // Swipe event

              if (evt.type === "swipe") {
                if (config.disableSwipe) {
                  return;
                }

                if (Webflow.env("editor")) {
                  return;
                }

                if (options.direction === "left") {
                  return next(data)();
                }

                if (options.direction === "right") {
                  return previousFunction(data)();
                }

                return;
              } // Page buttons

              if (data.nav.has(evt.target).length) {
                var index = $(evt.target).index();

                if (evt.type === "click") {
                  change(data, {
                    index: index,
                  });
                }

                if (evt.type === "keydown") {
                  switch (evt.keyCode) {
                    case KEY_CODES.ENTER:
                    case KEY_CODES.SPACE: {
                      change(data, {
                        index: index,
                      });
                      evt.preventDefault();
                      break;
                    }

                    case KEY_CODES.ARROW_LEFT:
                    case KEY_CODES.ARROW_UP: {
                      focusDot(data.nav, Math.max(index - 1, 0));
                      evt.preventDefault();
                      break;
                    }

                    case KEY_CODES.ARROW_RIGHT:
                    case KEY_CODES.ARROW_DOWN: {
                      focusDot(data.nav, Math.min(index + 1, data.pages));
                      evt.preventDefault();
                      break;
                    }

                    case KEY_CODES.HOME: {
                      focusDot(data.nav, 0);
                      evt.preventDefault();
                      break;
                    }

                    case KEY_CODES.END: {
                      focusDot(data.nav, data.pages);
                      evt.preventDefault();
                      break;
                    }

                    default: {
                      return;
                    }
                  }
                }
              }
            };
          }

          function focusDot($nav, index) {
            // Focus nav dot; don't change class to active
            var $active = $nav.children().eq(index).focus();
            $nav.children().not($active);
          }

          function change(data, options) {
            options = options || {};
            var config = data.config;
            var anchors = data.anchors; // Set new index

            data.previous = data.index;
            var index = options.index;
            var shift = {};

            if (index < 0) {
              index = anchors.length - 1;

              if (config.infinite) {
                // Shift first slide to the end
                shift.x = -data.endX;
                shift.from = 0;
                shift.to = anchors[0].width;
              }
            } else if (index >= anchors.length) {
              index = 0;

              if (config.infinite) {
                // Shift last slide to the start
                shift.x = anchors[anchors.length - 1].width;
                shift.from = -anchors[anchors.length - 1].x;
                shift.to = shift.from - shift.x;
              }
            }

            data.index = index; // Select nav dot; set class active

            var $active = data.nav
              .children()
              .eq(index)
              .addClass("w-active")
              .attr("aria-pressed", "true")
              .attr("tabindex", "0");
            data.nav
              .children()
              .not($active)
              .removeClass("w-active")
              .attr("aria-pressed", "false")
              .attr("tabindex", "-1"); // Hide arrows

            if (config.hideArrows) {
              data.index === anchors.length - 1
                ? data.right.hide()
                : data.right.show();
              data.index === 0 ? data.left.hide() : data.left.show();
            } // Get page offset from anchors

            var lastOffsetX = data.offsetX || 0;
            var offsetX = (data.offsetX = -anchors[data.index].x);
            var resetConfig = {
              x: offsetX,
              opacity: 1,
              visibility: "",
            }; // Transition slides

            var targets = $(anchors[data.index].els);
            var prevTargs = $(
              anchors[data.previous] && anchors[data.previous].els
            );
            var others = data.slides.not(targets);
            var animation = config.animation;
            var easing = config.easing;
            var duration = Math.round(config.duration);
            var vector =
              options.vector || (data.index > data.previous ? 1 : -1);
            var fadeRule = "opacity " + duration + "ms " + easing;
            var slideRule = "transform " + duration + "ms " + easing; // Make active slides' content focusable

            targets.find(FOCUSABLE_SELECTOR).removeAttr("tabindex");
            targets.removeAttr("aria-hidden"); // Voiceover bug: Sometimes descendants are still visible, so hide everything...

            targets.find("*").removeAttr("aria-hidden"); // Prevent focus on inactive slides' content

            others.find(FOCUSABLE_SELECTOR).attr("tabindex", "-1");
            others.attr("aria-hidden", "true"); // Voiceover bug: Sometimes descendants are still visible, so hide everything...

            others.find("*").attr("aria-hidden", "true"); // Trigger IX events

            if (!designer) {
              targets.each(ix.intro);
              others.each(ix.outro);
            } // Set immediately after layout changes (but not during redraw)

            if (options.immediate && !inRedraw) {
              tram(targets).set(resetConfig);
              resetOthers();
              return;
            } // Exit early if index is unchanged

            if (data.index === data.previous) {
              return;
            } // Announce slide change to screen reader

            if (!designer) {
              data.ariaLiveLabel.text(
                "Slide ".concat(index + 1, " of ").concat(anchors.length, ".")
              );
            } // Cross Fade / Out-In

            if (animation === "cross") {
              var reduced = Math.round(duration - duration * config.crossOver);
              var wait = Math.round(duration - reduced);
              fadeRule = "opacity " + reduced + "ms " + easing;
              tram(prevTargs)
                .set({
                  visibility: "",
                })
                .add(fadeRule)
                .start({
                  opacity: 0,
                });
              tram(targets)
                .set({
                  visibility: "",
                  x: offsetX,
                  opacity: 0,
                  zIndex: data.depth++,
                })
                .add(fadeRule)
                .wait(wait)
                .then({
                  opacity: 1,
                })
                .then(resetOthers);
              return;
            } // Fade Over

            if (animation === "fade") {
              tram(prevTargs)
                .set({
                  visibility: "",
                })
                .stop();
              tram(targets)
                .set({
                  visibility: "",
                  x: offsetX,
                  opacity: 0,
                  zIndex: data.depth++,
                })
                .add(fadeRule)
                .start({
                  opacity: 1,
                })
                .then(resetOthers);
              return;
            } // Slide Over

            if (animation === "over") {
              resetConfig = {
                x: data.endX,
              };
              tram(prevTargs)
                .set({
                  visibility: "",
                })
                .stop();
              tram(targets)
                .set({
                  visibility: "",
                  zIndex: data.depth++,
                  x: offsetX + anchors[data.index].width * vector,
                })
                .add(slideRule)
                .start({
                  x: offsetX,
                })
                .then(resetOthers);
              return;
            } // Slide - infinite scroll

            if (config.infinite && shift.x) {
              tram(data.slides.not(prevTargs))
                .set({
                  visibility: "",
                  x: shift.x,
                })
                .add(slideRule)
                .start({
                  x: offsetX,
                });
              tram(prevTargs)
                .set({
                  visibility: "",
                  x: shift.from,
                })
                .add(slideRule)
                .start({
                  x: shift.to,
                });
              data.shifted = prevTargs;
            } else {
              if (config.infinite && data.shifted) {
                tram(data.shifted).set({
                  visibility: "",
                  x: lastOffsetX,
                });
                data.shifted = null;
              } // Slide - basic scroll

              tram(data.slides)
                .set({
                  visibility: "",
                })
                .add(slideRule)
                .start({
                  x: offsetX,
                });
            } // Helper to move others out of view

            function resetOthers() {
              targets = $(anchors[data.index].els);
              others = data.slides.not(targets);

              if (animation !== "slide") {
                resetConfig.visibility = "hidden";
              }

              tram(others).set(resetConfig);
            }
          }

          function render(i, el) {
            var data = $.data(el, namespace);

            if (!data) {
              return;
            }

            if (maskChanged(data)) {
              return layout(data);
            }

            if (designer && slidesChanged(data)) {
              layout(data);
            }
          }

          function layout(data) {
            // Determine page count from width of slides
            var pages = 1;
            var offset = 0;
            var anchor = 0;
            var width = 0;
            var maskWidth = data.maskWidth;
            var threshold = maskWidth - data.config.edge;

            if (threshold < 0) {
              threshold = 0;
            }

            data.anchors = [
              {
                els: [],
                x: 0,
                width: 0,
              },
            ];
            data.slides.each(function (i, el) {
              if (anchor - offset > threshold) {
                pages++;
                offset += maskWidth; // Store page anchor for transition

                data.anchors[pages - 1] = {
                  els: [],
                  x: anchor,
                  width: 0,
                };
              } // Set next anchor using current width + margin

              width = $(el).outerWidth(true);
              anchor += width;
              data.anchors[pages - 1].width += width;
              data.anchors[pages - 1].els.push(el);
              var ariaLabel = i + 1 + " of " + data.slides.length;
              $(el).attr("aria-label", ariaLabel);
              $(el).attr("role", "group");
            });
            data.endX = anchor; // Build dots if nav exists and needs updating

            if (designer) {
              data.pages = null;
            }

            if (data.nav.length && data.pages !== pages) {
              data.pages = pages;
              buildNav(data);
            } // Make sure index is still within range and call change handler

            var index = data.index;

            if (index >= pages) {
              index = pages - 1;
            }

            change(data, {
              immediate: true,
              index: index,
            });
          }

          function buildNav(data) {
            var dots = [];
            var $dot;
            var spacing = data.el.attr("data-nav-spacing");

            if (spacing) {
              spacing = parseFloat(spacing) + "px";
            }

            for (var i = 0, len = data.pages; i < len; i++) {
              $dot = $(dot);
              $dot
                .attr("aria-label", "Show slide " + (i + 1) + " of " + len)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1");

              if (data.nav.hasClass("w-num")) {
                $dot.text(i + 1);
              }

              if (spacing != null) {
                $dot.css({
                  "margin-left": spacing,
                  "margin-right": spacing,
                });
              }

              dots.push($dot);
            }

            data.nav.empty().append(dots);
          }

          function maskChanged(data) {
            var maskWidth = data.mask.width();

            if (data.maskWidth !== maskWidth) {
              data.maskWidth = maskWidth;
              return true;
            }

            return false;
          }

          function slidesChanged(data) {
            var slidesWidth = 0;
            data.slides.each(function (i, el) {
              slidesWidth += $(el).outerWidth(true);
            });

            if (data.slidesWidth !== slidesWidth) {
              data.slidesWidth = slidesWidth;
              return true;
            }

            return false;
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 28 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* global document window */

      /* eslint-disable no-var */

      /**
       * Webflow: Tabs component
       */

      var Webflow = __webpack_require__(0);

      var IXEvents = __webpack_require__(1);

      Webflow.define(
        "tabs",
        (module.exports = function ($) {
          var api = {};
          var tram = $.tram;
          var $doc = $(document);
          var $tabs;
          var design;
          var env = Webflow.env;
          var safari = env.safari;
          var inApp = env();
          var tabAttr = "data-w-tab";
          var paneAttr = "data-w-pane";
          var namespace = ".w-tabs";
          var linkCurrent = "w--current";
          var tabActive = "w--tab-active";
          var ix = IXEvents.triggers;
          var inRedraw = false; // -----------------------------------
          // Module methods

          api.ready = api.design = api.preview = init;

          api.redraw = function () {
            inRedraw = true;
            init();
            inRedraw = false;
          };

          api.destroy = function () {
            $tabs = $doc.find(namespace);

            if (!$tabs.length) {
              return;
            }

            $tabs.each(resetIX);
            removeListeners();
          }; // -----------------------------------
          // Private methods

          function init() {
            design = inApp && Webflow.env("design"); // Find all instances on the page

            $tabs = $doc.find(namespace);

            if (!$tabs.length) {
              return;
            }

            $tabs.each(build);

            if (Webflow.env("preview") && !inRedraw) {
              $tabs.each(resetIX);
            }

            removeListeners();
            addListeners();
          }

          function removeListeners() {
            Webflow.redraw.off(api.redraw);
          }

          function addListeners() {
            Webflow.redraw.on(api.redraw);
          }

          function resetIX(i, el) {
            var data = $.data(el, namespace);

            if (!data) {
              return;
            }

            data.links && data.links.each(ix.reset);
            data.panes && data.panes.each(ix.reset);
          }

          function build(i, el) {
            var widgetHash = namespace.substr(1) + "-" + i;
            var $el = $(el); // Store state in data

            var data = $.data(el, namespace);

            if (!data) {
              data = $.data(el, namespace, {
                el: $el,
                config: {},
              });
            }

            data.current = null;
            data.tabIdentifier = widgetHash + "-" + tabAttr;
            data.paneIdentifier = widgetHash + "-" + paneAttr;
            data.menu = $el.children(".w-tab-menu");
            data.links = data.menu.children(".w-tab-link");
            data.content = $el.children(".w-tab-content");
            data.panes = data.content.children(".w-tab-pane"); // Remove old events

            data.el.off(namespace);
            data.links.off(namespace); // This role is necessary in the ARIA spec

            data.menu.attr("role", "tablist"); // Set all tabs unfocusable

            data.links.attr("tabindex", "-1"); // Set config from data attributes

            configure(data); // Wire up events when not in design mode

            if (!design) {
              data.links.on("click" + namespace, linkSelect(data));
              data.links.on("keydown" + namespace, handleLinkKeydown(data)); // Trigger first intro event from current tab

              var $link = data.links.filter("." + linkCurrent);
              var tab = $link.attr(tabAttr);
              tab &&
                changeTab(data, {
                  tab: tab,
                  immediate: true,
                });
            }
          }

          function configure(data) {
            var config = {}; // Set config options from data attributes

            config.easing = data.el.attr("data-easing") || "ease";
            var intro = parseInt(data.el.attr("data-duration-in"), 10); // eslint-disable-next-line no-self-compare

            intro = config.intro = intro === intro ? intro : 0;
            var outro = parseInt(data.el.attr("data-duration-out"), 10); // eslint-disable-next-line no-self-compare

            outro = config.outro = outro === outro ? outro : 0;
            config.immediate = !intro && !outro; // Store config in data

            data.config = config;
          }

          function getActiveTabIdx(data) {
            var tab = data.current;
            return Array.prototype.findIndex.call(
              data.links,
              function (t) {
                return t.getAttribute(tabAttr) === tab;
              },
              null
            );
          }

          function linkSelect(data) {
            return function (evt) {
              evt.preventDefault();
              var tab = evt.currentTarget.getAttribute(tabAttr);
              tab &&
                changeTab(data, {
                  tab: tab,
                });
            };
          }

          function handleLinkKeydown(data) {
            return function (evt) {
              var currentIdx = getActiveTabIdx(data);
              var keyName = evt.key;
              var keyMap = {
                ArrowLeft: currentIdx - 1,
                ArrowUp: currentIdx - 1,
                ArrowRight: currentIdx + 1,
                ArrowDown: currentIdx + 1,
                End: data.links.length - 1,
                Home: 0,
              }; // Bail out of function if this key is not
              // involved in tab management

              if (!(keyName in keyMap)) return;
              evt.preventDefault();
              var nextIdx = keyMap[keyName]; // go back to end of tabs if we wrap past the start

              if (nextIdx === -1) {
                nextIdx = data.links.length - 1;
              } // go back to start if we wrap past the last tab

              if (nextIdx === data.links.length) {
                nextIdx = 0;
              }

              var tabEl = data.links[nextIdx];
              var tab = tabEl.getAttribute(tabAttr);
              tab &&
                changeTab(data, {
                  tab: tab,
                });
            };
          }

          function changeTab(data, options) {
            options = options || {};
            var config = data.config;
            var easing = config.easing;
            var tab = options.tab; // Don't select the same tab twice

            if (tab === data.current) {
              return;
            }

            data.current = tab;
            /**
             * The currently active tab.
             * Will be referenced to manage focus after
             * TabLink attributes are changed
             * @type {HTMLAnchorElement}
             */

            var currentTab; // Select the current link

            data.links.each(function (i, el) {
              var $el = $(el); // Add important attributes at build time.

              if (options.immediate || config.immediate) {
                // Store corresponding pane for reference.
                var pane = data.panes[i]; // IDs are necessary for ARIA relationships,
                // so if the user did not create one, we create one
                // using our generated identifier

                if (!el.id) {
                  el.id = data.tabIdentifier + "-" + i;
                }

                if (!pane.id) {
                  pane.id = data.paneIdentifier + "-" + i;
                }

                el.href = "#" + pane.id; // Tab elements must take this role

                el.setAttribute("role", "tab"); // Tab elements must reference the unique ID of the panel
                // that they control

                el.setAttribute("aria-controls", pane.id); // Tab elements must report that they are not selected
                // by default

                el.setAttribute("aria-selected", "false"); // Panes must take on the `Tabpanel` role

                pane.setAttribute("role", "tabpanel"); // Elements with tabpanel role must be labelled by
                // their controlling tab

                pane.setAttribute("aria-labelledby", el.id);
              }

              if (el.getAttribute(tabAttr) === tab) {
                // This is the current tab. Store it.
                currentTab = el;
                $el
                  .addClass(linkCurrent)
                  .removeAttr("tabindex")
                  .attr({
                    "aria-selected": "true",
                  })
                  .each(ix.intro);
              } else if ($el.hasClass(linkCurrent)) {
                $el
                  .removeClass(linkCurrent)
                  .attr({
                    tabindex: "-1",
                    "aria-selected": "false",
                  })
                  .each(ix.outro);
              }
            }); // Find the new tab panes and keep track of previous

            var targets = [];
            var previous = [];
            data.panes.each(function (i, el) {
              var $el = $(el);

              if (el.getAttribute(tabAttr) === tab) {
                targets.push(el);
              } else if ($el.hasClass(tabActive)) {
                previous.push(el);
              }
            });
            var $targets = $(targets);
            var $previous = $(previous); // Switch tabs immediately and bypass transitions

            if (options.immediate || config.immediate) {
              $targets.addClass(tabActive).each(ix.intro);
              $previous.removeClass(tabActive); // Redraw to benefit components in the hidden tab pane
              // But only if not currently in the middle of a redraw

              if (!inRedraw) {
                Webflow.redraw.up();
              }

              return;
            } // Focus if this is not the on-page-load call to `changeTab`
            else {
              // Backwards compatible hack to prevent focus from scrolling
              var x = window.scrollX;
              var y = window.scrollY;
              currentTab.focus();
              window.scrollTo(x, y);
            } // Fade out the currently active tab before intro

            if ($previous.length && config.outro) {
              $previous.each(ix.outro);
              tram($previous)
                .add("opacity " + config.outro + "ms " + easing, {
                  fallback: safari,
                })
                .start({
                  opacity: 0,
                })
                .then(function () {
                  return fadeIn(config, $previous, $targets);
                });
            } else {
              // Skip the outro and play intro
              fadeIn(config, $previous, $targets);
            }
          } // Fade in the new target

          function fadeIn(config, $previous, $targets) {
            // Clear previous active class + styles touched by tram
            // We cannot remove the whole inline style because it could be dynamically bound
            $previous.removeClass(tabActive).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }); // Add active class to new target

            $targets.addClass(tabActive).each(ix.intro);
            Webflow.redraw.up(); // Set opacity immediately if intro is zero

            if (!config.intro) {
              return tram($targets).set({
                opacity: 1,
              });
            } // Otherwise fade in opacity

            tram($targets)
              .set({
                opacity: 0,
              })
              .redraw()
              .add("opacity " + config.intro + "ms " + config.easing, {
                fallback: safari,
              })
              .start({
                opacity: 1,
              });
          } // Export module

          return api;
        })
      );

      /***/
    },
    /* 29 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      // @wf-will-never-add-flow-to-this-file

      /* globals window, document */

      /* eslint-disable no-var */

      /**
       * Webflow: Maps widget
       */

      var Webflow = __webpack_require__(0);

      Webflow.define(
        "maps",
        (module.exports = function ($, _) {
          var api = {};
          var $doc = $(document);
          var google = null;
          var $maps;
          var namespace = ".w-widget-map"; // The API key is injected here from the Webflow Integrations tab on the site's dashboard

          var googleMapsApiKey = ""; // -----------------------------------
          // Module methods

          api.ready = function () {
            // Init Maps on the front-end
            if (!Webflow.env()) {
              initMaps();
            }
          };

          api.destroy = removeListeners; // -----------------------------------
          // Private methods

          function initMaps() {
            $maps = $doc.find(namespace);

            if (!$maps.length) {
              return;
            }

            if (google === null) {
              $.getScript(
                "https://maps.googleapis.com/maps/api/js?v=3.31&sensor=false&callback=_wf_maps_loaded&key=" +
                  googleMapsApiKey
              );
              window._wf_maps_loaded = mapsLoaded;
            } else {
              mapsLoaded();
            }

            function mapsLoaded() {
              window._wf_maps_loaded = function () {};

              google = window.google;
              $maps.each(renderMap);
              removeListeners();
              addListeners();
            }
          }

          function removeListeners() {
            Webflow.resize.off(resizeMaps);
            Webflow.redraw.off(resizeMaps);
          }

          function addListeners() {
            Webflow.resize.on(resizeMaps);
            Webflow.redraw.on(resizeMaps);
          } // Render map onto each element

          function renderMap(i, el) {
            var data = $(el).data();
            getState(el, data);
          }

          function resizeMaps() {
            $maps.each(resizeMap);
          } // Resize map when window changes

          function resizeMap(i, el) {
            var state = getState(el);
            google.maps.event.trigger(state.map, "resize");
            state.setMapPosition();
          } // Store state on element data

          var store = "w-widget-map";

          function getState(el, data) {
            var state = $.data(el, store);

            if (state) {
              return state;
            }

            var hasTooltip =
              typeof data.widgetTooltip === "string" &&
              data.widgetTooltip !== "";
            var $el = $(el);
            var title = $el.attr("title");
            var markerTitle = "Map pin";

            if (title && data.widgetTooltip) {
              markerTitle = "Map pin on "
                .concat(title, " showing location of ")
                .concat(data.widgetTooltip);
            } else if (title && !data.widgetTooltip) {
              markerTitle = "Map pin on ".concat(title);
            } else if (!title && data.widgetTooltip) {
              markerTitle = "Map pin showing location of ".concat(
                data.widgetTooltip
              );
            }

            state = $.data(el, store, {
              // Default options
              latLng: "51.511214,-0.119824",
              tooltip: "",
              style: "roadmap",
              zoom: 12,
              // Marker
              marker: new google.maps.Marker({
                draggable: false,
                title: markerTitle,
              }),
              // Tooltip infowindow
              infowindow: new google.maps.InfoWindow({
                disableAutoPan: true,
              }),
            }); // LatLng center point

            if (
              typeof data.widgetLatlng === "string" &&
              data.widgetLatlng.length !== ""
            ) {
              state.latLng = data.widgetLatlng;
            }

            var coords = state.latLng.split(",");
            var latLngObj = new google.maps.LatLng(coords[0], coords[1]);
            state.latLngObj = latLngObj; // Disable touch events

            var mapDraggable = !(Webflow.env.touch && !data.enableTouch); // Map instance

            state.map = new google.maps.Map(el, {
              center: state.latLngObj,
              zoom: state.zoom,
              maxZoom: 20,
              mapTypeControl: false,
              panControl: false,
              streetViewControl: false,
              scrollwheel: data.enableScroll,
              draggable: mapDraggable,
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
              },
              mapTypeId: state.style,
            });
            state.marker.setMap(state.map); // Set map position and offset

            state.setMapPosition = function () {
              state.map.setCenter(state.latLngObj);
              var offsetX = 0;
              var offsetY = 0;
              var padding = $el.css([
                "paddingTop",
                "paddingRight",
                "paddingBottom",
                "paddingLeft",
              ]);
              offsetX -= parseInt(padding.paddingLeft, 10);
              offsetX += parseInt(padding.paddingRight, 10);
              offsetY -= parseInt(padding.paddingTop, 10);
              offsetY += parseInt(padding.paddingBottom, 10);

              if (offsetX || offsetY) {
                state.map.panBy(offsetX, offsetY);
              }

              $el.css("position", ""); // Remove injected position
            }; // Fix position after first tiles have loaded

            google.maps.event.addListener(
              state.map,
              "tilesloaded",
              function () {
                google.maps.event.clearListeners(state.map, "tilesloaded");
                state.setMapPosition();
              }
            ); // Set initial position

            state.setMapPosition();
            state.marker.setPosition(state.latLngObj);
            state.infowindow.setPosition(state.latLngObj); // Draw tooltip

            if (hasTooltip) {
              var tooltip = data.widgetTooltip;
              state.tooltip = tooltip;
              state.infowindow.setContent(tooltip);

              if (!state.infowindowOpen) {
                state.infowindow.open(state.map, state.marker);
                state.infowindowOpen = true;
              }
            } // Map style - options.style

            var style = data.widgetStyle;

            if (style) {
              state.map.setMapTypeId(style);
            } // Zoom - options.zoom

            var zoom = data.widgetZoom;

            if (zoom != null) {
              state.zoom = zoom;
              state.map.setZoom(Number(zoom));
            } // Click marker to open in google maps

            google.maps.event.addListener(state.marker, "click", function () {
              window.open(
                "https://maps.google.com/?z=" +
                  state.zoom +
                  "&daddr=" +
                  state.latLng
              );
            });
            return state;
          } // Export module

          return api;
        })
      );

      /***/
    },
    /******/
  ]
);
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions: Init
 */
Webflow.require("ix").init([
  {
    slug: "hide-block-title",
    name: "Hide Block Title",
    value: {
      style: { opacity: 0, x: "0px", y: "-10px", z: "0px" },
      triggers: [],
    },
  },
  {
    slug: "hide-block-description",
    name: "Hide Block Description",
    value: {
      style: {
        title: "Hide Block Description",
        opacity: 0,
        x: "0px",
        y: "10px",
        z: "0px",
      },
      triggers: [],
    },
  },
  {
    slug: "hide-block-button",
    name: "Hide Block Button",
    value: { style: { opacity: 0 }, triggers: [] },
  },
  {
    slug: "hide-block-overlay",
    name: "Hide Block Overlay",
    value: { style: { display: "none", opacity: 0 }, triggers: [] },
  },
  {
    slug: "show-block-overlay",
    name: "Show Block Overlay",
    value: {
      style: {},
      triggers: [
        {
          type: "hover",
          selector: ".portfolio-overlay-block",
          descend: true,
          stepsA: [
            {
              display: "block",
              opacity: 1,
              transition: "opacity 400ms ease 0ms",
            },
          ],
          stepsB: [
            { opacity: 0, transition: "opacity 300ms ease 0ms" },
            { display: "none" },
          ],
        },
        {
          type: "hover",
          selector: ".portfolio-block-title",
          descend: true,
          preserve3d: true,
          stepsA: [
            { wait: 100 },
            {
              opacity: 1,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "-10px",
              z: "0px",
            },
          ],
        },
        {
          type: "hover",
          selector: ".portfolio-block-subtitle",
          descend: true,
          preserve3d: true,
          stepsA: [
            { wait: 100 },
            {
              opacity: 1,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "10px",
              z: "0px",
            },
          ],
        },
        {
          type: "hover",
          selector: ".button",
          descend: true,
          stepsA: [
            { wait: 200 },
            { opacity: 1, transition: "opacity 300ms ease 0ms" },
          ],
          stepsB: [{ opacity: 0, transition: "opacity 300ms ease 0ms" }],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-load",
    name: "Fade in on Load",
    value: {
      style: { opacity: 0, x: "0px", y: "30px", z: "0px" },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 200 },
            {
              display: "block",
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-load-2",
    name: "Fade in on Load 2",
    value: {
      style: { opacity: 0 },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 600 },
            {
              display: "block",
              opacity: 1,
              transition: "opacity 500ms ease 0ms",
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-load-3",
    name: "Fade in on Load 3",
    value: {
      style: { opacity: 0 },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 700 },
            { opacity: 1, transition: "opacity 500ms ease 0ms" },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-load-4",
    name: "Fade in on Load 4",
    value: {
      style: { opacity: 0 },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 800 },
            { opacity: 1, transition: "opacity 500ms ease 0ms" },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-scroll",
    name: "Fade in on Scroll",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "scroll",
          offsetBot: "6%",
          stepsA: [
            { wait: 200 },
            {
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-scroll-2",
    name: "Fade in on Scroll 2",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "scroll",
          offsetBot: "6%",
          stepsA: [
            { wait: 400 },
            {
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-scroll-3",
    name: "Fade in on Scroll 3",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "scroll",
          offsetBot: "6%",
          stepsA: [
            { wait: 600 },
            { opacity: 1, transition: "opacity 500ms ease 0ms" },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "slide-title",
    name: "Slide Title",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "slider",
          stepsA: [
            { wait: 300 },
            {
              opacity: 1,
              transition: "transform 400ms ease 0ms, opacity 400ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "20px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "slide-title-2",
    name: "Slide Title 2",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "slider",
          stepsA: [
            { wait: 500 },
            {
              opacity: 1,
              transition: "transform 400ms ease 0ms, opacity 400ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "20px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "slide-title-3",
    name: "Slide Title 3",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "slider",
          stepsA: [
            { wait: 600 },
            {
              opacity: 1,
              transition: "transform 400ms ease 0ms, opacity 400ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "20px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "slide-title-4",
    name: "Slide Title 4",
    value: {
      style: { opacity: 0, x: "0px", y: "20px", z: "0px" },
      triggers: [
        {
          type: "slider",
          stepsA: [
            { wait: 700 },
            {
              opacity: 1,
              transition: "transform 400ms ease 0ms, opacity 400ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              x: "0px",
              y: "20px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "mockup-fade-in",
    name: "Mockup Fade in",
    value: {
      style: { opacity: 0, x: "-50px", y: "0px", z: "0px" },
      triggers: [
        {
          type: "scroll",
          offsetBot: "10%",
          stepsA: [
            { wait: 500 },
            {
              opacity: 1,
              transition: "transform 800ms ease 0ms, opacity 800ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 400ms ease 0ms, opacity 400ms ease 0ms",
              x: "-50px",
              y: "0px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "mockup-fade-in-2",
    name: "Mockup Fade in 2",
    value: {
      style: { opacity: 0, x: "-50px", y: "0px", z: "0px" },
      triggers: [
        {
          type: "scroll",
          offsetBot: "10%",
          stepsA: [
            { wait: 700 },
            {
              opacity: 1,
              transition: "transform 800ms ease 0ms, opacity 800ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              opacity: 0,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              x: "-50px",
              y: "0px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "mockup-move",
    name: "Mockup Move",
    value: {
      style: { x: "50px", y: "0px", z: "0px" },
      triggers: [
        {
          type: "scroll",
          offsetBot: "10%",
          stepsA: [
            {
              transition: "transform 800ms ease 0ms",
              x: "-10px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [
            {
              transition: "transform 400ms ease 0ms",
              x: "50px",
              y: "0px",
              z: "0px",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "fade-in-zoom",
    name: "Fade in (Zoom)",
    value: {
      style: { opacity: 0, scaleX: 0.9, scaleY: 0.9, scaleZ: 1 },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 400 },
            {
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-zoom-2",
    name: "Fade in (Zoom) 2",
    value: {
      style: { opacity: 0, scaleX: 0.9, scaleY: 0.9, scaleZ: 1 },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 700 },
            {
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "fade-in-zoom-3",
    name: "Fade in (Zoom) 3",
    value: {
      style: { opacity: 0, scaleX: 0.9, scaleY: 0.9, scaleZ: 1 },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 800 },
            {
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "hide-popup",
    name: "Hide Popup",
    value: {
      style: {
        display: "none",
        opacity: 0,
        scaleX: 1.1,
        scaleY: 1.1,
        scaleZ: 1,
      },
      triggers: [],
    },
  },
  {
    slug: "close-popup",
    name: "Close Popup",
    value: {
      style: {},
      triggers: [
        {
          type: "click",
          selector: ".contact-popup",
          preserve3d: true,
          stepsA: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              scaleX: 1.1,
              scaleY: 1.1,
              scaleZ: 1,
            },
            { display: "none" },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "open-contact-popup",
    name: "Open Contact Popup",
    value: {
      style: {},
      triggers: [
        {
          type: "click",
          selector: ".contact-popup",
          preserve3d: true,
          stepsA: [
            {
              display: "flex",
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "hide-gallery-overlay",
    name: "Hide Gallery Overlay",
    value: { style: { display: "none", opacity: 0 }, triggers: [] },
  },
  {
    slug: "show-gallery-overlay",
    name: "Show Gallery Overlay",
    value: {
      style: {},
      triggers: [
        {
          type: "hover",
          selector: ".gallery-overlay-block",
          descend: true,
          stepsA: [
            {
              display: "block",
              opacity: 1,
              transition: "opacity 400ms ease 0ms",
            },
          ],
          stepsB: [
            { opacity: 0, transition: "opacity 300ms ease 0ms" },
            { display: "none" },
          ],
        },
      ],
    },
  },
  {
    slug: "fade-in-on-load-5",
    name: "Fade in on Load 5",
    value: {
      style: { opacity: 0, x: "0px", y: "30px", z: "0px" },
      triggers: [
        {
          type: "load",
          stepsA: [
            { wait: 200 },
            {
              display: "block",
              opacity: 0.5,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              x: "0px",
              y: "0px",
              z: "0px",
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "close-sign-up-popup",
    name: "Close Sign Up Popup",
    value: {
      style: {},
      triggers: [
        {
          type: "click",
          selector: ".sign-up-popup",
          preserve3d: true,
          stepsA: [
            {
              opacity: 0,
              transition: "transform 300ms ease 0ms, opacity 300ms ease 0ms",
              scaleX: 1.1,
              scaleY: 1.1,
              scaleZ: 1,
            },
            { display: "none" },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "open-sign-up-popup",
    name: "Open Sign Up Popup",
    value: {
      style: {},
      triggers: [
        {
          type: "click",
          selector: ".sign-up-popup",
          preserve3d: true,
          stepsA: [
            {
              display: "flex",
              opacity: 1,
              transition: "transform 500ms ease 0ms, opacity 500ms ease 0ms",
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "close-lightbox",
    name: "Close Lightbox",
    value: {
      style: {},
      triggers: [
        {
          type: "click",
          selector: ".portfolio-lightbox-overlay",
          stepsA: [
            { opacity: 0, transition: "opacity 300ms ease 0ms" },
            { display: "none" },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: "hide-lightbox",
    name: "Hide Lightbox",
    value: { style: { display: "none", opacity: 0 }, triggers: [] },
  },
  {
    slug: "show-lightbox",
    name: "Show Lightbox",
    value: {
      style: {},
      triggers: [
        {
          type: "click",
          selector: ".portfolio-lightbox-overlay",
          siblings: true,
          stepsA: [
            {
              display: "flex",
              opacity: 1,
              transition: "opacity 500ms ease 0ms",
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
]);
