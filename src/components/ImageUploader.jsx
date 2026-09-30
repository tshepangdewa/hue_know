import { useEffect, useRef, useState } from "react";

const SUPPORTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export default function ImageUploader({
  onImageSelected,
  isProcessing,
}) {
  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [error, setError] =
    useState("");

  const [isDragging, setIsDragging] =
    useState(false);

  const handleFile = (file) => {
    setError("");

    if (!file) {
      return;
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError(
        "Please choose a JPG, PNG, WebP, or GIF image."
      );

      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    onImageSelected(file);
  };

  const handleFileInput = (event) => {
    const file =
      event.target.files?.[0];

    handleFile(file);

    // Allows the same file to be selected again.
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

    handleFile(file);
  };

  const handleChooseClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div
      className={`image-uploader ${
        isDragging ? "is-dragging" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileInput}
        hidden
      />

      {previewUrl ? (
        <div className="image-preview">
          <img
            src={previewUrl}
            alt="Selected image preview"
          />

          {isProcessing ? (
            <p className="processing-message">
              Analyzing your image...
            </p>
          ) : (
            <button
              type="button"
              onClick={handleChooseClick}
            >
              Choose another image
            </button>
          )}
        </div>
      ) : (
        <div className="upload-empty">
          <h2>
            Drop your image here
          </h2>

          <p>
            Drag and drop an image anywhere
            in this box.
          </p>

          <button
            type="button"
            onClick={handleChooseClick}
          >
            Choose an image
          </button>

          <p className="upload-formats">
            JPG, PNG, WebP or GIF
          </p>
        </div>
      )}

      {error && (
        <p
          className="upload-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}