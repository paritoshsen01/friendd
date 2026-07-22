/* Radar Component */
var MOCK_USERS_RADAR = [
  { id: 'u1', name: 'Emma Wilson', age: 24, distance: 0.3, angle: 45, online: true, avatar: null, interests: ['yoga', 'coffee', 'reading'] },
  { id: 'u2', name: 'Liam Chen', age: 27, distance: 0.8, angle: 120, online: true, avatar: null, interests: ['gaming', 'tech', 'music'] },
  { id: 'u3', name: 'Sofia Garcia', age: 22, distance: 0.5, angle: 200, online: false, avatar: null, interests: ['art', 'photography', 'travel'] },
  { id: 'u4', name: 'Noah Patel', age: 26, distance: 1.2, angle: 300, online: true, avatar: null, interests: ['fitness', 'cooking', 'movies'] },
  { id: 'u5', name: 'Olivia Brown', age: 23, distance: 0.6, angle: 80, online: true, avatar: null, interests: ['dancing', 'fashion', 'music'] },
  { id: 'u6', name: 'Ethan Davis', age: 25, distance: 1.0, angle: 160, online: false, avatar: null, interests: ['hiking', 'photography', 'dogs'] },
  { id: 'u7', name: 'Ava Martinez', age: 21, distance: 0.4, angle: 270, online: true, avatar: null, interests: ['painting', 'reading', 'cats'] },
  { id: 'u8', name: 'Mason Lee', age: 28, distance: 1.5, angle: 30, online: true, avatar: null, interests: ['cars', 'tech', 'sports'] },
];

function renderRadar() {
  var RINGS = 4;
  var radarSize = 280;
  var center = radarSize / 2;
  var maxRadius = center - 20;
  var ringGap = maxRadius / RINGS;

  var ringsHtml = '';
  for (var r = 1; r <= RINGS; r++) {
    var ringRadius = ringGap * r;
    ringsHtml += '<div class="radar-ring" style="width:' + (ringRadius * 2) + 'px;height:' + (ringRadius * 2) + 'px;"></div>';
  }

  var usersHtml = '';
  for (var i = 0; i < MOCK_USERS_RADAR.length; i++) {
    var u = MOCK_USERS_RADAR[i];
    var dotDistance = (u.distance / 1.5) * maxRadius;
    var rad = u.angle * Math.PI / 180;
    var x = center + dotDistance * Math.cos(rad) - 6;
    var y = center + dotDistance * Math.sin(rad) - 6;
    var onlineClass = u.online ? ' online' : ' offline';
    usersHtml += '<div class="radar-user-dot' + onlineClass + '" style="left:' + x + 'px;top:' + y + 'px;" data-user-id="' + u.id + '" title="' + u.name + ' - ' + u.distance.toFixed(1) + 'km">' +
      '<div class="radar-dot-inner"></div><div class="radar-dot-pulse"></div>';
  }

  return '' +
    '<div class="radar-container" id="radar-container">' +
      '<div class="radar-display" id="radar-display" style="width:' + radarSize + 'px;height:' + radarSize + 'px;">' +
        '<div class="radar-scan-base">' + ringsHtml +
          '<div class="radar-center-dot"></div><div class="radar-beam"></div><div class="radar-center-glow"></div>' +
        '</div>' +
        '<div class="radar-dots-layer">' + usersHtml + '</div>' +
      '</div>' +
      '<div class="radar-label"><span>NEARBY</span><span class="radar-count">' + MOCK_USERS_RADAR.length + '</span></div>' +
      '<div class="radar-info" id="radar-info"><span class="radar-info-text">Scanning for people near you\u2026</span></div>' +
      '<div class="radar-toast" id="radar-toast"></div>' +
    '</div>';
}

function initRadar() {
  var container = document.getElementById('radar-container');
  if (!container) return;

  var dots = container.querySelectorAll('.radar-user-dot');
  for (var i = 0; i < dots.length; i++) {
    (function(dot) {
      dot.addEventListener('click', function() {
        var userId = dot.getAttribute('data-user-id');
        var user = null;
        for (var j = 0; j < MOCK_USERS_RADAR.length; j++) {
          if (MOCK_USERS_RADAR[j].id === userId) { user = MOCK_USERS_RADAR[j]; break; }
        }
        if (user) showRadarUserCard(user);
      });
    })(dots[i]);
  }

  var display = document.getElementById('radar-display');
  if (display) {
    display.addEventListener('mouseleave', function() { hideRadarUserCard(); });
  }
}

function showRadarUserCard(user) {
  var info = document.getElementById('radar-info');
  if (!info) return;

  var initial = user.name ? user.name.charAt(0).toUpperCase() : '?';
  var interestsHtml = '';
  if (user.interests) {
    for (var i = 0; i < user.interests.length; i++) {
      interestsHtml += '<span class="tag tag-sm">' + user.interests[i] + '</span>';
    }
  }

  info.innerHTML = '' +
    '<div class="radar-user-card page-enter">' +
      '<div class="radar-user-card-avatar"><span>' + initial + '</span></div>' +
      '<div class="radar-user-card-info">' +
        '<div class="radar-user-card-name">' + user.name + ', ' + user.age + '</div>' +
        '<div class="radar-user-card-distance">' + formatDistance(user.distance) + ' away ' + (user.online ? '\u25CF Online' : '\u25CF Offline') + '</div>' +
        '<div class="radar-card-interests">' + interestsHtml + '</div>' +
        '<button class="btn btn-primary btn-sm" style="margin-top:var(--space-3);">Say Hello</button>' +
      '</div>' +
    '</div>';
}

function hideRadarUserCard() {
  var info = document.getElementById('radar-info');
  if (info) { info.innerHTML = '<span class="radar-info-text">Tap a dot to see who\u2019s nearby</span>'; }
}

function showRadarToast(message, type) {
  if (!type) type = 'info';
  var toast = document.getElementById('radar-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'radar-toast toast-' + type + ' show';
  setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

