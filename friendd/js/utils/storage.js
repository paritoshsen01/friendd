/* Storage Utility */
var PREFIX = 'friendd_';

function setStorage(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { console.warn('Storage write failed:', e); }
}

function getStorage(key, fallback) {
  if (fallback === undefined) fallback = null;
  try {
    var item = localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) { console.warn('Storage read failed:', e); return fallback; }
}

function removeStorage(key) {
  try { localStorage.removeItem(PREFIX + key); } catch (e) { console.warn('Storage removal failed:', e); }
}

function clearStorage() {
  try {
    var keys = Object.keys(localStorage).filter(function(k) { return k.startsWith(PREFIX); });
    keys.forEach(function(k) { localStorage.removeItem(k); });
  } catch (e) { console.warn('Storage clear failed:', e); }
}

