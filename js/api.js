const HueKnowAPI = {
  async analyzeImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Image analysis failed');
    }

    return data;
  }
};

window.HueKnowAPI = HueKnowAPI;