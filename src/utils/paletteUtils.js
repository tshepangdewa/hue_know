export function preparePalette(colors) {
  return colors
    .map((color, index) => ({
      id: `color-${index + 1}`,
      name: color.name,
      hex: color.hex,
      percentage: Number(
        color.percentage.toFixed(1)
      ),
      rgb: color.rgb,
      hsl: color.hsl,
    }))
    .sort(
      (a, b) =>
        b.percentage - a.percentage
    );
}