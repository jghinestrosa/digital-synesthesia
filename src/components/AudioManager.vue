<template>
  <section class="audio-manager">
    <fieldset>
      <legend>Audio Interpreter</legend>
      <input
        type="radio"
        name="audio-interpreter-selection"
        id="audio-raw-interpreter"
        value="raw"
        v-model="interpreter"
      />
      <label for="audio-raw-interpreter">Audio Raw Interpreter</label>
      <input
        type="radio"
        name="audio-interpreter-selection"
        id="audio-rgb-interpreter"
        value="rgb"
        v-model="interpreter"
      />
      <label for="audio-rgb-interpreter">RGB Interpreter</label>
    </fieldset>
    <AudioRawInterpreter v-show="isRawInterpreterSelected"></AudioRawInterpreter>
    <AudioRGBInterpreter v-show="isRGBInterpreterSelected"></AudioRGBInterpreter>
  </section>
</template>

<script>
import AudioRawInterpreter from './AudioRawInterpreter';
import AudioRGBInterpreter from './AudioRGBInterpreter';

export default {
  components: {
    AudioRawInterpreter,
    AudioRGBInterpreter
  },
  data: function () {
    return {
      interpreter: 'raw'
    };
  },
  methods: {
  },
  computed: {
    isRawInterpreterSelected: function() {
      return this.interpreter === 'raw';
    },
    isRGBInterpreterSelected: function() {
      return this.interpreter === 'rgb';
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

figure img {
  width: 300px;
}
</style>
