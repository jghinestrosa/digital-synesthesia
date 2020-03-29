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
