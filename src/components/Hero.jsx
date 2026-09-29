import ImageUploader from "./ImageUploader";
import { imageToPixels } from "../utils/imageToPixels";
import { extractDominantColors } from "../utils/colorExtractor";

export default function Hero() {
  const handleImageSelected = async (file) => {
    try {
      const pixels = await imageToPixels(file);

      const colors = extractDominantColors(
        pixels.data,
        pixels.width,
        pixels.height
      );

      console.log("Canvas processing complete.");
      console.log("Width:", pixels.width);
      console.log("Height:", pixels.height);
      console.log("Dominant colors:", colors);
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
    </section>
  );
}