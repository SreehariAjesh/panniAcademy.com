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
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('Service Worker Registered!', registration);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}
