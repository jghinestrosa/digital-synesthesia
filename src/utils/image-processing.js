export function createHistogram(imageData) {
  const arr = new Array(256);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = { r: 0, g: 0, b: 0 };
  }

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    // write red
    arr[r].r += 1;

    // write green
    arr[g].g += 1;

    // write blue
    arr[b].b += 1;
  }

  return arr;
}
