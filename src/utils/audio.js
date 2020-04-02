export function decodeAudioFile(audioFileBuffer) {
  return new Promise((resolve, reject) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    // Use callbacks instead of Promise syntax because it is not supported in Safari
    // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
    return context.decodeAudioData(audioFileBuffer, resolve, reject);
  });
}

export function playAudioFile(audioBuffer) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = false;
  source.connect(context.destination);
  source.start(0); // Play immediately.
}

// (histogram, 255, 100, 4000)
export function createOscillatorsFromHistogram(
  histogram,
  maxHistogramValidValue,
  minAudioFrequency,
  maxAudioFrequency
) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();

  return histogram
    .map(value => {
      const oscillator = context.createOscillator();
      const frequency =
        (value * maxAudioFrequency) / maxHistogramValidValue +
        minAudioFrequency;
      oscillator.type = 'square';
      console.log('>> color value:', value, 'frequency', frequency);
      oscillator.frequency.setValueAtTime(frequency, context.currentTime); // value in hertz
      oscillator.connect(context.destination);
      return oscillator;
    })
    .slice(0, 8);
}

export function playHistogramWithOscillators(oscillators) {
  oscillators.forEach(oscillator => oscillator.start());
}
