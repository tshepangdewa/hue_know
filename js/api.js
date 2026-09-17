const HueKnowAPI = {

  async analyzeImage(file) {

    return new Promise((resolve, reject) => {

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.src = objectUrl;

      img.onload = () => {

        try {

          const colorThief = new ColorThief();

          // Extract more colors so smaller but important colors,
          // such as red, are less likely to be missed.
          const rawPalette = colorThief.getPalette(img, 16);

          if (!rawPalette || rawPalette.length === 0) {
            URL.revokeObjectURL(objectUrl);
            return reject(new Error('Unable to extract colors from image.'));
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxDimension = 300;
          const scale = Math.min(
            maxDimension / img.width,
            maxDimension / img.height,
            1
          );

          canvas.width = Math.floor(img.width * scale);
          canvas.height = Math.floor(img.height * scale);

          ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const imageData = ctx
            .getImageData(0, 0, canvas.width, canvas.height)
            .data;

          const colorCounts = new Array(rawPalette.length).fill(0);
          let totalValidPixels = 0;

          /*
           * Convert RGB to HSV.
           *
           * HSV is better suited for color comparison because
           * hue represents the actual color family.
           */
          function rgbToHsv(r, g, b) {

            r /= 255;
            g /= 255;
            b /= 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;

            let h = 0;

            if (delta !== 0) {

              if (max === r) {
                h = 60 * (((g - b) / delta) % 6);
              } else if (max === g) {
                h = 60 * ((b - r) / delta + 2);
              } else {
                h = 60 * ((r - g) / delta + 4);
              }

              if (h < 0) {
                h += 360;
              }
            }

            const s = max === 0 ? 0 : delta / max;
            const v = max;

            return { h, s, v };
          }

          /*
           * Calculate color distance using HSV.
           *
           * Hue is circular:
           * 359° and 1° are both very close to red.
           */
          function hsvDistance(rgb1, rgb2) {

            const hsv1 = rgbToHsv(
              rgb1[0],
              rgb1[1],
              rgb1[2]
            );

            const hsv2 = rgbToHsv(
              rgb2[0],
              rgb2[1],
              rgb2[2]
            );

            let hueDifference = Math.abs(hsv1.h - hsv2.h);

            if (hueDifference > 180) {
              hueDifference = 360 - hueDifference;
            }

            const hueDistance = hueDifference / 180;
            const saturationDistance = Math.abs(hsv1.s - hsv2.s);
            const valueDistance = Math.abs(hsv1.v - hsv2.v);

            /*
             * Hue receives the strongest weight for saturated colors.
             * This helps prevent red from being grouped with orange
             * or pink simply because their RGB values are numerically close.
             */
            const saturationWeight =
              0.5 + Math.max(hsv1.s, hsv2.s);

            return (
              hueDistance * saturationWeight * 3 +
              saturationDistance * 1.5 +
              valueDistance
            );
          }

          for (let i = 0; i < imageData.length; i += 4) {

            const alpha = imageData[i + 3];

            // Ignore transparent pixels.
            if (alpha < 128) {
              continue;
            }

            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];

            let minDistance = Infinity;
            let closestIndex = 0;

            for (let j = 0; j < rawPalette.length; j++) {

              const paletteColor = rawPalette[j];

              const dist = hsvDistance(
                [r, g, b],
                paletteColor
              );

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

              const name =
                ColorUtils.getApproximateColorName(r, g, b);

              const percentage =
                totalValidPixels > 0
                  ? (colorCounts[index] / totalValidPixels) * 100
                  : 0;

              return {
                name,
                hex,
                percentage
              };

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

        reject(
          new Error('Failed to load selected image file.')
        );
      };
    });
  }
};

window.HueKnowAPI = HueKnowAPI;
