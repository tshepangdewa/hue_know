// main.js — event wiring and orchestration
// Image loading, color extraction, and chart rendering are wired up in later steps.

document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('dropzone');

  // Clicking/keyboard-activating the dropzone opens the file picker.
  // (File handling itself is implemented in step 3.)
  const fileInput = document.getElementById('file-input');
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  // View toggle buttons (bubbles/bars) — chart rendering wired up in later steps.
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
});