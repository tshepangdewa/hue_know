document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const dropzoneEmpty = document.getElementById('dropzone-empty');
  const dropzonePreview = document.getElementById('dropzone-preview');
  const previewImage = document.getElementById('preview-image');
  const previewFilename = document.getElementById('preview-filename');
  const dropzoneError = document.getElementById('dropzone-error');
  const analysisStatus = document.getElementById('analysis-status');

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (file) handleFile(file);
  });

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

  async function analyzeImage(file) {
    try {
      analysisStatus.textContent = 'Analyzing your image...';
      analysisStatus.hidden = false;
      dropzoneError.hidden = true;

      const result = await HueKnowAPI.analyzeImage(file);

      const palette = result.palette.sort((a, b) => b.percentage - a.percentage);

      if (palette.length === 0) {
        throw new Error('No colors were found in the image.');
      }

      window.currentPalette = palette;
      renderCurrentView();

      analysisStatus.hidden = true;
      return palette;
    } catch (error) {
      analysisStatus.hidden = true;
      console.error('Analysis failed:', error);
      dropzoneError.textContent = error.message || 'Something went wrong while analyzing the image.';
      dropzoneError.hidden = false;
    }
  }

  function showError() {
    dropzoneError.hidden = false;
    dropzoneEmpty.hidden = false;
    dropzonePreview.hidden = true;
  }

  const bubbleView = document.querySelector('#bubble-view');
  const barView = document.querySelector('#bar-view');
  const bubbleButton = document.querySelector('[data-view="bubble"]');
  const barButton = document.querySelector('[data-view="bar"]');

  function renderCurrentView() {
    const palette = window.currentPalette;
    if (!palette || palette.length === 0) return;

    const isBubble = bubbleButton.classList.contains('is-active');

    if (isBubble) {
      bubbleView.hidden = false;
      barView.hidden = true;
      BubbleChart.render(palette, bubbleView);
    } else {
      bubbleView.hidden = true;
      barView.hidden = false;
      BarChart.render(palette, barView);
    }
  }

  bubbleButton.addEventListener('click', () => {
    bubbleButton.classList.add('is-active');
    barButton.classList.remove('is-active');
    renderCurrentView();
  });

  barButton.addEventListener('click', () => {
    barButton.classList.add('is-active');
    bubbleButton.classList.remove('is-active');
    renderCurrentView();
  });
});