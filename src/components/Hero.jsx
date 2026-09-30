import { useState } from "react";

import ImageUploader from "./ImageUploader";
import Results from "./Results";

import { imageToPixels } from "../utils/imageToPixels";
import { extractDominantColors } from "../utils/colorExtractor";
import { buildColorInfo } from "../utils/colorUtils";
import { preparePalette } from "../utils/paletteUtils";

export default function Hero({
  palette,
  onPaletteReady,
}) {
  const [isProcessing, setIsProcessing] =
    useState(false);

  const [processingError, setProcessingError] =
    useState("");

  const handleImageSelected = async (file) => {
    setIsProcessing(true);
    setProcessingError("");

    try {
      const pixels =
        await imageToPixels(file);

      const colors =
        extractDominantColors(
          pixels.data,
          pixels.width,
          pixels.height
        );

      const colorInfo = colors.map(
        (color) => ({
          ...buildColorInfo(color.rgb),
          percentage: color.percentage,
        })
      );

      const nextPalette =
        preparePalette(colorInfo);

      onPaletteReady(nextPalette);
    } catch (error) {
      console.error(
        "Image processing failed:",
        error
      );

      onPaletteReady([]);

      setProcessingError(
        "We couldn't analyze this image. Please try another image."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="home">
      <h1>
        Every image has a palette.
      </h1>

      <p>
        Upload an image and discover its
        three dominant colors in seconds.
      </p>

      <ImageUploader
        onImageSelected={handleImageSelected}
        isProcessing={isProcessing}
      />

      {processingError && (
        <p
          className="processing-error"
          role="alert"
        >
          {processingError}
        </p>
      )}

      <Results palette={palette} />
    </section>
  );
}