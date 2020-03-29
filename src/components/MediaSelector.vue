<template>
  <main>
    <section class="media-selection">
      <label for="media-audio">Audio</label>
      <input
        type="radio"
        name="media-audio"
        id="media-audio"
        value="audio"
        v-model="selectedMedia"
      />
      <label for="media-video">Video</label>
      <input
        type="radio"
        name="media-video"
        id="media-video"
        value="video"
        v-model="selectedMedia"
      />
    </section>
    <AudioManager v-show="hasToShowAudioManager"></AudioManager>
  </main>
</template>

<script>
import AudioManager from './AudioManager';

export default {
  components: {
    AudioManager
  },
  data: function () {
    return {
      selectedMedia: 'audio'
    };
  },
  computed: {
    hasToShowAudioManager: function () {
      return this.selectedMedia === 'audio';
    }
  }
};
</script>

<style scoped>
.media-selection {
  text-align: center;
}
</style>
