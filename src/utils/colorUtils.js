export function rgbToHex(rgb) {
  const red = rgb.red
    .toString(16)
    .padStart(2, "0");

  const green = rgb.green
    .toString(16)
    .padStart(2, "0");

  const blue = rgb.blue
    .toString(16)
    .padStart(2, "0");

  return `#${red}${green}${blue}`.toUpperCase();
}

export function rgbToHsl(rgb) {
  let red = rgb.red / 255;
  let green = rgb.green / 255;
  let blue = rgb.blue / 255;

  const max = Math.max(
    red,
    green,
    blue
  );

  const min = Math.min(
    red,
    green,
    blue
  );

  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (max !== min) {
    const difference = max - min;

    saturation =
      lightness > 0.5
        ? difference /
          (2 - max - min)
        : difference /
          (max + min);

    switch (max) {
      case red:
        hue =
          (green - blue) /
            difference +
          (green < blue ? 6 : 0);
        break;

      case green:
        hue =
          (blue - red) /
            difference +
          2;
        break;

      case blue:
        hue =
          (red - green) /
            difference +
          4;
        break;

      default:
        break;
    }

    hue /= 6;
  }

  return {
    hue: Math.round(hue * 360),
    saturation: Math.round(
      saturation * 100
    ),
    lightness: Math.round(
      lightness * 100
    ),
  };
}

export function getColorName(rgb) {
  const hsl = rgbToHsl(rgb);

  const {
    hue,
    saturation,
    lightness,
  } = hsl;

  if (lightness >= 92) {
    return "White";
  }

  if (lightness <= 8) {
    return "Black";
  }

  if (saturation <= 8) {
    if (lightness >= 75) {
      return "Light Gray";
    }

    if (lightness >= 40) {
      return "Gray";
    }

    return "Dark Gray";
  }

  if (lightness >= 85) {
    return `Very Light ${getHueName(hue)}`;
  }

  if (lightness >= 70) {
    return `Light ${getHueName(hue)}`;
  }

  if (lightness <= 20) {
    return `Dark ${getHueName(hue)}`;
  }

  return getHueName(hue);
}

function getHueName(hue) {
  if (hue < 15) {
    return "Red";
  }

  if (hue < 45) {
    return "Orange";
  }

  if (hue < 70) {
    return "Yellow";
  }

  if (hue < 165) {
    return "Green";
  }

  if (hue < 195) {
    return "Cyan";
  }

  if (hue < 255) {
    return "Blue";
  }

  if (hue < 290) {
    return "Purple";
  }

  if (hue < 330) {
    return "Pink";
  }

  return "Red";
}

export function buildColorInfo(rgb) {
  return {
    rgb,
    hex: rgbToHex(rgb),
    hsl: rgbToHsl(rgb),
    name: getColorName(rgb),
  };
}