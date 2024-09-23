<template>
  <div id="app">
    <AppHeader />
    <div class="content">
      <PhotoSection v-for="(image, index) in images" :key="index" :imageSrc="image" />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import PhotoSection from './components/PhotoSection.vue';

import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';
import photo4 from './assets/photo4.jpg';

export default {
  name: 'App',
  components: {
    AppHeader,
    PhotoSection,
  },
  data() {
    return {
      images: [photo1, photo2, photo3, photo4],
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  margin: 0;
  padding: 0;
}

.content {
  margin-top: 80px;
}
</style>
