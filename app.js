let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  deferredPrompt = e;

  // Show the installation instructions
  document.getElementById('install-instructions').style.display = 'block';

  console.log('beforeinstallprompt event triggered');
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  document.getElementById('install-instructions').style.display = 'none';
});

function closeInstallInstructions() {
  document.getElementById('install-instructions').style.display = 'none';
}

// Open and close sidebar navigation
// Open and close sidebar navigation (same as before)
function openNav() {
  document.getElementById("mySidebar").style.left = "0";
  document.querySelector('.content').classList.add('opened');
}

function closeNav() {
  document.getElementById("mySidebar").style.left = "-250px";
  document.querySelector('.content').classList.remove('opened');
}

// Detect if app is running as a PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
  // App-specific content
  document.getElementById('app-content').style.display = 'block';
  document.getElementById('web-content').style.display = 'none';
  console.log('App is running in standalone mode');
} else {
  // Website-specific content
  document.getElementById('app-content').style.display = 'none';
  document.getElementById('web-content').style.display = 'block';
  console.log('App is running in a web browser');
}

// Register service worker for offline capabilities
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log('Service Worker Registered!', registration);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Success! Redirect to profile page
      alert('User Logged In Successfully!');
      window.location.href = 'profile.html';
    })
    .catch((error) => {
      console.error(error.message);
    });
});
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Success! Redirect to profile page
      alert('User Registered Successfully!');
      window.location.href = 'profile.html';
    })
    .catch((error) => {
      console.error(error.message);
    });
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userProfile = document.getElementById('userProfile');
    userProfile.innerHTML = `<p>Email: ${user.email}</p>`;
  } else {
    window.location.href = 'login.html'; // Redirect if not logged in
  }
});

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    window.location.href = 'login.html';
  });
});
// Request notification permission
// Inside your app.js or main JavaScript file
function requestNotificationPermission() {
  if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  } else {
    console.log('This browser does not support notifications or service workers.');
  }
}

// Call this function when the user interacts with an element (e.g., a button)
document.getElementById('requestNotificationBtn').addEventListener('click', requestNotificationPermission);
// Trigger notification manually when needed
function triggerNotification(title, options) {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, options);
    }).catch(err => console.error('Service Worker not ready:', err));
  } else {
    console.log('Notifications are not supported in this browser.');
  }
}

// Adding a manual trigger
document.getElementById('notifyButton').addEventListener('click', () => {
  const title = 'Manual Notification';  // You can customize this title
  const options = {
    body: 'This is a manually triggered notification.',
    icon: 'Images/32x32.png' // You can set an icon for the notification
  };
  
  // Trigger the notification
  triggerNotification(title, options);
});


// Example: Trigger a notification when the user clicks the 'start' button
document.getElementById('startGameButton').addEventListener('click', () => {
  triggerNotification('Panni Academy', {
    body: 'Your game has started! Good luck!',
    icon: 'Images/32x32.png',
    badge: 'Images/32x32.png',
  });
});
