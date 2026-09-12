// colorUtils.js: pure conversion helpers, no DOM access.

function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  const delta = max - min;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / delta) % 6; break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Curated list of named colors for nearest-neighbor matching. Deliberately
// larger and more evenly spread across the color space than a hue-bucket
// scheme (12 hues x 3 modifiers = ~40 possible names) so visually distinct
// colors don't collide on the same label. ~100 entries, each a plain hex.
const NAMED_COLORS = [
  ['Black', '#000000'], ['Charcoal', '#36454F'], ['Dark Gray', '#3D3D3D'],
  ['Gray', '#808080'], ['Silver', '#C0C0C0'], ['Light Gray', '#D3D3D3'],
  ['White', '#FFFFFF'], ['Off White', '#F5F5F0'], ['Ivory', '#FFFFF0'],
  ['Cream', '#FFFDD0'], ['Beige', '#F5F5DC'], ['Taupe', '#8B7D6B'],
  ['Tan', '#D2B48C'], ['Khaki', '#C3B091'], ['Sand', '#C2B280'],
  ['Warm Gray', '#978F80'], ['Stone', '#928E85'], ['Slate', '#708090'],
  ['Dark Slate', '#2F4F4F'],
  ['Red', '#E53935'], ['Dark Red', '#8B0000'], ['Crimson', '#DC143C'],
  ['Maroon', '#800000'], ['Brick Red', '#B22222'], ['Rust', '#B7410E'],
  ['Coral', '#FF7F50'], ['Salmon', '#FA8072'], ['Terracotta', '#E2725B'],
  ['Orange', '#FF8C00'], ['Dark Orange', '#D2691E'], ['Burnt Orange', '#CC5500'],
  ['Light Orange', '#FFB74D'], ['Peach', '#FFE5B4'], ['Apricot', '#FBCEB1'],
  ['Muted Orange', '#C68958'],
  ['Amber', '#FFBF00'], ['Gold', '#FFD700'], ['Mustard', '#FFDB58'],
  ['Yellow', '#FFEB3B'], ['Pale Yellow', '#FFF9C4'], ['Olive', '#808000'],
  ['Dark Olive', '#556B2F'],
  ['Yellow-Green', '#9ACD32'], ['Lime', '#32CD32'], ['Chartreuse', '#7FFF00'],
  ['Green', '#2E7D32'], ['Dark Green', '#006400'], ['Forest Green', '#228B22'],
  ['Sage', '#9CAF88'], ['Sage Gray', '#8A9A8B'], ['Mint', '#98FF98'],
  ['Light Green', '#90EE90'], ['Seafoam', '#93E9BE'],
  ['Teal', '#008080'], ['Dark Teal', '#014D4E'], ['Turquoise', '#40E0D0'],
  ['Cyan', '#00BCD4'], ['Light Cyan', '#B2EBF2'],
  ['Blue', '#1976D2'], ['Dark Blue', '#00008B'], ['Navy', '#000080'],
  ['Steel Blue', '#4682B4'], ['Sky Blue', '#87CEEB'], ['Light Blue', '#ADD8E6'],
  ['Powder Blue', '#B0E0E6'], ['Denim', '#1560BD'],
  ['Indigo', '#4B0082'], ['Periwinkle', '#CCCCFF'],
  ['Purple', '#7B1FA2'], ['Dark Purple', '#4A148C'], ['Violet', '#8F00FF'],
  ['Lavender', '#E6E6FA'], ['Mauve', '#B784A7'], ['Plum', '#8E4585'],
  ['Orchid', '#DA70D6'],
  ['Pink', '#FF69B4'], ['Hot Pink', '#FF1493'], ['Light Pink', '#FFB6C1'],
  ['Blush', '#F1C4C4'], ['Rose', '#C08081'], ['Magenta', '#D81B60'],
  ['Brown', '#795548'], ['Dark Brown', '#3E2723'], ['Chocolate', '#5C4033'],
  ['Chestnut', '#954535'], ['Coffee', '#6F4E37'], ['Umber', '#635147'],
  ['Sienna', '#A0522D'], ['Camel', '#C19A6B'],
  ['Skin Tone Light', '#F1C27D'], ['Skin Tone Medium', '#C68863'],
  ['Skin Tone Dark', '#8D5524'],
].map(([name, hex]) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { name, r, g, b };
});

// Finds the closest entry in NAMED_COLORS by plain Euclidean RGB distance.
// Simple, but with ~100 well-spread reference colors it resolves far more
// distinctly than a 12-hue-bucket scheme, so visually different colors
// (e.g. a tan vs. a brownish gray) land on different names instead of both
// rounding down to the same "Muted Orange".
function nearestColorName(r, g, b) {
  let best = NAMED_COLORS[0];
  let bestDist = Infinity;

  for (const candidate of NAMED_COLORS) {
    const dr = candidate.r - r;
    const dg = candidate.g - g;
    const db = candidate.b - b;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }

  return best.name;
}

window.ColorUtils = { rgbToHex, rgbToHsl, nearestColorName };