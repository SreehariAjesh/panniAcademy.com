let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.style.display = "block";

    installButton.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User installed PWA");
            }
        });
    });
});

// Global variable to store the deferred install prompt
let deferredPrompt;

// Handle beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show the installation instructions
  document.getElementById('install-instructions').style.display = 'block';

  console.log('beforeinstallprompt event triggered');
});

// Handle appinstalled event
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  document.getElementById('install-instructions').style.display = 'none';
});

// Close installation instructions
function closeInstallInstructions() {
  document.getElementById('install-instructions').style.display = 'none';
}

// Open and close sidebar navigation
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
  document.getElementById('app-content').style.display = 'block';
  document.getElementById('web-content').style.display = 'none';
  console.log('App is running in standalone mode');
} else {
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

// Firebase Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert('User Logged In Successfully!');
        window.location.href = 'profile.html';
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
}

// Firebase Registration Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert('User Registered Successfully!');
        window.location.href = 'profile.html';
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
}

// Firebase Auth State Change
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userProfile = document.getElementById('userProfile');
    userProfile.innerHTML = `<p>Email: ${user.email}</p>`;
  } else {
    window.location.href = 'login.html';
  }
});

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      window.location.href = 'login.html';
    });
  });
}

// Request Notification Permission
function requestNotificationPermission() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
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

// Trigger notification manually
function triggerNotification(title, options) {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, options);
    }).catch(err => console.error('Service Worker not ready:', err));
  } else {
    console.log('Notifications are not supported in this browser.');
  }
}

// Notification request button
const requestNotificationBtn = document.getElementById('requestNotificationBtn');
if (requestNotificationBtn) {
  requestNotificationBtn.addEventListener('click', requestNotificationPermission);
}

// Notification trigger button
const notifyButton = document.getElementById('notifyButton');
if (notifyButton) {
  notifyButton.addEventListener('click', () => {
    triggerNotification('Manual Notification', {
      body: 'This is a manually triggered notification.',
      icon: 'Images/32x32.png'
    });
  });
}

// Example: Trigger a notification when the user clicks the 'start' button
const startGameButton = document.getElementById('startGameButton');
if (startGameButton) {
  startGameButton.addEventListener('click', () => {
    triggerNotification('Panni Academy', {
      body: 'Your game has started! Good luck!',
      icon: 'Images/32x32.png',
      badge: 'Images/32x32.png',
    });
  });
}
// Register a Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('Service Worker registered successfully:', registration);
    })
    .catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
}

// Request Permission for Notifications
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission()
      .then(function(permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Send a test notification
          sendTestNotification();
        } else {
          console.error('Notification permission denied.');
        }
      });
  }
}

// Send a Test Notification
function sendTestNotification() {
  if (Notification.permission === 'granted') {
    var notification = new Notification('Test Notification', {
      body: 'This is a test notification from your PWA.',
      icon: '/path/to/your/icon.png' 
    });
  }
}

// Example: Send a Notification when a new message arrives
function handleNewMessage(message) {
  if (Notification.permission === 'granted') {
    var notification = new Notification('New Message', {
      body: message,
      icon: '/path/to/your/icon.png' 
    });
  }
}

// Call the functions to initiate the process
requestNotificationPermission(); 
