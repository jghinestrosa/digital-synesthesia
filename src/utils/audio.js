export function decodeAudioFile(audioFileBuffer) {
  const context = new window.AudioContext();
  return context.decodeAudioData(audioFileBuffer);
}

export function playAudioFile(audioBuffer) {
  const context = new window.AudioContext();
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = false;
  source.connect(context.destination);
  source.start(0); // Play immediately.
}
