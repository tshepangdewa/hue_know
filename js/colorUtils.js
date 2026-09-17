const ColorUtils = {
  hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    return {
      r: parseInt(cleanHex.substring(0, 2), 16) || 0,
      g: parseInt(cleanHex.substring(2, 4), 16) || 0,
      b: parseInt(cleanHex.substring(4, 6), 16) || 0
    };
  },

  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, x)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  },

  getContrastColor(hex) {
    const { r, g, b } = this.hexToRgb(hex);
    const relativeLuminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return relativeLuminance > 0.65 ? '#121212' : '#FFFFFF';
  },

  getApproximateColorName(r, g, b) {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    const hueDeg = h * 360;
    const satPct = s * 100;
    const lightPct = l * 100;

    if (lightPct < 12) return 'Black';
    if (lightPct > 88) return 'White';
    if (satPct < 12) return lightPct > 50 ? 'Light Gray' : 'Dark Gray';

    if (hueDeg >= 345 || hueDeg < 15) return lightPct < 40 ? 'Maroon' : 'Red';
    if (hueDeg >= 15 && hueDeg < 45) return lightPct > 65 ? 'Peach' : 'Orange';
    if (hueDeg >= 45 && hueDeg < 70) return lightPct > 70 ? 'Cream' : 'Yellow';
    if (hueDeg >= 70 && hueDeg < 165) return lightPct < 35 ? 'Forest Green' : 'Green';
    if (hueDeg >= 165 && hueDeg < 195) return 'Cyan';
    if (hueDeg >= 195 && hueDeg < 255) return lightPct < 35 ? 'Navy' : 'Blue';
    if (hueDeg >= 255 && hueDeg < 285) return 'Purple';
    if (hueDeg >= 285 && hueDeg < 345) return lightPct > 70 ? 'Pink' : 'Magenta';

    return this.rgbToHex(r, g, b);
  },

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }
};

window.ColorUtils = ColorUtils;