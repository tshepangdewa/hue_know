const MAX_SAMPLES = 15000;
const QUANTIZATION_LEVEL = 16;
const DELTA_E_THRESHOLD = 12;
const MAX_GROUPS = 3;

export function extractDominantColors(
  pixelData,
  width,
  height
) {
  const samples = samplePixels(
    pixelData,
    width,
    height
  );

  const colorBins = quantizeColors(samples);

  const representatives = createRepresentatives(
    colorBins
  );

  const colorGroups = groupByDeltaE(
    representatives
  );

  const totalWeight = colorGroups.reduce(
    (sum, group) => sum + group.weight,
    0
  );

  return colorGroups
    .sort((a, b) => b.weight - a.weight)
    .slice(0, MAX_GROUPS)
    .map((group) => ({
      rgb: group.rgb,
      percentage:
        (group.weight / totalWeight) * 100,
    }));
}

function samplePixels(
  pixelData,
  width,
  height
) {
  const totalPixels = width * height;

  const step = Math.max(
    1,
    Math.ceil(
      totalPixels / MAX_SAMPLES
    )
  );

  const samples = [];

  for (
    let pixelIndex = 0;
    pixelIndex < totalPixels;
    pixelIndex += step
  ) {
    const index = pixelIndex * 4;

    const red = pixelData[index];
    const green = pixelData[index + 1];
    const blue = pixelData[index + 2];
    const alpha = pixelData[index + 3];

    if (alpha < 128) {
      continue;
    }

    samples.push({
      red,
      green,
      blue,
    });
  }

  return samples;
}

function quantizeColors(samples) {
  const bins = new Map();

  for (const color of samples) {
    const red = quantizeChannel(color.red);
    const green = quantizeChannel(color.green);
    const blue = quantizeChannel(color.blue);

    const key = `${red},${green},${blue}`;

    if (!bins.has(key)) {
      bins.set(key, {
        red: 0,
        green: 0,
        blue: 0,
        count: 0,
      });
    }

    const bin = bins.get(key);

    bin.red += color.red;
    bin.green += color.green;
    bin.blue += color.blue;
    bin.count += 1;
  }

  return bins;
}

function quantizeChannel(value) {
  const bucketSize =
    256 / QUANTIZATION_LEVEL;

  return Math.floor(
    value / bucketSize
  );
}

function createRepresentatives(bins) {
  return [...bins.values()]
    .map((bin) => {
      const rgb = {
        red: Math.round(
          bin.red / bin.count
        ),
        green: Math.round(
          bin.green / bin.count
        ),
        blue: Math.round(
          bin.blue / bin.count
        ),
      };

      return {
        rgb,
        lab: rgbToLab(rgb),
        weight: bin.count,
      };
    })
    .sort((a, b) => b.weight - a.weight);
}

function groupByDeltaE(representatives) {
  const groups = [];

  for (const color of representatives) {
    let closestGroup = null;
    let closestDistance = Infinity;

    for (const group of groups) {
      const distance = deltaE76(
        color.lab,
        group.lab
      );

      if (
        distance < closestDistance
      ) {
        closestDistance = distance;
        closestGroup = group;
      }
    }

    if (
      closestGroup &&
      closestDistance <= DELTA_E_THRESHOLD
    ) {
      mergeIntoGroup(
        closestGroup,
        color
      );
    } else {
      groups.push({
        rgb: { ...color.rgb },
        lab: { ...color.lab },
        weight: color.weight,
      });
    }
  }

  return groups;
}

function mergeIntoGroup(
  group,
  color
) {
  const totalWeight =
    group.weight + color.weight;

  group.rgb = {
    red: Math.round(
      (
        group.rgb.red * group.weight +
        color.rgb.red * color.weight
      ) / totalWeight
    ),

    green: Math.round(
      (
        group.rgb.green * group.weight +
        color.rgb.green * color.weight
      ) / totalWeight
    ),

    blue: Math.round(
      (
        group.rgb.blue * group.weight +
        color.rgb.blue * color.weight
      ) / totalWeight
    ),
  };

  group.lab = rgbToLab(group.rgb);

  group.weight = totalWeight;
}

function rgbToLab(rgb) {
  let red = rgb.red / 255;
  let green = rgb.green / 255;
  let blue = rgb.blue / 255;

  red =
    red > 0.04045
      ? Math.pow(
          (red + 0.055) / 1.055,
          2.4
        )
      : red / 12.92;

  green =
    green > 0.04045
      ? Math.pow(
          (green + 0.055) / 1.055,
          2.4
        )
      : green / 12.92;

  blue =
    blue > 0.04045
      ? Math.pow(
          (blue + 0.055) / 1.055,
          2.4
        )
      : blue / 12.92;

  const x =
    (red * 0.4124 +
      green * 0.3576 +
      blue * 0.1805) /
    0.95047;

  const y =
    (red * 0.2126 +
      green * 0.7152 +
      blue * 0.0722) /
    1.00000;

  const z =
    (red * 0.0193 +
      green * 0.1192 +
      blue * 0.9505) /
    1.08883;

  const transform = (value) =>
    value > 0.008856
      ? Math.cbrt(value)
      : 7.787 * value + 16 / 116;

  const fx = transform(x);
  const fy = transform(y);
  const fz = transform(z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function deltaE76(lab1, lab2) {
  const deltaL = lab1.L - lab2.L;
  const deltaA = lab1.a - lab2.a;
  const deltaB = lab1.b - lab2.b;

  return Math.sqrt(
    deltaL ** 2 +
      deltaA ** 2 +
      deltaB ** 2
  );
}