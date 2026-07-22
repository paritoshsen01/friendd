/* Simple Client-Side Router (works with file:// and http://) */
var router = null;

(function() {
  'use strict';
  // Detect if we're running from file:// protocol
  var IS_FILE_PROTOCOL = window.location.protocol === 'file:';

  function normalizePath(path) {
    if (!path || path === '/') return '/';
    if (path.charAt(0) !== '/') path = '/' + path;
    if (path === '/friendd' || path === '/friendd/') return '/';
    if (path.startsWith('/friendd/')) {
      return path.slice('/friendd'.length) || '/';
    }
    if (path.length > 1 && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  }

  function getBasePath() {
    var pathname = window.location.pathname || '/';
    if (!pathname || pathname === '/') return '/';
    if (pathname.indexOf('/friendd') === 0) return '/friendd';
    return '/';
  }

  function toAppPath(path) {
    path = normalizePath(path);
    var basePath = getBasePath();
    if (basePath === '/') return path;
    return path === '/' ? basePath + '/' : basePath + path;
  }

  function getCurrentPath() {
    if (IS_FILE_PROTOCOL) {
      var hash = window.location.hash || '#/';
      var path = normalizePath(hash.replace(/^#/, '') || '/');
      return path;
    } else {
      var pathname = window.location.pathname || '/';
      var basePath = getBasePath();
      if (basePath !== '/' && pathname.indexOf(basePath) === 0) {
        pathname = pathname.slice(basePath.length) || '/';
      }
      return normalizePath(pathname);
    }
  }

  function setPath(path) {
    path = normalizePath(path);
    if (IS_FILE_PROTOCOL) {
      window.location.hash = '#' + path;
    } else {
      history.pushState({}, '', toAppPath(path));
    }
  }

  function Router() {
    this.routes = new Map();
    this._currentRoute = null;
    this._beforeHooks = [];
    this._afterHooks = [];
    this._params = {};

    var self = this;

    window.addEventListener('popstate', function() { self._handleRoute(); });
    if (IS_FILE_PROTOCOL) {
      window.addEventListener('hashchange', function() { self._handleRoute(); });
    }

    document.addEventListener('click', function(e) {
      var link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        self.navigate(link.getAttribute('href'));
      }
    });
  }

  Router.prototype.add = function(path, handler, options) {
    if (!options) options = {};
    this.routes.set(path, { handler: handler, options: options });
    return this;
  };

  Router.prototype.beforeEach = function(fn) {
    this._beforeHooks.push(fn);
    return this;
  };

  Router.prototype.afterEach = function(fn) {
    this._afterHooks.push(fn);
    return this;
  };

  Router.prototype.navigate = function(path, state) {
    if (!state) state = {};
    this._currentRoute = path;
    setPath(path);
    if (!IS_FILE_PROTOCOL) {
      this._handleRoute();
    }
  };

  Router.prototype.replace = function(path, state) {
    if (!state) state = {};
    if (IS_FILE_PROTOCOL) {
      window.location.replace('#' + path);
    } else {
      history.replaceState(state, '', path);
      this._handleRoute();
    }
  };

  // Public method called by app.js
  Router.prototype.handleRoute = function() {
    this._handleRoute();
  };

  Router.prototype._handleRoute = function() {
    var path = getCurrentPath();
    var from = this._currentRoute;
    var match = this._matchRoute(path);
    var self = this;

    if (match) {
      this._params = match.params;

      function runHooks(index) {
        if (index >= self._beforeHooks.length) {
          self._executeRoute(match.route, path, from);
          return;
        }
        var result = self._beforeHooks[index](path, from);
        if (result && result.then) {
          result.then(function(val) { if (val !== false) runHooks(index + 1); });
        } else if (result !== false) {
          runHooks(index + 1);
        }
      }
      runHooks(0);
    } else {
      var notFound = this.routes.get('*');
      if (notFound) {
        this._params = {};
        this._executeRoute(notFound, path, from);
      } else {
        console.warn('[Router] No matching route for:', path);
      }
    }
  };

  Router.prototype._executeRoute = function(route, path, from) {
    this._currentRoute = path;
    var app = document.getElementById('app');
    var self = this;

    if (app) { app.style.opacity = '0'; }

    var result = route.handler(this._params || {});

    function afterExec() {
      if (app) { app.style.opacity = '1'; }
      for (var i = 0; i < self._afterHooks.length; i++) {
        self._afterHooks[i](path, from);
      }
    }

    if (result && result.then) {
      result.then(afterExec);
    } else {
      afterExec();
    }
  };

  Router.prototype._matchRoute = function(path) {
    var entries = Array.from(this.routes.entries());
    for (var i = 0; i < entries.length; i++) {
      var pattern = entries[i][0];
      var route = entries[i][1];
      if (pattern === '*') continue;

      var patternParts = pattern.split('/');
      var pathParts = path.split('/');
      if (patternParts.length !== pathParts.length) continue;

      var params = {};
      var match = true;
      for (var j = 0; j < patternParts.length; j++) {
        if (patternParts[j].startsWith(':')) {
          params[patternParts[j].slice(1)] = decodeURIComponent(pathParts[j]);
        } else if (patternParts[j] !== pathParts[j]) {
          match = false;
          break;
        }
      }
      if (match) return { route: route, params: params };
    }
    return null;
  };

  router = new Router();
})();
