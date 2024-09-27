<template>
  <transition name="fade" appear @after-leave="afterLeave">
    <div v-if="!isFadingOut" class="gallery-container">
      <header class="header">
        <h1 class="logo">Takuya Mitarai</h1>
      </header>
      <div class="header-line"></div>
      <!-- 余白を追加するためのコンテナ -->
      <div class="gallery">
        <div
          v-for="(image, index) in representativeImages"
          :key="image.name" 
          class="gallery-item"
          :class="{ 'fade-in': image.visible }"
          @click="goToPhotoSection(image.name)"
          :ref="(el) => (image.elementRef = el)"
        >
          <div class="content-wrapper">
            <div class="image-wrapper">
              <img :src="image.src" :alt="image.name" />
            </div>
            <div class="image-info">
              <p class="image-title">{{ image.title }}</p>
            </div>
          </div>
          <div class="overlay"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { representativeImages } from '../data/representativePhotos.js'; // 名前付きエクスポートをインポート

const router = useRouter();
const isFadingOut = ref(false); // フェードアウト状態を管理
const navigateTo = ref(null);   // 遷移先のルート情報を保持

// フェードアウト後にページ遷移を実行する関数
const afterLeave = () => {
  if (navigateTo.value) {
    router.push(navigateTo.value);
  }
};

// クリック時にフェードアウトを開始し、遷移先を設定する関数
const goToPhotoSection = (folderName) => {
  isFadingOut.value = true; // フェードアウトを開始
  navigateTo.value = { name: 'PhotoGallery', params: { folderName } }; // 遷移先を設定
};

// Intersection Observer の設定
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = representativeImages.findIndex(
          (image) => image.elementRef === entry.target
        );
        if (entry.isIntersecting && index !== -1 && !representativeImages[index].visible) {
          setTimeout(() => {
            representativeImages[index].visible = true;
          }, index * 100); // 0.1秒ずつ遅延
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  representativeImages.forEach((image) => {
    if (image.elementRef) {
      observer.observe(image.elementRef);
    }
  });
});
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

.header-line {
  width: 100%;
  height: 2px; /* ラインの太さ */
  background-color: #ccc; /* ラインの色（グレー） */
  position: fixed;
  top: 56px; /* ヘッダーの高さ + padding の調整 */
  z-index: 999; /* ヘッダーの下に表示 */
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

/* 明朝体フォントの設定 */
.gallery-container {
  /* ヘッダーとギャラリーの間に余白を追加 */
  margin-top: 91px; /* 必要に応じて調整してください */
  background-color: black;
}

.gallery,
.image-title {
  font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4列に設定 */
  gap: 35px; /* アイテム間の隙間 */
  padding: 0 calc(12%); /* 横の端をビューポートの1/6空ける */
  /* margin-topは.gallery-containerに移動 */
}

.gallery-item {
  box-sizing: border-box; /* ボーダーとパディングを含めて幅を計算 */
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  display: flex;
  flex-direction: column;
  border: 3px solid gray; /* グレーのボーダー */
  padding: 13px; /* パディングを1.3倍に */
  cursor: pointer; /* クリック可能なカーソル */
  background-color: white; /* 背景色を白に設定 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 軽いシャドウを追加 */
}

.content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-wrapper {
  width: 100%;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%; /* 高さを100%に設定 */
  display: block;
  object-fit: contain; /* 画像が切り取られないようにcontainに変更 */
  transform: scale(1); /* 初期状態 */
  transition: transform 0.5s ease-in-out; /* ホバー時の拡大アニメーション */
}

.gallery-item:hover .image-wrapper img {
  transform: scale(1.05); /* ホバー時に少し拡大 */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); /* 初期は透明 */
  transition: background-color 0.5s;
  pointer-events: none; /* オーバーレイがクリックを妨げないように */
}

.gallery-item:hover .overlay {
  background-color: rgba(0, 0, 0, 0.2); /* 透過率20%の黒 */
}

.image-info {
  width: 100%;
  text-align: center;
  border-top: 1px solid white; /* タイトル上のボーダー */
  padding: 10px 0; /* タイトルの上下パディングを1.3倍に */
  background-color: white; /* タイトル部分の背景色 */
}

.image-title {
  margin: 0;
  padding: 0;
  font-size: 18px; /* フォントサイズを1.3倍に (16px * 1.3 ≈ 21px) */
  color: rgb(35, 35, 35); /* タイトルの色 */
  background-color: white;
}

/* 画像のフェードインアニメーション */
.gallery-item.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* フェード遷移の定義 */
.fade-enter-active,
.fade-leave-active,
.fade-appear-active { /* 追加 */
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to,
.fade-appear-from { /* 追加 */
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from,
.fade-appear-to { /* 追加 */
  opacity: 1;
}

/* フェードイン時に位置もアニメーション */
.fade-appear-active {
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}
.fade-appear-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-appear-to {
  opacity: 1;
  transform: translateY(0);
}

/* 縦長ビューポイントの場合 */
@media (max-aspect-ratio: 14/9) {
  .gallery-container {
    margin-top: 100px; /* ヘッダーとギャラリーの間の余白を維持 */
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    grid-template-columns: none; /* Gridレイアウトを解除 */
  }

  .gallery-item {
    width: 100%; /* 1列表示 */
    max-width: none; /* 最大幅の制限を解除 */
    padding: 13px; /* パディングを1.3倍に */
  }

  .image-wrapper img {
    height: auto; /* 高さを自動に設定 */
    max-height: 80vh; /* ビューポートの高さの4/5に制限 */
    object-fit: contain; /* 画像が切り取られないようにcontainに変更 */
  }

  .image-title {
    font-size: 18px; /* フォントサイズを1.3倍に */
  }

  .overlay {
    width: 100%;
    height: 100%;
  }
}

/* 横長ビューポイントの場合 */
@media (min-aspect-ratio: 14/9) {
  .gallery {
    grid-template-columns: repeat(4, 1fr); /* 4列に設定 */
  }

  .gallery-item {
    width: auto; /* Gridの設定に任せる */
  }

  .image-title {
    font-size: 18px; /* フォントサイズを1.3倍に */
  }

  .overlay {
    width: 100%;
    height: 100%;
  }
}
</style>
