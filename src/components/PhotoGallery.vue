<template>
  <div>
    <header class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="logo">Takuya Mitarai</h1>
    </header>
    <div class="gallery">
      <PhotoSection
        v-for="(image, index) in images"
        :key="index"
        :imageSrc="image"
        :fadeIn="index === 0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PhotoSection from './PhotoSection.vue';

const route = useRoute();
const router = useRouter();

const folderName = route.params.folderName;
const images = ref([]);

// 画像の読み込み
const modules = import.meta.glob('../assets/**/*.jpg', { eager: true });

images.value = Object.keys(modules)
  .filter((key) => key.includes(`/${folderName}/`))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)\.jpg$/)[1]);
    const numB = parseInt(b.match(/(\d+)\.jpg$/)[1]);
    return numA - numB;
  })
  .map((key) => modules[key].default || modules[key]);

const goBack = () => {
  router.push({ name: 'Gallery' });
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  padding: 12px 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}

.back-button i {
  vertical-align: middle;
}

.logo {
  flex: 1;
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  margin: 0;
  text-align: center;
}

.gallery {
  margin-top: 50px; /* ヘッダーの高さ */
}
</style>
