/* Settings Page */
var ALL_INTERESTS = ['travel', 'music', 'photography', 'yoga', 'coffee', 'reading', 'gaming', 'tech', 'art', 'fitness', 'cooking', 'movies', 'dancing', 'fashion', 'hiking', 'dogs', 'cats', 'sports', 'cars'];

function renderSettingsPage() {
  var user = getCurrentUser();
  if (!user) {
    return '<div class="section" style="text-align:center;padding:var(--space-16) var(--space-4);">' +
      '<div class="glass-card" style="max-width:400px;margin:0 auto;padding:var(--space-8);">' +
        '<p class="text-secondary" style="margin-bottom:var(--space-4);">Please sign in to edit settings</p>' +
        '<a href="/login" class="btn btn-primary" data-link>Sign In</a>' +
      '</div>';
  }

  var interestsCheckboxes = '';
  for (var i = 0; i < ALL_INTERESTS.length; i++) {
    var interest = ALL_INTERESTS[i];
    var checked = (user.interests && user.interests.indexOf(interest) !== -1) ? 'checked' : '';
    var label = interest.charAt(0).toUpperCase() + interest.slice(1);
    interestsCheckboxes += '<label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer;">' +
      '<input type="checkbox" name="interests" value="' + interest + '" ' + checked + ' style="accent-color:var(--color-accent);">' +
      '<span>' + label + '</span></label>';
  }

  return '' +
    '<div class="section page-enter">' +
      '<div class="container container-narrow">' +
        '<div class="section-header">' +
          '<h1 class="section-title">Settings</h1>' +
          '<p class="section-subtitle">Manage your profile and preferences</p>' +
        '</div>' +
        '<div class="glass-card" style="padding:var(--space-8);">' +
          '<form id="settings-form">' +
            '<div class="input-group">' +
              '<label class="input-label" for="settings-name">Name</label>' +
              '<input type="text" id="settings-name" class="input" value="' + escHtml(user.name || '') + '" />' +
            '</div>' +
            '<div class="input-group">' +
              '<label class="input-label" for="settings-bio">Bio</label>' +
              '<textarea id="settings-bio" class="input" rows="3" placeholder="Tell people about yourself">' + escHtml(user.bio || '') + '</textarea>' +
            '</div>' +
            '<div class="input-group">' +
              '<label class="input-label">Interests</label>' +
              '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:var(--space-2);">' + interestsCheckboxes + '</div>' +
            '</div>' +
            '<div style="margin-top:var(--space-6);display:flex;flex-direction:column;gap:var(--space-3);">' +
              '<label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;"><span>Discoverable</span><input type="checkbox" id="setting-discoverable" checked style="accent-color:var(--color-accent);" /></label>' +
              '<label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;"><span>Online Status</span><input type="checkbox" id="setting-online" checked style="accent-color:var(--color-accent);" /></label>' +
              '<label style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;"><span>Notifications</span><input type="checkbox" id="setting-notifications" checked style="accent-color:var(--color-accent);" /></label>' +
            '</div>' +
            '<div id="settings-feedback" style="margin-top:var(--space-4);"></div>' +
            '<button type="submit" class="btn btn-primary btn-block" style="margin-top:var(--space-6);" id="settings-submit"><span>Save Changes</span></button>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function initSettingsPage() {
  var form = document.getElementById('settings-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('settings-name');
    var bio = document.getElementById('settings-bio');
    var feedback = document.getElementById('settings-feedback');
    var submitBtn = document.getElementById('settings-submit');
    var selectedInterests = document.querySelectorAll('input[name="interests"]:checked');
    var interests = [];
    for (var i = 0; i < selectedInterests.length; i++) {
      interests.push(selectedInterests[i].value);
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<span>Saving\u2026</span>'; }

    updateProfile({ name: name.value, bio: bio.value, interests: interests }).then(function(updatedUser) {
      if (feedback) {
        feedback.innerHTML = '<p class="text-success" style="font-size:var(--font-size-sm);">\u2713 Settings saved successfully</p>';
      }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<span>Save Changes</span>'; }
      setTimeout(function() { if (feedback) feedback.innerHTML = ''; }, 3000);
    }).catch(function(err) {
      if (feedback) {
        feedback.innerHTML = '<p class="text-error" style="font-size:var(--font-size-sm);">\u2717 ' + (err.message || 'Failed to save') + '</p>';
      }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<span>Save Changes</span>'; }
    });
  });
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '&#039;');
}

