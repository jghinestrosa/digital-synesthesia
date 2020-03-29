const WAVE_HEADER_LENGTH = 44; // bytes
const CHUNK_ID_8 = [82, 73, 70, 70]; // R, I, F, F (RIFF)
const FORMAT_8 = [87, 65, 86, 69]; // W, A, V, E (WAVE)
const SUBCHUNK_1_ID_8 = [102, 109, 116, 32]; // f, m, t,   (fmt )
const SUBCHUNK_1_SIZE_32 = 16; // 16 for PCM
const AUDIO_FORMAT_16 = 1; // 1 = PCM
const NUM_CHANNELS_16 = 2; // 2 = STEREO
const SAMPLE_RATE_32 = 44100; // 44100
const BITS_PER_SAMPLE_16 = 16; // 16 bits
const SUBCHUNK_2_ID_8 = [100, 97, 116, 97]; // d, a, t, a (data)

export function createWaveHeader({
  fileByteLength,
  numChannels = NUM_CHANNELS_16,
  sampleRate = SAMPLE_RATE_32,
  bitsPerSample = BITS_PER_SAMPLE_16
}) {
  const waveHeaderBuffer = new ArrayBuffer(WAVE_HEADER_LENGTH);
  const dataView8 = new Uint8Array(waveHeaderBuffer);
  const dataView16 = new Uint16Array(waveHeaderBuffer);
  const dataView32 = new Uint32Array(waveHeaderBuffer);

  // write Chunk Id
  for (let i = 0; i < CHUNK_ID_8.length; i++) {
    dataView8[i] = CHUNK_ID_8[i];
  }

  // write Chunk Size
  dataView32[1] = fileByteLength - 8; // length - CHUNK_ID (4 bytes) - CHUNK_SIZE (4 bytes)

  // write Format
  for (
    let i = 8, offset = 8, length = offset + FORMAT_8.length;
    i < length;
    i++
  ) {
    dataView8[i] = FORMAT_8[i - offset];
  }

  // write SubChunk1 Id
  for (
    let i = 12, offset = 12, length = offset + SUBCHUNK_1_ID_8.length;
    i < length;
    i++
  ) {
    dataView8[i] = SUBCHUNK_1_ID_8[i - offset];
  }

  // write SubChunk1 Size
  dataView32[4] = SUBCHUNK_1_SIZE_32;

  // write AudioFormat
  dataView16[10] = AUDIO_FORMAT_16;

  // write Num Channels
  dataView16[11] = numChannels;

  // write SampleRate
  dataView32[6] = sampleRate;

  // write ByteRate
  dataView32[7] = sampleRate * numChannels * (bitsPerSample / 8);

  // write BlockAlign
  dataView16[16] = numChannels * (bitsPerSample / 8);

  // write ByteRate
  dataView16[17] = bitsPerSample;

  // write SubChunk2 Id
  for (
    let i = 36, offset = 36, length = offset + SUBCHUNK_2_ID_8.length;
    i < length;
    i++
  ) {
    dataView8[i] = SUBCHUNK_2_ID_8[i - offset];
  }

  // write Chunk Size
  dataView32[10] = fileByteLength - 44; // length - 44 bytes of header???

  return waveHeaderBuffer;
}

export default function createBufferToListen({
  fileBuffer,
  numChannels,
  sampleRate,
  bitsPerSample
}) {
  const { byteLength: fileByteLength } = fileBuffer;

  const waveHeaderBuffer = createWaveHeader({
    fileByteLength,
    numChannels,
    sampleRate,
    bitsPerSample
  });
  return new Uint8Array([
    ...new Uint8Array(waveHeaderBuffer),
    ...new Uint8Array(fileBuffer)
  ]).buffer;
}
