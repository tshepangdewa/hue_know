import ImageUploader from "./ImageUploader";

export default function Hero() {
  const handleImageSelected = (file) => {
    console.log("Selected image:", file);
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