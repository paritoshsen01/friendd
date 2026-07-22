/* Home Page */
function renderHomePage() {
  return '' +
    '<section class="hero">' +
      '<div class="hero-content">' +
        '<div class="hero-badge page-enter"><span>✨</span><span>New people are joining every day</span></div>' +
        '<h1 class="hero-title">Discover Friends<br>in Your <span class="highlight">Radius</span></h1>' +
        '<p class="hero-description">Friendd helps you find and connect with people near you who share your interests. Explore your community, make new connections, and grow your circle.</p>' +
        '<div class="hero-actions">' +
          '<a href="/signup" class="btn btn-primary btn-lg" data-link><span>Get Started Free</span></a>' +
          '<a href="/discover" class="btn btn-ghost btn-lg" data-link><span>Explore</span></a>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section class="section">' +
      '<div class="container">' +
        '<div class="section-header page-enter">' +
          '<h2 class="section-title">Why Friendd?</h2>' +
          '<p class="section-subtitle">Built for real connections in your neighborhood</p>' +
        '</div>' +
        '<div class="feature-grid">' +
          '<div class="glass-card feature-card">' +
            '<div class="icon">📍</div>' +
            '<h3>Radar Discovery</h3>' +
            '<p class="text-secondary">See who\'s around you with our animated radar view</p>' +
          '</div>' +
          '<div class="glass-card feature-card">' +
            '<div class="icon">🤝</div>' +
            '<h3>Shared Interests</h3>' +
            '<p class="text-secondary">Connect over common hobbies and passions</p>' +
          '</div>' +
          '<div class="glass-card feature-card">' +
            '<div class="icon">🔒</div>' +
            '<h3>Privacy First</h3>' +
            '<p class="text-secondary">Stay in control of your profile and who sees you</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}

function initHomePage() {}
