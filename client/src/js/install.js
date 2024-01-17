const butInstall = document.getElementById('buttonInstall');

// Event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Save the event for later (so we can trigger it manually)
  window.deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';
});

// Implement the install button click event
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await promptEvent.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We no longer need the prompt. Clear it up.
  window.deferredPrompt = null;
  butInstall.style.display = 'none';
});

// Event listener for appinstalled event
window.addEventListener('appinstalled', (event) => {
  // Clear prompt
  window.deferredPrompt = null;
  // Optionally, send analytics event to indicate successful installation
  console.log('PWA was installed');
});
