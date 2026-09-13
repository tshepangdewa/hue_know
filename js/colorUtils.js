const ColorUtils = {
  hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');

    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16)
    };
  }
};

window.ColorUtils = ColorUtils;