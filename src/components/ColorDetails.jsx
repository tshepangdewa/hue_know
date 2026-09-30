import { useState } from "react";
import { copyToClipboard } from "../utils/clipboard";

export default function ColorDetails({
  palette,
}) {
  const [copiedHex, setCopiedHex] = useState("");

  const handleCopy = async (hex) => {
    const copied = await copyToClipboard(hex);

    if (!copied) {
      return;
    }

    setCopiedHex(hex);

    setTimeout(() => {
      setCopiedHex("");
    }, 1500);
  };

  return (
    <div className="color-details">
      {palette.map((color) => (
        <article
          className="color-detail"
          key={color.id}
        >
          <div
            className="color-detail-swatch"
            style={{
              backgroundColor: color.hex,
            }}
            aria-hidden="true"
          />

          <div className="color-detail-info">
            <h3>{color.name}</h3>

            <p>
              <span>HEX</span>
              {color.hex}
            </p>

            <p>
              <span>RGB</span>
              {color.rgb.red}, {color.rgb.green},{" "}
              {color.rgb.blue}
            </p>

            <p>
              <span>Share</span>
              {color.percentage}%
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              handleCopy(color.hex)
            }
          >
            {copiedHex === color.hex
              ? "Copied!"
              : "Copy HEX"}
          </button>
        </article>
      ))}
    </div>
  );
}