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

  return histogram.map((value, index) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const gain = value / maxHistogramValidValue;
    const frequency =
      (index * (maxAudioFrequency - minAudioFrequency)) / 255 +
      minAudioFrequency;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime); // value in hertz
    gainNode.gain.setValueAtTime(gain, context.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    return oscillator;
  });
}

export function playHistogramWithOscillators(oscillators) {
  oscillators.forEach(oscillator => oscillator.start());
}
