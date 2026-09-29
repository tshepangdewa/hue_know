import ImageUploader from "./ImageUploader";
import { imageToPixels } from "../utils/imageToPixels";

export default function Hero() {
  const handleImageSelected = async (file) => {
    try {
      const pixels = await imageToPixels(file);

      console.log("Canvas processing complete.");
      console.log("Width:", pixels.width);
      console.log("Height:", pixels.height);
      console.log("Pixel data:", pixels.data);
    } catch (error) {
      console.error("Image processing failed:", error);
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