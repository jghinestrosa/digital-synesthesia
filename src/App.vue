<template>
  <div id="app">
    <header>
      <h1>Digital Synesthesia</h1>
    </header>
    <main>
      <MediaSelector></MediaSelector>
    </main>
  </div>
</template>

<script>
import MediaSelector from './components/MediaSelector';

export default {
  name: 'app',
  components: {
    MediaSelector
  },
  data: function() {
    return {
    };
  },
  methods: {
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
