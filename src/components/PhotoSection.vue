<template>
  <section class="photo-section">
    <div class="sticky-image" :style="{ backgroundImage: `url(${imageSrc})` }"></div>
  </section>
</template>

<script>
export default {
  name: 'PhotoSection',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.photo-section {
  position: relative;
  width: 100%;
  height: 200vh;
}

.sticky-image {
  position: sticky;
  top: 80px;
  width: 100%;
  height: calc(100vh - 80px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
