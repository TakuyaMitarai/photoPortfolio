<template>
  <section class="photo-section">
    <div 
      class="sticky-image" 
      :style="{
        backgroundImage: `url(${imageSrc})`
      }"> 
    </div>
  </section>
</template>

<script setup>
// propsを取得
const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.photo-section {
  height: 200vh;
  background-color: black;
}

.sticky-image {
  position: sticky;
  top: 40px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;  /* デフォルト値 */
  height: calc(100vh - 40px);  /* デフォルト値 */
}
</style>
