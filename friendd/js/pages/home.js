/* Home Page */
function renderHomePage() {
  return '' +
    '<section class="hero">' +
      '<div class="hero-content">' +
        '<div class="hero-badge page-enter"><span>\u2728</span><span>New people are joining every day</span></div>' +
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
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-6);max-width:960px;margin:0 auto;">' +
          '<div class="glass-card" style="padding:var(--space-8);text-align:center;">' +
            '<p style="font-size:2.5rem;margin-bottom:var(--space-4);">\u{1F4CD}</p>' +
            '<h3 style="font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-2);">Radar Discovery</h3>' +
            '<p class="text-secondary">See who\'s around you with our animated radar view</p>' +
          '</div>' +
          '<div class="glass-card" style="padding:var(--space-8);text-align:center;">' +
            '<p style="font-size:2.5rem;margin-bottom:var(--space-4);">\u{1F91D}</p>' +
            '<h3 style="font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-2);">Shared Interests</h3>' +
            '<p class="text-secondary">Connect over common hobbies and passions</p>' +
          '</div>' +
          '<div class="glass-card" style="padding:var(--space-8);text-align:center;">' +
            '<p style="font-size:2.5rem;margin-bottom:var(--space-4);">\u{1F512}</p>' +
            '<h3 style="font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-2);">Privacy First</h3>' +
            '<p class="text-secondary">Stay in control of your profile and who sees you</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
}

function initHomePage() {}
