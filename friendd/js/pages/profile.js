/* Profile Page */
function renderProfilePage() {
  var user = getCurrentUser();
  if (!user) {
    return '<div class="section" style="text-align:center;padding:var(--space-16) var(--space-4);">' +
      '<div class="glass-card" style="max-width:400px;margin:0 auto;padding:var(--space-8);">' +
        '<p class="text-secondary" style="margin-bottom:var(--space-4);">Please sign in to view your profile</p>' +
        '<a href="/login" class="btn btn-primary" data-link>Sign In</a>' +
      '</div>';
  }

  var initial = user.name ? user.name.charAt(0).toUpperCase() : '?';
  var interestsHtml = '';
  if (user.interests && user.interests.length > 0) {
    for (var i = 0; i < user.interests.length; i++) {
      interestsHtml += '<span class="tag">' + user.interests[i] + '</span> ';
    }
  } else {
    interestsHtml = '<span class="text-muted" style="font-size:var(--font-size-sm);">No interests added yet</span>';
  }

  return '' +
    '<div class="page-enter">' +
      '<div class="profile-cover" style="background:linear-gradient(135deg,var(--color-accent-dim),var(--color-bg-secondary));height:200px;position:relative;"></div>' +
      '<div class="container" style="margin-top:-60px;position:relative;z-index:1;">' +
        '<div class="glass-card" style="max-width:700px;margin:0 auto;padding:var(--space-8);">' +
          '<div style="display:flex;align-items:center;gap:var(--space-6);flex-wrap:wrap;">' +
            '<div class="user-avatar-sm" style="width:80px;height:80px;font-size:2rem;border:3px solid var(--color-accent);flex-shrink:0;">' + initial + '</div>' +
            '<div style="flex:1;">' +
              '<h2 style="font-size:var(--font-size-2xl);font-weight:var(--font-weight-bold);">' + (user.name || 'User') + '</h2>' +
              '<p class="text-secondary">' + (user.bio || 'No bio yet') + '</p>' +
            '</div>' +
          '</div>' +
          '<hr style="border-color:var(--color-divider);margin:var(--space-6) 0;">' +
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);text-align:center;margin-bottom:var(--space-6);">' +
            '<div><div style="font-size:var(--font-size-2xl);font-weight:var(--font-weight-bold);color:var(--color-accent);">' + MOCK_USERS_RADAR.length + '</div><div class="text-muted" style="font-size:var(--font-size-sm);">Nearby</div>' +
            '<div><div style="font-size:var(--font-size-2xl);font-weight:var(--font-weight-bold);color:var(--color-accent);">12</div><div class="text-muted" style="font-size:var(--font-size-sm);">Connections</div>' +
            '<div><div style="font-size:var(--font-size-2xl);font-weight:var(--font-weight-bold);color:var(--color-accent);">' + ((user.interests && user.interests.length) || 0) + '</div><div class="text-muted" style="font-size:var(--font-size-sm);">Interests</div>' +
          '</div>' +
          '<div style="margin-bottom:var(--space-6);">' +
            '<h4 style="font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted);margin-bottom:var(--space-3);">Interests</h4>' +
            '<div style="display:flex;flex-wrap:wrap;gap:var(--space-2);">' + interestsHtml + '</div>' +
          '</div>' +
          '<div style="display:flex;gap:var(--space-3);">' +
            '<a href="/settings" class="btn btn-primary" data-link>Edit Profile</a>' +
            '<button class="btn btn-ghost" id="profile-signout">Sign Out</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function initProfilePage() {
  var signoutBtn = document.getElementById('profile-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', function() {
      signOut();
      router.navigate('/');
    });
  }
}

