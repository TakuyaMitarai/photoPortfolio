<template>
  <div>
    <header class="header">
      <div class="header-left">
        <button v-if="showBackButton" class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      <h1 class="logo">Takuya Mitarai</h1>
      <div class="header-right">
        <!-- 右側に配置する要素があればここに追加 -->
      </div>
    </header>
    <div class="header-line"></div>
    <div class="gallery">
      <!-- 画像ギャラリーの内容 -->
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

// 戻るボタンを表示するかどうかの判定
const showBackButton = ref(true);

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
  router.push({ name: 'Gallery' }).then(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // スムーズにスクロールしたい場合
    });
  });
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
  justify-content: space-between;
}

.header-line {
  width: 100%;
  height: 1px; /* ラインの太さ */
  background-color: #ccc; /* ラインの色（グレー） */
  position: fixed;
  top: 56px; /* ヘッダーの高さ + padding の調整 */
  z-index: 999; /* ヘッダーの下に表示 */
}

.header-left,
.header-right {
  width: 50px; /* 戻るボタンの幅と同じに設定 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.back-button i {
  vertical-align: middle;
}

.logo {
  flex: 1;
  color: white;
  font-style: italic;
  font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
  font-size: 21px;
  margin: 0;
  text-align: center;
}

.gallery {
  margin-top: 55px; /* ヘッダーの高さ */
}
</style>
