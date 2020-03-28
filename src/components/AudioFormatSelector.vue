<template>
  <section>
    <section class="audio-format-selector">
      <input
        type="radio"
        name="audio-format"
        id="audio-format-wave-pcm"
        value="wave-pcm"
        v-model="selectedFormat"
      />
      <label for="audio-format-wave-pcm">WAVE PCM</label>
    </section>
    <section class="audio-parameters">
      <label for="sample-rate">Sample Rate:</label>
      <input type="number" name="sample-rate" id="sample-rate" v-model="sampleRate" />
      <label for="number-channels">Number of Channels:</label>
      <input type="number" name="number-channels" id="number-channels" v-model="numberOfChannels" />
      <label for="bits-per-sample">Bits per Sample:</label>
      <input type="number" name="bits-per-sample" id="bits-per-sample" v-model="bitsPerSample" />
    </section>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      selectedFormat: 'wave-pcm',
      sampleRate: 44100,
      numberOfChannels: 2,
      bitsPerSample: 16
    };
  }
}
</script>

<style scoped>
section {
  text-align: center;
}
</style>