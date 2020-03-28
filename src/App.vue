<template>
  <div id="app">
    <header>
      <h1>Let the file sound</h1>
    </header>
    <main>
      <section class="file">
        <label for="file-selector">Load the file you want to listen to</label>
        <input id="file-selector" type="file" v-on:change="onFileLoaded" />
      </section>
      <AudioFormatSelector></AudioFormatSelector>
      <section class="buttons">
        <button v-on:click="decode" v-bind:disabled="!file">Decode</button>
        <button v-on:click="play" v-bind:disabled="!audioBuffer">Play</button>
      </section>
    </main>
  </div>
</template>

<script>
import createBufferToListen from './utils/wave-pcm';
import { decodeAudioFile, playAudioFile } from './utils/audio';
import AudioFormatSelector from './components/AudioFormatSelector';

export default {
  name: 'app',
  components: {
    AudioFormatSelector
  },
  data: function() {
    return {
      file: null,
      audioBuffer: null
    };
  },
  methods: {
    onFileLoaded: function(event) {
      const [ file ] = event.target.files;
      this.file = file;
      this.audioBuffer = null;
    },
    play: function() {
      playAudioFile(this.audioBuffer);
    },
    decode: function() {
      this.file.arrayBuffer()
        .then((fileBuffer) => createBufferToListen({ fileBuffer }))
        .then(decodeAudioFile)
        .then((audioBuffer) => { this.audioBuffer = audioBuffer; });
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

h1 {
  text-align: center;
}

.file,
.buttons {
  text-align: center;
  margin: 1em;
}
</style>
