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
      <button v-on:click="play" v-bind:disabled="true">Play</button>
    </section>
  </section>
</template>

<script>
import { readFileAsDataURL } from '../utils/files';
import { getImageData, paintHistogram } from '../utils/canvas';
import { loadImage } from '../utils/image';
import { createHistogram } from '../utils/image-processing';

export default {
  data: function () {
    return {
      file: null,
      image: {}
    };
  },
  methods: {
    onFileLoaded: function (event) {
      const [file] = event.target.files;
      this.file = file;
      readFileAsDataURL(file)
        .then(loadImage)
        .then((image) => {
          this.image = image;
          const imageData = getImageData(image);
          const histogram = createHistogram(imageData);
          paintHistogram(this.$refs.histogramCanvas, histogram);
        });
    },
    play: function () { }
  },
  computed: {
    fileName: function () {
      return this.file ? this.file.name : '';
    },
    imageUrl: function () {
      return this.image ? this.image.src : '';
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
