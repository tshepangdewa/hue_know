const MAX_SIZE = 600;

export function imageToPixels(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      try {
        const { width, height } = getScaledDimensions(
          image.naturalWidth,
          image.naturalHeight
        );

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d", {
          willReadFrequently: true,
        });

        if (!context) {
          throw new Error("Could not create a canvas context.");
        }

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        const imageData = context.getImageData(
          0,
          0,
          width,
          height
        );

        resolve({
          data: imageData.data,
          width,
          height,
        });
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      reject(
        new Error("The selected image could not be loaded.")
      );
    };

    image.src = objectUrl;
  });
}

function getScaledDimensions(originalWidth, originalHeight) {
  const largestDimension = Math.max(
    originalWidth,
    originalHeight
  );

  if (largestDimension <= MAX_SIZE) {
    return {
      width: originalWidth,
      height: originalHeight,
    };
  }

  const scale = MAX_SIZE / largestDimension;

  return {
    width: Math.round(originalWidth * scale),
    height: Math.round(originalHeight * scale),
  };
}