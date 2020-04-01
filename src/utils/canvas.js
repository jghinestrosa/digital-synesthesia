function paintHistogramByChannel(channel, maxFrequency, ctx, color) {
  ctx.fillStyle = color;
  const pixelsPerUnit = 100 / maxFrequency;
  channel.forEach((value, i) => {
    const columnHeight = value * pixelsPerUnit;
    ctx.fillRect(i, 100 - columnHeight, 1, columnHeight);
  });
}

export function paintHistogram(canvas, histogram) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const channelRed = histogram.map(({ r }) => r);
  const channelGreen = histogram.map(({ g }) => g);
  const channelBlue = histogram.map(({ b }) => b);

  const maxFrequencyRed = Math.max.apply(null, channelRed);
  const maxFrequencyGreen = Math.max.apply(null, channelGreen);
  const maxFrequencyBlue = Math.max.apply(null, channelBlue);

  paintHistogramByChannel(channelRed, maxFrequencyRed, ctx, 'rgb(255,0,0)');
  paintHistogramByChannel(channelGreen, maxFrequencyGreen, ctx, 'rgb(0,255,0)');
  paintHistogramByChannel(channelBlue, maxFrequencyBlue, ctx, 'rgb(0,0,255)');
}

export function getImageData(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
}
