<template>
  <transition name="fade" appear @after-leave="afterLeave">
    <div v-if="!isFadingOut" class="gallery-container">
      <header class="header">
        <div class="header-left"></div> <!-- 左側の空白部分（レイアウト調整用） -->
        <h1 class="logo">Takuya Mitarai</h1> <!-- ロゴ（中央に配置） -->
        <div class="header-right">
          <div class="menu" ref="menu">
            <div class="menu-icon" @click="toggleDropdown" aria-haspopup="true" :aria-expanded="showDropdown">
              <!-- メニューアイコン（クリックでドロップダウンメニューを開閉） -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <transition name="dropdown-fade">
                <div class="dropdown" v-if="showDropdown">
                  <!-- ドロップダウンメニューのリンク -->
                  <router-link to="/" class="dropdown-item" @click="closeDropdown">Gallery</router-link>
                  <router-link to="/achievement" class="dropdown-item" @click="closeDropdown">Achievement</router-link>
                  <router-link to="/information" class="dropdown-item" @click="closeDropdown">Information</router-link>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>
      <div class="header-line"></div> <!-- ヘッダー下のライン -->
      <div class="gallery">
        <div
          v-for="(image, index) in representativeImages"
          :key="image.id || index"
          class="gallery-item"
          :class="{ 'fade-in': image.visible }"
          @click="goToPhotoSection(image.name)"
        >
          <div class="content-wrapper">
            <div class="image-wrapper">
              <img :src="image.src" :alt="image.name" /> <!-- 画像の表示 -->
            </div>
            <div class="image-info">
              <p class="image-title">{{ image.title }}</p> <!-- 画像タイトルの表示 -->
            </div>
          </div>
          <div class="overlay"></div> <!-- ホバー時のオーバーレイ効果 -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { representativeImages } from '../data/representativePhotos.js';
import { throttle } from 'lodash';

const router = useRouter();
const isFadingOut = ref(false);
const navigateTo = ref(null);
const showDropdown = ref(false);
const menu = ref(null);

// フェードアウト完了後にページ遷移を実行する関数
const afterLeave = () => {
  if (navigateTo.value) {
    router.push(navigateTo.value).catch((error) => {
      console.error('ルート遷移中にエラーが発生しました:', error);
    });
  }
};

// 画像クリック時にフェードアウトを開始し、遷移先を設定する関数
const goToPhotoSection = (folderName) => {
  isFadingOut.value = true;
  navigateTo.value = { name: 'PhotoGallery', params: { folderName } };
};

// ドロップダウンメニューの表示・非表示を切り替える関数
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// ドロップダウンメニューを閉じる関数
const closeDropdown = () => {
  showDropdown.value = false;
};

// メニュー外のクリックを検出してドロップダウンメニューを閉じる関数
const handleClickOutside = throttle((event) => {
  if (menu.value && !menu.value.contains(event.target)) {
    showDropdown.value = false;
  }
}, 300);

// 画像をバッチごとに読み込み、表示タイミングを制御する関数
const revealImagesInBatches = () => {
  const batchSize = 8; // 1バッチあたりの画像数
  const displayInterval = 200; // 各画像の表示間隔（ミリ秒）0.4秒
  let initialDelay = 400; // 初期遅延（ミリ秒）
  const totalImages = representativeImages.length;
  let currentIndex = 0;

  const loadNextBatch = () => {
    if (currentIndex >= totalImages) return;

    const batch = representativeImages.slice(currentIndex, currentIndex + batchSize);
    let loadedCount = 0;

    // バッチ内の画像を読み込み開始
    batch.forEach((image, idx) => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === batch.length) {
          // バッチ内の全画像のロードが完了したら表示を開始
          batch.forEach((imgObj, idx) => {
            setTimeout(() => {
              imgObj.visible = true;
            }, initialDelay + idx * displayInterval);
          });
          // 次のバッチを読み込み開始
          currentIndex += batchSize;
          initialDelay = 0; // 次のバッチからは初期遅延を適用しない
          loadNextBatch();
        }
      };
      img.onerror = () => {
        console.error(`画像の読み込みに失敗しました: ${image.src}`);
        loadedCount++;
        if (loadedCount === batch.length) {
          // エラーがあっても次のバッチに進む
          batch.forEach((imgObj, idx) => {
            setTimeout(() => {
              imgObj.visible = true;
            }, initialDelay + idx * displayInterval);
          });
          currentIndex += batchSize;
          initialDelay = 0;
          loadNextBatch();
        }
      };
    });
  };

  // 画像の visible プロパティを初期化
  representativeImages.forEach((image) => {
    image.visible = false;
  });

  // 最初のバッチの読み込みを開始
  loadNextBatch();
};

