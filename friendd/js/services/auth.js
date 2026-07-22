/* Authentication Service (Mock) */
var AUTH_KEY = 'auth_user';
var MOCK_USERS = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', avatar: null, bio: 'Digital nomad & coffee enthusiast', interests: ['travel', 'music', 'photography'] }
];

var _currentUser = getStorage(AUTH_KEY, null);

function getCurrentUser() { return _currentUser; }

function isAuthenticated() { return !!_currentUser; }

function initAuth() {
  _currentUser = getStorage(AUTH_KEY, null);
  return _currentUser;
}

function signIn(email, password) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (!email || !password) {
        reject(new Error('Email and password are required'));
        return;
      }
      var user = null;
      for (var i = 0; i < MOCK_USERS.length; i++) {
        if (MOCK_USERS[i].email === email) { user = MOCK_USERS[i]; break; }
      }
      if (!user) { reject(new Error('Invalid email or password')); return; }
      _currentUser = user;
      setStorage(AUTH_KEY, user);
      resolve(user);
    }, 800);
  });
}

function signUp(userData) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (!userData.name || !userData.email || !userData.password) {
        reject(new Error('All fields are required'));
        return;
      }
      for (var i = 0; i < MOCK_USERS.length; i++) {
        if (MOCK_USERS[i].email === userData.email) {
          reject(new Error('An account with this email already exists'));
          return;
        }
      }
      var newUser = { id: String(Date.now()), name: userData.name, email: userData.email, avatar: null, bio: '', interests: [] };
      MOCK_USERS.push(newUser);
      _currentUser = newUser;
      setStorage(AUTH_KEY, newUser);
      resolve(newUser);
    }, 800);
  });
}

function signOut() {
  _currentUser = null;
  removeStorage(AUTH_KEY);
}

function updateProfile(updates) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (!_currentUser) { reject(new Error('Not authenticated')); return; }
      _currentUser = Object.assign({}, _currentUser, updates);
      setStorage(AUTH_KEY, _currentUser);
      resolve(_currentUser);
    }, 400);
  });
}

