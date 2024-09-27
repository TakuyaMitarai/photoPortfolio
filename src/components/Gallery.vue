<template>
  <div>
    <header class="header">
      <h1 class="logo">Takuya Mitarai</h1>
    </header>
    <div class="header-line"></div>
    <!-- 余白を追加するためのコンテナ -->
    <div class="gallery-container">
      <div class="gallery">
        <div
          v-for="(image, index) in representativeImages"
          :key="index"
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
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const representativeImages = reactive([
  { name: 'photo1', title: 'Photo 1', src: '', visible: false, elementRef: null },
  { name: 'photo2', title: 'Photo 2', src: '', visible: false, elementRef: null },
  { name: 'photo3', title: 'Photo 3', src: '', visible: false, elementRef: null },
  { name: 'photo4', title: 'Photo 4', src: '', visible: false, elementRef: null },
  { name: 'photo5', title: 'Photo 5', src: '', visible: false, elementRef: null },
  { name: 'photo6', title: 'Photo 6', src: '', visible: false, elementRef: null },
  { name: 'photo7', title: 'Photo 7', src: '', visible: false, elementRef: null },
  { name: 'photo8', title: 'Photo 8', src: '', visible: false, elementRef: null },
  { name: 'photo9', title: 'Photo 9', src: '', visible: false, elementRef: null },
  { name: 'photo10', title: 'Photo 10', src: '', visible: false, elementRef: null },
  { name: 'photo11', title: 'Photo 11', src: '', visible: false, elementRef: null },
  { name: 'photo12', title: 'Photo 12', src: '', visible: false, elementRef: null },
  { name: 'photo13', title: 'Photo 13', src: '', visible: false, elementRef: null },
  { name: 'photo14', title: 'Photo 14', src: '', visible: false, elementRef: null },
  { name: 'photo15', title: 'Photo 15', src: '', visible: false, elementRef: null },
  { name: 'photo16', title: 'Photo 16', src: '', visible: false, elementRef: null },
  { name: 'photo17', title: 'Photo 17', src: '', visible: false, elementRef: null },
  { name: 'photo18', title: 'Photo 18', src: '', visible: false, elementRef: null },
  { name: 'photo19', title: 'Photo 19', src: '', visible: false, elementRef: null },
  { name: 'photo20', title: 'Photo 20', src: '', visible: false, elementRef: null },
]);

// 画像をインポート
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';
import photo4 from '../assets/photo4.jpg';
import photo5 from '../assets/photo5.jpg';
import photo6 from '../assets/photo6.jpg';
import photo7 from '../assets/photo7.jpg';
import photo8 from '../assets/photo8.jpg';
import photo9 from '../assets/photo9.jpg';
import photo10 from '../assets/photo10.jpg';
import photo11 from '../assets/photo11.jpg';
import photo12 from '../assets/photo12.jpg';
import photo13 from '../assets/photo13.jpg';
import photo14 from '../assets/photo14.jpg';
import photo15 from '../assets/photo15.jpg';
import photo16 from '../assets/photo16.jpg';
import photo17 from '../assets/photo17.jpg';
import photo18 from '../assets/photo18.jpg';
import photo19 from '../assets/photo19.jpg';
import photo20 from '../assets/photo20.jpg';

representativeImages[0].src = photo1;
representativeImages[1].src = photo2;
representativeImages[2].src = photo3;
representativeImages[3].src = photo4;
representativeImages[4].src = photo5;
representativeImages[5].src = photo6;
representativeImages[6].src = photo7;
representativeImages[7].src = photo8;
representativeImages[8].src = photo9;
representativeImages[9].src = photo10;
representativeImages[10].src = photo11;
representativeImages[11].src = photo12;
representativeImages[12].src = photo13;
representativeImages[13].src = photo14;
representativeImages[14].src = photo15;
representativeImages[15].src = photo16;
representativeImages[16].src = photo17;
representativeImages[17].src = photo18;
representativeImages[18].src = photo19;
representativeImages[19].src = photo20;

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

// Gallery.vue
const goToPhotoSection = (folderName) => {
  router.push({ name: 'PhotoGallery', params: { folderName } });
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

.header-line {
  width: 100%;
  height: 1px; /* ラインの太さ */
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

.gallery, .image-title {
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
  border: 1px solid gray; /* グレーのボーダー */
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
  transition: transform 0.3s ease-in-out; /* ホバー時の拡大アニメーション */
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
  transition: background-color 0.3s;
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

/* 縦長ビューポイントの場合 */
@media (max-aspect-ratio: 16/9) {
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
@media (min-aspect-ratio: 16/9) {
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