// コンポーネントがマウントされたときの処理
onMounted(() => {
  revealImagesInBatches();

  // ドロップダウンメニュー外のクリックを検出するイベントリスナーを追加
  document.addEventListener('click', handleClickOutside);
});

// コンポーネントが破棄される前にイベントリスナーを削除
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* 既存のスタイルはそのまま */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  padding: 12px 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between; /* ヘッダーの左右をスペースで分ける配置 */
}

.header-left {
  flex: 1; /* 左側の空白部分（レイアウト調整用） */
}

.logo {
  flex: 1;
  color: white;
  font-style: italic;
  font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
  font-size: 21px;
  margin: 0;
  text-align: center;
  white-space: nowrap; /* テキストを一行にまとめる */
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end; /* 右寄せ */
}

.menu {
  position: relative;
  display: inline-block;
}

.menu-icon {
  color: white; /* アイコンの色を白に設定 */
  cursor: pointer;
}

.menu-icon svg {
  display: block;
}

/* ドロップダウンメニューのスタイル */
.dropdown {
  position: absolute;
  top: 30px; /* アイコンの下に配置 */
  right: 0;
  background-color: rgba(0, 174, 130, 0); /* 背景色を透明に設定 */
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(255, 255, 255, 0.215);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
}

.dropdown-item {
  color: rgb(255, 255, 255); /* テキスト色を白に設定 */
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(114, 114, 114, 0.502); /* ホバー時の背景色変更 */
}

/* ドロップダウンのフェードインアニメーション */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-line {
  width: 100%;
  height: 2px; /* ヘッダー下のラインの太さ */
  background-color: #ccc; /* ラインの色（グレー） */
  position: fixed;
  top: 56px;
  z-index: 999;
}

/* ギャラリーコンテナのスタイル */
.gallery-container {
  margin-top: 91px; /* ヘッダーとギャラリーの間の余白 */
  background-color: black;
}

.gallery,
.image-title {
  font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4列に配置 */
  gap: 35px; /* アイテム間の余白 */
  padding: 0 calc(12%); /* 横の端をビューポートの1/6空ける */
}

.gallery-item {
  box-sizing: border-box; /* ボーダーとパディングを含めて幅を計算 */
  position: relative;
  opacity: 0;
  transform: translateY(20px);
}

.gallery-item.fade-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.4s ease-in, transform 0.4s ease-in;
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
  height: 100%;
  display: block;
  object-fit: contain; /* 画像が切り取られないように調整 */
  transform: scale(1);
  transition: transform 0.5s ease-in-out; /* ホバー時のズームアニメーション */
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
  pointer-events: none;
}

.gallery-item:hover .overlay {
  background-color: rgba(0, 0, 0, 0.2); /* ホバー時にオーバーレイ */
}

.image-info {
  width: 100%;
  text-align: center;
  border-top: 1px solid white;
  padding: 10px 0;
  background-color: white;
}

.image-title {
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: rgb(35, 35, 35);
  background-color: white;
}

/* 縦長のビューポートに対するスタイル */
@media (max-aspect-ratio: 14/9) {
  .gallery-container {
    margin-top: 100px;
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    grid-template-columns: none;
  }

  .gallery-item {
    width: 100%;
    max-width: none;
    padding: 13px;
  }

  .image-wrapper img {
    height: auto;
    max-height: 80vh;
    object-fit: contain;
  }

  .image-title {
    font-size: 18px;
  }

  .overlay {
    width: 100%;
    height: 100%;
  }
}

/* 横長のビューポートに対するスタイル */
@media (min-aspect-ratio: 14/9) {
  .gallery {
    grid-template-columns: repeat(4, 1fr); /* 4列に設定 */
  }

  .gallery-item {
    width: auto;
  }

  .image-title {
    font-size: 18px;
  }

  .overlay {
    width: 100%;
    height: 100%;
  }
}
</style>
