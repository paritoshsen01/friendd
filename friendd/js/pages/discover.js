/* Discover Page */
function renderDiscoverPage() {
  var isLoggedIn = isAuthenticated();

  return '' +
    '<div class="section page-enter">' +
      '<div class="container">' +
        '<div class="section-header">' +
          '<h1 class="section-title">Discover</h1>' +
          '<p class="section-subtitle">Find people near you who share your interests</p>' +
        '</div>' +
        (isLoggedIn ? '' : '<div class="glass-card" style="max-width:500px;margin:0 auto var(--space-8);padding:var(--space-6);text-align:center;"><p class="text-secondary" style="margin-bottom:var(--space-4);">Sign in to see who\'s nearby</p><a href="/login" class="btn btn-primary" data-link>Sign In</a></div>') +
        '<div style="display:flex;flex-direction:column;align-items:center;">' +
          renderRadar() +
        '</div>' +
        '<div style="margin-top:var(--space-8);">' +
          '<h3 style="font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-4);">Nearby Users</h3>' +
          '<div id="nearby-users-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-4);">' +
            renderNearbyUsersList() +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function renderNearbyUsersList() {
  var html = '';
  for (var i = 0; i < MOCK_USERS_RADAR.length; i++) {
    var u = MOCK_USERS_RADAR[i];
    var initial = u.name.charAt(0).toUpperCase();
    var interestsHtml = '';
    if (u.interests) {
      for (var j = 0; j < u.interests.length; j++) {
        interestsHtml += '<span class="tag tag-sm">' + u.interests[j] + '</span> ';
      }
    }
    html += '' +
      '<div class="glass-card" style="padding:var(--space-4);display:flex;align-items:center;gap:var(--space-4);cursor:pointer;" data-user-id="' + u.id + '">' +
        '<div class="user-avatar-sm" style="width:48px;height:48px;font-size:var(--font-size-lg);flex-shrink:0;">' + initial + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-weight:var(--font-weight-semibold);">' + u.name + ', ' + u.age + '</div>' +
          '<div style="font-size:var(--font-size-sm);color:var(--color-text-muted);">' + formatDistance(u.distance) + ' away ' + (u.online ? '\u25CF Online' : '\u25CF Offline') + '</div>' +
          '<div style="margin-top:var(--space-2);display:flex;flex-wrap:wrap;gap:var(--space-1);">' + interestsHtml + '</div>' +
        '</div>' +
      '</div>';
  }
  return html;
}

function initDiscoverPage() {
  initRadar();

  var items = document.querySelectorAll('[data-user-id]');
  for (var i = 0; i < items.length; i++) {
    (function(item) {
      item.addEventListener('click', function() {
        var userId = item.getAttribute('data-user-id');
        var dot = document.querySelector('.radar-user-dot[data-user-id="' + userId + '"]');
        if (dot) {
          dot.classList.add('highlight-pulse');
          setTimeout(function() { dot.classList.remove('highlight-pulse'); }, 2000);
          var radarDisplay = document.getElementById('radar-display');
          if (radarDisplay) { radarDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        }
      });
    })(items[i]);
  }
}

