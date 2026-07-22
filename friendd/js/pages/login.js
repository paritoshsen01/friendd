/* Login Page */
function renderLoginPage() {
  return '' +
    '<section class="auth-shell">' +
      '<div class="auth-card glass-card">' +
        '<div class="auth-card__header">' +
          '<div class="auth-brand">' +
            '<div class="navbar-logo-icon glow-text">F</div>' +
            '<div>' +
              '<h2>Welcome back</h2>' +
              '<p>Sign in to continue to Friendd</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<form id="login-form" class="auth-form">' +
          '<div class="form-group">' +
            '<label class="form-label" for="login-email">Email</label>' +
            '<input type="email" id="login-email" class="form-input" placeholder="you@example.com" required autocomplete="email" />' +
            '<p class="form-error" id="login-email-error"></p>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="login-password">Password</label>' +
            '<input type="password" id="login-password" class="form-input" placeholder="Enter your password" required autocomplete="current-password" />' +
            '<p class="form-error" id="login-password-error"></p>' +
          '</div>' +
          '<div class="form-error auth-form__error" id="login-form-error"></div>' +
          '<button type="submit" class="btn btn-primary btn-block" id="login-submit"><span>Sign In</span></button>' +
        '</form>' +
        '<p class="auth-footer">' +
          'Don\'t have an account? <a href="/signup" class="text-accent" data-link>Sign Up</a>' +
        '</p>' +
      '</div>' +
    '</section>';
}

function initLoginPage() {
  var form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.getElementById('login-email');
    var password = document.getElementById('login-password');
    var emailError = document.getElementById('login-email-error');
    var passwordError = document.getElementById('login-password-error');
    var formError = document.getElementById('login-form-error');
    var submitBtn = document.getElementById('login-submit');
    var hasError = false;

    if (emailError) emailError.textContent = '';
    if (passwordError) passwordError.textContent = '';
    if (formError) formError.textContent = '';

    if (!email.value || !email.value.includes('@')) {
      if (emailError) emailError.textContent = 'Please enter a valid email';
      hasError = true;
    }
    if (!password.value || password.value.length < 6) {
      if (passwordError) passwordError.textContent = 'Password must be at least 6 characters';
      hasError = true;
    }
    if (hasError) return;

    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<span>Signing in\u2026</span>'; }

    signIn(email.value, password.value).then(function(user) {
      if (formError) formError.textContent = '';
      router.navigate('/discover');
    }).catch(function(err) {
      if (formError) formError.textContent = err.message || 'Sign in failed';
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<span>Sign In</span>'; }
    });
  });
}

