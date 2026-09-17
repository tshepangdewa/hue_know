const HueKnowAPI = {
  async analyzeImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const rawPalette = colorThief.getPalette(img, 8);

          if (!rawPalette || rawPalette.length === 0) {
            URL.revokeObjectURL(objectUrl);
            return reject(new Error('Unable to extract colors from image.'));
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxDimension = 250;
          const scale = Math.min(maxDimension / img.width, maxDimension / img.height, 1);

          canvas.width = Math.floor(img.width * scale);
          canvas.height = Math.floor(img.height * scale);

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

          const colorCounts = new Array(rawPalette.length).fill(0);
          let totalValidPixels = 0;

          for (let i = 0; i < imageData.length; i += 4) {
            const alpha = imageData[i + 3];
            if (alpha < 128) continue;

            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];

            let minDistance = Infinity;
            let closestIndex = 0;

            for (let j = 0; j < rawPalette.length; j++) {
              const [pr, pg, pb] = rawPalette[j];
              const dist = Math.pow(r - pr, 2) + Math.pow(g - pg, 2) + Math.pow(b - pb, 2);
              if (dist < minDistance) {
                minDistance = dist;
                closestIndex = j;
              }
            }

            colorCounts[closestIndex]++;
            totalValidPixels++;
          }

          const palette = rawPalette
            .map(([r, g, b], index) => {
              const hex = ColorUtils.rgbToHex(r, g, b);
              const name = ColorUtils.getApproximateColorName(r, g, b);
              const percentage = totalValidPixels > 0
                ? (colorCounts[index] / totalValidPixels) * 100
                : 0;

              return { name, hex, percentage };
            })
            .filter(color => color.percentage > 0.5)
            .sort((a, b) => b.percentage - a.percentage);

          URL.revokeObjectURL(objectUrl);
          resolve({ palette });
        } catch (error) {
          URL.revokeObjectURL(objectUrl);
          reject(error);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load selected image file.'));
      };
    });
  }
};

window.HueKnowAPI = HueKnowAPI;