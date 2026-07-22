/* Signup Page */
function renderSignupPage() {
  return '' +
    '<section class="auth-shell">' +
      '<div class="auth-card glass-card">' +
        '<div class="auth-card__header">' +
          '<div class="auth-brand">' +
            '<div class="navbar-logo-icon glow-text">F</div>' +
            '<div>' +
              '<h2>Create account</h2>' +
              '<p>Join Friendd and meet new people</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<form id="signup-form" class="auth-form">' +
          '<div class="form-group">' +
            '<label class="form-label" for="signup-name">Full Name</label>' +
            '<input type="text" id="signup-name" class="form-input" placeholder="Your name" required />' +
            '<p class="form-error" id="signup-name-error"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="signup-email">Email</label>' +
            '<input type="email" id="signup-email" class="form-input" placeholder="you@example.com" required autocomplete="email" />' +
            '<p class="form-error" id="signup-email-error"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="signup-password">Password</label>' +
            '<input type="password" id="signup-password" class="form-input" placeholder="At least 6 characters" required autocomplete="new-password" />' +
            '<p class="form-error" id="signup-password-error"></p>' +
          '</div>' +
          '<div class="form-error auth-form__error" id="signup-form-error"></div>' +
          '<button type="submit" class="btn btn-primary btn-block" id="signup-submit"><span>Create Account</span></button>' +
        '</form>' +
        '<p class="auth-footer">' +
          'Already have an account? <a href="/login" class="text-accent" data-link>Sign In</a>' +
        '</p>' +
      '</div>' +
    '</section>';
}

function initSignupPage() {
  var form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('signup-name');
    var email = document.getElementById('signup-email');
    var password = document.getElementById('signup-password');
    var nameError = document.getElementById('signup-name-error');
    var emailError = document.getElementById('signup-email-error');
    var passwordError = document.getElementById('signup-password-error');
    var formError = document.getElementById('signup-form-error');
    var submitBtn = document.getElementById('signup-submit');
    var hasError = false;

    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (passwordError) passwordError.textContent = '';
    if (formError) formError.textContent = '';

    if (!name || !name.value.trim()) {
      if (nameError) nameError.textContent = 'Name is required';
      hasError = true;
    }
    if (!email.value || !email.value.includes('@')) {
      if (emailError) emailError.textContent = 'Please enter a valid email';
      hasError = true;
    }
    if (!password.value || password.value.length < 6) {
      if (passwordError) passwordError.textContent = 'Password must be at least 6 characters';
      hasError = true;
    }
    if (hasError) return;

    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<span>Creating account\u2026</span>'; }

    signUp({ name: name.value.trim(), email: email.value, password: password.value }).then(function(user) {
      router.navigate('/discover');
    }).catch(function(err) {
      if (formError) formError.textContent = err.message || 'Sign up failed';
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<span>Create Account</span>'; }
    });
  });
}

