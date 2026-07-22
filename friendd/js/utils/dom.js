/* DOM Utility Functions */
function $(selector, context) {
  if (!context) context = document;
  return context.querySelector(selector);
}

function $$(selector, context) {
  if (!context) context = document;
  return context.querySelectorAll(selector);
}

function createElement(tag, attrs, children) {
  if (!attrs) attrs = {};
  if (!children) children = [];
  var el = document.createElement(tag);
  for (var key in attrs) {
    if (!attrs.hasOwnProperty(key)) continue;
    var value = attrs[key];
    if (key === 'className') { el.className = value; }
    else if (key === 'dataset') { Object.assign(el.dataset, value); }
    else if (key === 'style' && typeof value === 'object') { Object.assign(el.style, value); }
    else if (key.startsWith('on') && typeof value === 'function') { el.addEventListener(key.slice(2).toLowerCase(), value); }
    else if (key === 'htmlContent') { el.innerHTML = value; }
    else if (value !== undefined && value !== null) { el.setAttribute(key, value); }
  }
  if (typeof children === 'string') { el.textContent = children; }
  else if (Array.isArray(children)) {
    children.forEach(function(child) {
      if (child instanceof HTMLElement) { el.appendChild(child); }
      else if (typeof child === 'string') { el.appendChild(document.createTextNode(child)); }
    });
  }
  return el;
}

function emptyElement(el) { while (el.firstChild) { el.removeChild(el.firstChild); } }
function toggleClass(el, className, force) { el.classList.toggle(className, force); }

function addListener(el, event, handler, options) {
  if (!options) options = {};
  el.addEventListener(event, handler, options);
  return function() { el.removeEventListener(event, handler, options); };
}

function debounce(fn, delay) {
  if (!delay) delay = 300;
  var timer;
  return function() {
    var args = arguments;
    var ctx = this;
    clearTimeout(timer);
    timer = setTimeout(function() { fn.apply(ctx, args); }, delay);
  };
}

function throttle(fn, limit) {
  if (!limit) limit = 300;
  var inThrottle = false;
  return function() {
    var args = arguments;
    var ctx = this;
    if (!inThrottle) {
      fn.apply(ctx, args);
      inThrottle = true;
      setTimeout(function() { inThrottle = false; }, limit);
    }
  };
}

function timeAgo(date) {
  var now = new Date();
  var then = new Date(date);
  var seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return 'just now';
  var minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + 'm ago';
  var hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + 'h ago';
  var days = Math.floor(hours / 24);
  if (days < 7) return days + 'd ago';
  var weeks = Math.floor(days / 7);
  if (weeks < 4) return weeks + 'w ago';
  return then.toLocaleDateString();
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
}

function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

