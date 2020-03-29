<template>
  <section class="audio-manager">
    <section class="file">
      <label for="file-selector">Load the file you want to listen to</label>
      <input id="file-selector" type="file" v-on:change="onFileLoaded" />
    </section>
    <section>
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
    </section>
    <section>
      <fieldset class="audio-parameters">
        <legend>Parameters</legend>
        <ul>
          <li>
            <label for="sample-rate">Sample Rate:</label>
            <input
              type="number"
              name="sample-rate"
              id="sample-rate"
              v-model="sampleRate"
            />
          </li>
          <li>
            <label for="number-channels">Number of Channels:</label>
            <input
              type="number"
              name="number-channels"
              id="number-channels"
              v-model="numberOfChannels"
            />
          </li>
          <li>
            <label for="bits-per-sample">Bits per Sample:</label>
            <input
              type="number"
              name="bits-per-sample"
              id="bits-per-sample"
              v-model="bitsPerSample"
            />
          </li>
        </ul>
      </fieldset>
    </section>
    <section class="buttons">
      <button v-on:click="decode" v-bind:disabled="!file">Decode</button>
      <button v-on:click="play" v-bind:disabled="!audioBuffer">Play</button>
    </section>
  </section>
</template>

<script>
import createBufferToListen from '../utils/wave-pcm';
import { decodeAudioFile, playAudioFile } from '../utils/audio';
import { readFileAsArrayBuffer } from '../utils/files';

export default {
  data: function () {
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
    onFileLoaded: function (event) {
      const [file] = event.target.files;
      this.file = file;
      this.audioBuffer = null;
    },
    decode: function () {
      readFileAsArrayBuffer(this.file)
        .then(fileBuffer =>
          createBufferToListen({ fileBuffer, ...this.audioParameters })
        )
        .then(decodeAudioFile)
        .then(audioBuffer => {
          this.audioBuffer = audioBuffer;
        });
    },
    play: function () {
      playAudioFile(this.audioBuffer);
    }
  },
  computed: {
    audioParameters: function () {
      const { sampleRate, numberOfChannels, bitsPerSample } = this;
      return {
        sampleRate,
        numberOfChannels,
        bitsPerSample
      };
    }
  }
};
</script>

<style scoped>
.audio-manager {
  text-align: center;
}

.file {
  margin: 3em;
}

fieldset {
  display: inline-block;
  min-width: 30vw;
  margin: 0.3em;
}

legend {
  text-align: left;
}

ul {
  padding: 0;
}

li {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

li label {
  margin-right: 1.5em;
}
</style>
