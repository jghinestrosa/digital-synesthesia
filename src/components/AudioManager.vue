<template>
  <section>
    <section class="file">
      <label for="file-selector">Load the file you want to listen to</label>
      <input id="file-selector" type="file" v-on:change="onFileLoaded" />
    </section>
    <fieldset class="audio-format-selector">
      <legend>Audio Format</legend>
      <input
        type="radio"
        name="audio-format"
        id="audio-format-wave-pcm"
        value="wave-pcm"
        v-model="selectedFormat"
      />
      <label for="audio-format-wave-pcm">WAVE PCM</label>
    </fieldset>
    <fieldset class="audio-parameters">
      <legend>Parameters</legend>
      <label for="sample-rate">Sample Rate:</label>
      <input type="number" name="sample-rate" id="sample-rate" v-model="sampleRate" />
      <label for="number-channels">Number of Channels:</label>
      <input type="number" name="number-channels" id="number-channels" v-model="numberOfChannels" />
      <label for="bits-per-sample">Bits per Sample:</label>
      <input type="number" name="bits-per-sample" id="bits-per-sample" v-model="bitsPerSample" />
    </fieldset>
    <section class="buttons">
      <button v-on:click="decode" v-bind:disabled="!file">Decode</button>
      <button v-on:click="play" v-bind:disabled="!audioBuffer">Play</button>
    </section>
  </section>
</template>

<script>
import createBufferToListen from '../utils/wave-pcm';
import { decodeAudioFile, playAudioFile } from '../utils/audio';

export default {
  data: function() {
    return {
      file: null,
      audioBuffer: null,
      selectedFormat: 'wave-pcm',
      sampleRate: 44100,
      numberOfChannels: 2,
      bitsPerSample: 16
    };
  },
  methods: {
    onFileLoaded: function(event) {
      const [ file ] = event.target.files;
      this.file = file;
      this.audioBuffer = null;
    },
    decode: function() {
      this.file.arrayBuffer()
        .then((fileBuffer) => createBufferToListen({ fileBuffer, ...this.audioParameters }))
        .then(decodeAudioFile)
        .then((audioBuffer) => { this.audioBuffer = audioBuffer; });
    },
    play: function() {
      playAudioFile(this.audioBuffer);
    },
  },
  computed: {
    audioParameters: function() {
      const { sampleRate, numberOfChannels, bitsPerSample } = this;
      return {
        sampleRate,
        numberOfChannels,
        bitsPerSample
      };
    }
  }
}
</script>

<style scoped>
fieldset {
  display: inline-block;
  min-width: 30vw;
  margin: 0.3em;
}
</style>