/* Friendd - Main Application Entry Point */
(function() {
  'use strict';

  function initApp() {
    var loader = document.getElementById('loading-overlay');

    // Initialize auth
    initAuth();

    // Setup routes
    setupRoutes();

    // Render and init navbar
    var navbarRoot = document.getElementById('navbar-root');
    if (navbarRoot) {
      navbarRoot.innerHTML = renderNavbar();
      initNavbar();
    }

    // Handle current route
    router.handleRoute();

    // Hide loading overlay
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function() {
        if (loader.parentNode) { loader.remove(); }
      }, 400);
    }
  }

  function setupRoutes() {
    router.add('/', function() {
      var app = document.getElementById('app');
      if (app) { app.innerHTML = renderHomePage(); initHomePage(); }
    });

    router.add('/login', function() {
      var app = document.getElementById('app');
      if (app) { app.innerHTML = renderLoginPage(); initLoginPage(); }
    });

    router.add('/signup', function() {
      var app = document.getElementById('app');
      if (app) { app.innerHTML = renderSignupPage(); initSignupPage(); }
    });

    router.add('/discover', function() {
      var app = document.getElementById('app');
      if (app) { app.innerHTML = renderDiscoverPage(); initDiscoverPage(); }
    });

    router.add('/profile', function() {
      var app = document.getElementById('app');
      if (app) { app.innerHTML = renderProfilePage(); initProfilePage(); }
    });

    router.add('/settings', function() {
      var app = document.getElementById('app');
      if (app) { app.innerHTML = renderSettingsPage(); initSettingsPage(); }
    });

    router.add('/messages', function() {
      var app = document.getElementById('app');
      if (app) {
        app.innerHTML = '<div class="section"><div class="section-header page-enter">' +
          '<h1 class="section-title">Messages</h1>' +
          '<p class="section-subtitle">Connect and chat with friends near you</p>' +
          '</div><div class="glass-card" style="max-width:600px;margin:0 auto;padding:var(--space-16) var(--space-6);text-align:center;">' +
          '<p class="text-secondary" style="font-size:var(--font-size-lg);">\u{1F4AC}</p>' +
          '<p class="text-secondary" style="margin-top:var(--space-4);">Messages coming soon</p></div>';
      }
    });

    router.add('/events', function() {
      var app = document.getElementById('app');
      if (app) {
        app.innerHTML = '<div class="section"><div class="section-header page-enter">' +
          '<h1 class="section-title">Events</h1>' +
          '<p class="section-subtitle">Discover events happening near you</p>' +
          '</div><div class="glass-card" style="max-width:600px;margin:0 auto;padding:var(--space-16) var(--space-6);text-align:center;">' +
          '<p class="text-secondary" style="font-size:var(--font-size-lg);">\u{1F4C5}</p>' +
          '<p class="text-secondary" style="margin-top:var(--space-4);">Events coming soon</p></div>';
      }
    });

    router.add('*', function() {
      var app = document.getElementById('app');
      if (app) {
        app.innerHTML = renderHomePage();
        initHomePage();
      }
    });
  }

  // Start app on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
