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
  const handleImageSelected = async (file) => {
    try {
      const pixels = await imageToPixels(file);

      const colors = extractDominantColors(
        pixels.data,
        pixels.width,
        pixels.height
      );

      const colorInfo = colors.map((color) => ({
        ...buildColorInfo(color.rgb),
        percentage: color.percentage,
      }));

      const nextPalette = preparePalette(colorInfo);

      onPaletteReady(nextPalette);

      console.log("Canvas processing complete.");
      console.log("Width:", pixels.width);
      console.log("Height:", pixels.height);
      console.log("Palette:", nextPalette);
    } catch (error) {
      console.error(
        "Image processing failed:",
        error
      );
    }
  };

  return (
    <section id="home">
      <h1>Every image has a palette.</h1>

      <p>
        Upload an image and discover its three
        dominant colors in seconds.
      </p>

      <ImageUploader
        onImageSelected={handleImageSelected}
      />

      <Results palette={palette} />
    </section>
  );
}