<template>
  <section class="audio-raw-interpreter">
    <section class="file">
      <label for="file-selector">Load the file you want to listen to</label>
      <input id="file-selector" type="file" accept="image/*" v-on:change="onFileLoaded" />
    </section>
    <figure v-show="imageUrl">
      <img v-bind:src="imageUrl" alt="The image loaded by the user" />
      <figcaption>{{ fileName }} - {{ image.width }}x{{ image.height }}</figcaption>
    </figure>
    <canvas ref="histogramCanvas" width="256" height="100"></canvas>
    <section class="buttons">
      <button v-on:click="play" v-bind:disabled="!canPlay">Play</button>
      <button v-on:click="stop" v-bind:disabled="!isPlaying">Stop</button>
    </section>
  </section>
</template>

<script>
import { readFileAsDataURL } from '../utils/files';
import { getImageData, paintHistogram } from '../utils/canvas';
import { loadImage } from '../utils/image';
import { createHistogram } from '../utils/image-processing';
import { createOscillatorsFromHistogram } from '../utils/audio';

export default {
  data: function () {
    return {
      file: null,
      image: {},
      histogram: null,
      playerStatus: 'notReady'
    };
  },
  methods: {
    onFileLoaded: function (event) {
      if (this.playerStatus === 'playing') {
        this.stop();
      }
      this.playerStatus = 'notReady';
      const [file] = event.target.files;
      this.file = file;
      readFileAsDataURL(file)
        .then(loadImage)
        .then((image) => {
          this.image = image;
          const imageData = getImageData(image);
          const histogram = createHistogram(imageData);
          this.histogram = histogram;
          paintHistogram(this.$refs.histogramCanvas, histogram);
          this.playerStatus = 'ready';
        });
    },
    createOscillators: function() {
      const channelR = this.histogram.map(({ r }) => r);
      const channelG = this.histogram.map(({ g }) => g);
      const channelB = this.histogram.map(({ b }) => b);
      const oscillatorR = createOscillatorsFromHistogram(channelR, Math.max.apply(null, channelR), 100, 4000);
      const oscillatorG = createOscillatorsFromHistogram(channelG, Math.max.apply(null, channelG), 100, 4000);
      const oscillatorB = createOscillatorsFromHistogram(channelB, Math.max.apply(null, channelB), 100, 4000);
      this.oscillators = [...oscillatorR, ...oscillatorG, ...oscillatorB];
    },
    play: function () {
      this.createOscillators();
      this.oscillators.forEach((oscillator) => oscillator.start());
      this.playerStatus = 'playing';
    },
    stop: function() {
      this.oscillators.forEach((oscillator) => oscillator.stop());
      this.playerStatus = 'ready';
    }
  },
  computed: {
    fileName: function () {
      return this.file ? this.file.name : '';
    },
    imageUrl: function () {
      return this.image ? this.image.src : '';
    },
    canPlay: function() {
      return this.playerStatus === 'ready';
    },
    isPlaying: function() {
      return this.playerStatus === 'playing';
    }
  }
}
</script>

<style scoped>
.audio-raw-interpreter {
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

figure img {
  width: 300px;
}
</style>
