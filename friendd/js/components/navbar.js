/* Navigation Bar Component */
function getCurrentRoutePath() {
  if (window.location.protocol === 'file:') {
    var hash = window.location.hash || '#/';
    return hash.replace(/^#/, '') || '/';
  }
  return window.location.pathname;
}

function renderNavbar() {
  var user = getCurrentUser();
  var isLoggedIn = isAuthenticated();
  var path = getCurrentRoutePath();

  var navLinks = [
    { href: '/', label: 'Home', icon: '\u{1F3E0}' },
    { href: '/discover', label: 'Discover', icon: '\u{1F50D}' },
    { href: '/messages', label: 'Messages', icon: '\u{1F4AC}' },
    { href: '/events', label: 'Events', icon: '\u{1F4C5}' },
  ];

  var linksHtml = '';
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var activeClass = path === link.href ? ' active' : '';
    linksHtml += '<a href="' + link.href + '" class="navbar-link' + activeClass + '" data-link>' + link.label + '</a>';
  }

  var mobileLinksHtml = '';
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var activeClass = path === link.href ? ' active' : '';
    mobileLinksHtml += '<a href="' + link.href + '" class="navbar-mobile-link' + activeClass + '" data-link>' + link.icon + ' ' + link.label + '</a>';
  }

  var actionsHtml = '';
  if (isLoggedIn) {
    var initial = (user && user.name) ? user.name.charAt(0).toUpperCase() : '?';
    actionsHtml = '<button class="btn btn-ghost btn-icon" id="notif-btn" title="Notifications">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' +
        '</svg></button>' +
      '<div class="user-avatar-sm" id="user-menu-btn"><span>' + initial + '</span></div>';
  } else {
    actionsHtml = '<a href="/login" class="btn btn-ghost btn-sm" data-link><span>Sign In</span></a>' +
      '<a href="/signup" class="btn btn-primary btn-sm" data-link><span>Get Started</span></a>';
  }

  var mobileActionsHtml = '';
  if (isLoggedIn) {
    mobileActionsHtml = '<hr style="border-color:var(--color-divider);margin:var(--space-4) 0;">' +
      '<a href="/profile" class="navbar-mobile-link" data-link>\u{1F464} Profile</a>' +
      '<button class="navbar-mobile-link" id="mobile-signout" style="color:var(--color-error);text-align:left;width:100%;background:none;border:none;padding:var(--space-3) var(--space-4);cursor:pointer;">\u{1F6AA} Sign Out</button>';
  } else {
    mobileActionsHtml = '<hr style="border-color:var(--color-divider);margin:var(--space-4) 0;">' +
      '<a href="/login" class="btn btn-ghost btn-block" data-link>Sign In</a>' +
      '<a href="/signup" class="btn btn-primary btn-block" data-link>Get Started</a>';
  }

  return '' +
    '<nav class="navbar" id="navbar">' +
      '<div class="navbar-inner">' +
        '<a href="/" class="navbar-logo" data-link>' +
          '<div class="navbar-logo-icon glow-text">F</div>' +
          '<span>Friendd</span>' +
        '</a>' +
        '<div class="navbar-links">' + linksHtml + '</div>' +
        '<div class="navbar-actions">' + actionsHtml +
          '<button class="navbar-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">' +
            '<div class="navbar-toggle-icon"><span></span><span></span><span></span></div>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="navbar-mobile-menu" id="mobile-menu">' + mobileLinksHtml + mobileActionsHtml + '</div>' +
    '</nav>';
}

function initNavbar() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
    });
  }

  var mobileLinks = document.querySelectorAll('.navbar-mobile-link[data-link]');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function() {
      if (toggle) toggle.classList.remove('active');
      if (menu) menu.classList.remove('open');
    });
  }

  var signoutBtn = document.getElementById('mobile-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', function() {
      signOut();
      router.navigate('/');
    });
  }
}

