// main.js: event wiring and orchestration
// Color extraction and chart rendering are wired up in later steps.

document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const dropzoneEmpty = document.getElementById('dropzone-empty');
  const dropzonePreview = document.getElementById('dropzone-preview');
  const previewImage = document.getElementById('preview-image');
  const previewFilename = document.getElementById('preview-filename');
  const dropzoneError = document.getElementById('dropzone-error');

  // Clicking/keyboard-activating the dropzone opens the file picker.
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  // Picking a file via the native dialog.
  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (file) handleFile(file);
  });

  // Drag and drop onto the dropzone.
  ['dragenter', 'dragover'].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('is-dragover');
    });
  });

  ['dragleave', 'dragend'].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('is-dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove('is-dragover');
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  // Prevent the browser from navigating to a dropped file anywhere outside the dropzone.
  ['dragover', 'drop'].forEach((eventName) => {
    window.addEventListener(eventName, (e) => e.preventDefault());
  });

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      showError();
      return;
    }

    dropzoneError.hidden = true;

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.alt = file.name;
      previewFilename.textContent = file.name;
      dropzoneEmpty.hidden = true;
      dropzonePreview.hidden = false;
    };
    reader.readAsDataURL(file);

    analyzeImage(file);
  }

  // Runs the canvas -> extraction -> naming pipeline and stores the result
  // on window.currentPalette for the bubble/bar views (wired up in later steps).
  async function analyzeImage(file) {
    try {
      const imageData = await ImageLoader.loadImageToCanvas(file);
      const rawColors = ColorExtractor.extractColors(imageData, 6);

      const palette = rawColors
        .map(({ r, g, b, percentage }) => ({
          hex: ColorUtils.rgbToHex(r, g, b),
          name: ColorUtils.nearestColorName(r, g, b),
          percentage,
        }))
        .sort((a, b) => b.percentage - a.percentage);

      window.currentPalette = palette;
      // Bubble/bar rendering picks this up in a later step.
      console.log('Extracted palette:', palette);
    } catch (err) {
      console.error('Color extraction failed:', err);
      showError();
    }
  }

  function showError() {
    dropzoneError.hidden = false;
    dropzoneEmpty.hidden = false;
    dropzonePreview.hidden = true;
  }

  // View toggle buttons (bubbles/bars): chart rendering wired up in later steps.
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
});