<template>
  <transition name="fade" appear @after-leave="afterLeave">
    <div v-if="!isFadingOut" class="main-content">
      <!-- ヘッダー -->
      <header class="header">
        <div class="header-left">
          <button v-if="showBackButton" class="back-button" @click="goBack">
            <i class="fas fa-arrow-left"></i>
          </button>
        </div>
        <h1 class="logo">Takuya Mitarai</h1>
        <div class="header-right">
          <div class="menu" ref="menu">
            <div
              class="menu-icon"
              @click="toggleDropdown"
              aria-haspopup="true"
              :aria-expanded="showDropdown"
              aria-label="メニューを開く"
            >
              <!-- ハンバーガーアイコンのSVG -->
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
              <!-- プルダウンメニュー -->
              <div class="dropdown" v-if="showDropdown">
                <router-link
                  to="/"
                  class="dropdown-item"
                  @click="closeDropdown"
                >
                  Gallery
                </router-link>
                <router-link
                  to="/achievement"
                  class="dropdown-item"
                  @click="closeDropdown"
                >
                  Achievement
                </router-link>
                <router-link
                  to="/information"
                  class="dropdown-item"
                  @click="closeDropdown"
                >
                  Information
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="header-line"></div>

      <!-- コンテナ -->
      <div class="article-container">
        <div class="article-content">
          <!-- ページタイトル -->
          <h2 class="article-title">{{ article.title }}</h2>
          <!-- コンテンツのセパレーター -->
          <div class="content-separator"></div>
          
          <!-- 画像またはPDF埋め込み -->
          <div v-if="isImage" class="media-container">
            <img :src="getMediaUrl(article.media)" :alt="article.title" class="media" />
          </div>
          <div v-else-if="isPDF" class="media-container">
            <div class="media-pdf-wrapper">
              <iframe
                :src="getMediaUrl(article.media)"
                class="media-pdf"
                frameborder="0"
                allowfullscreen
                allow="autoplay; fullscreen; picture-in-picture"
              ></iframe>
            </div>
          </div>

          <!-- 内容文 -->
          <div class="article-text" v-html="article.content"></div>

          <!-- 関連URLリンク -->
          <div class="article-link">
            <a :href="article.url" target="_blank" rel="noopener noreferrer">関連URL</a> 
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// フェードアウトの管理
const isFadingOut = ref(false);
const showBackButton = ref(true); // 戻るボタンを表示するかどうか
const afterLeave = () => {
  // フェードアウト後に必要な処理があればここに追加
};

// ルーターとルートの取得
const router = useRouter();
const route = useRoute();

// ヘッダーメニューの管理
const showDropdown = ref(false);
const menu = ref(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const handleClickOutside = (event) => {
  if (menu.value && !menu.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// 戻るボタンの処理
const goBack = () => {
  isFadingOut.value = true;
};

// ナビゲーション後の処理
const handleAfterLeave = () => {
  router.back();
};

// メディアのURLを動的に生成する関数
const getMediaUrl = (mediaPath) => {
  return new URL(`../assets/${mediaPath}`, import.meta.url).href;
};

// 記事データの取得
const articles = ref([
  {
    id: 'DT_with_multi-objective_symbiotic_evolution',
    title: '多目的共生進化による決定木最適化',
    media: 'achievement/DT_with_multi-objective_symbiotic_evolution.pdf',
    content: '<p>Simplified Decision Tree Induction with Multi-objective Symbiotic Evolution（卒業研究）</p><p>卒業研究優秀発表者賞</p><p>↓サンプルコード</p>',
    url: 'https://github.com/TakuyaMitarai/NSSESAT_Visualizer',
  },
  {
    id: 'nsse',
    title: '多目的共生進化の有用性の検討',
    media: 'achievement/nsse.jpg',
    content: '<p>御手洗拓弥, 大谷紀子, "多目的共生進化の有用性の検討," 第24回進化計算学会研究会資料集, pp.94-98, 2023.</p><p>↓ソースコード</p>',
    url: 'https://github.com/TakuyaMitarai/NSSE',
  },
  {
    id: 'mosaic_art',
    title: '進化計算を用いた画像配置の最適化によるモザイク写真生成',
    media: 'achievement/ori_and_ma.jpg',
    content: '<p>類似度と公平性に基づく，協調共進化によるモザイク写真の配置最適化</p><p>第5回都市大研究プレゼンコンテスト・学部生優秀賞</p>',
    url: 'https://informatics.tcu.ac.jp/news/award/?&p=841',
  },
]);

// 現在のルートパラメータに基づいて記事を選択
const article = ref({});
onMounted(() => {
  const currentId = route.params.id;
  console.log('Current ID:', currentId); // デバッグ用
  const found = articles.value.find((a) => a.id === currentId);
  console.log('Found Article:', found); // デバッグ用
  if (found) {
    article.value = found;
  } else {
    // 記事が見つからない場合の処理
    router.push('/achievement');
  }
});

// メディアの種類を判定
const isImage = ref(false);
const isPDF = ref(false);
watch(
  () => article.value.media,
  (newVal) => {
    if (newVal) {
      const extension = newVal.split('.').pop().toLowerCase();
      isImage.value = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension);
      isPDF.value = extension === 'pdf';
    }
  },
  { immediate: true }
);

// 監視: isFadingOutがtrueになったらフェードアウト後に戻る
watch(isFadingOut, (newVal) => {
  if (newVal) {
    // フェードアウトの時間に合わせてナビゲーション
    setTimeout(() => {
      handleAfterLeave();
    }, 500); // CSSのフェードアウト時間と一致させる（0.5秒）
  }
});
</script>

<style scoped>
/* ヘッダーのスタイル */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #000;
  padding: 12px 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.header-left {
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
}

.logo {
  color: #fff;
  font-style: italic;
  font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
  font-size: 21px;
  margin: 0;
  text-align: center;
  white-space: nowrap;
}

.header-right {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
}

.menu {
  position: relative;
  display: inline-block;
}

.menu-icon {
  color: #fff;
  cursor: pointer;
  position: relative;
}

.menu-icon svg {
  display: block;
}

/* プルダウンメニュー */
.dropdown {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(255, 255, 255, 0.215);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-in-out;
}

.dropdown-item {
  color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(114, 114, 114, 0.502);
}

/* フェードインアニメーション */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-line {
  width: 100%;
  height: 2px;
  background-color: #ccc;
  position: fixed;
  top: 56px; /* ヘッダーの高さ + padding の調整 */
  z-index: 999;
}

/* 戻るボタンのスタイル */
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

/* コンテナのスタイル */
.article-container {
  margin-top: 91px; /* ヘッダーとコンテンツの間に余白を追加 */
  background-color: #000;
  min-height: 100vh;
  padding: 0 16.666vw; /* 1/6のビューポート幅を左右に */
  color: #fff;
  font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
}

.article-content {
  padding-top: 20px;
  text-align: left; /* 左揃えに変更 */
}

/* ページタイトル */
.article-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

/* コンテンツのセパレーター */
.content-separator {
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 0 auto 40px auto;
}

/* メディアコンテナ */
.media-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* 画像のスタイル */
.media {
  max-width: 70%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* PDF埋め込みのラッパー */
.media-pdf-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 9:16 アスペクト比 (16/9 * 100%) */
  overflow: hidden;
}

/* PDF埋め込みのスタイル */
.media-pdf {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  /* タッチイベントを有効にする */
  pointer-events: auto;
}

/* 内容文 */
.article-text {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 20px;
  color: #e0e0e0;
  background-color: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: left; /* 左揃えに追加 */
}

/* 関連URLリンク */
.article-link {
  font-size: 18px;
  text-align: left; /* 左揃えに変更 */
  display: flex;
  align-items: center;
  gap: 8px;
}

.article-link a {
  color: #1e90ff;
  text-decoration: none;
  padding: 8px 12px;
  background-color: #333;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  display: inline-block;
}

.article-link a:hover {
  background-color: #1e90ff;
  color: white;
}

/* オーバーレイ（既存のスタイルを保持） */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.card:hover .card-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}

/* フェード遷移の定義 */
.fade-enter-active,
.fade-leave-active,
.fade-appear-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to,
.fade-appear-from {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from,
.fade-appear-to {
  opacity: 1;
}

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

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .article-container {
    padding: 0 16.666vw; /* 1/6のビューポート幅を左右に */
  }

  .media-pdf-wrapper {
    padding-top: 56.25%; /* 9:16 アスペクト比 */
  }

  .media-pdf {
    height: 100%;
  }

  .article-text {
    font-size: 16px;
    padding: 15px;
  }

  .article-link {
    font-size: 16px;
  }

  .article-link a {
    font-size: 16px;
    padding: 6px 10px;
  }

  .article-title {
    font-size: 28px;
  }

  .back-button {
    font-size: 20px;
  }
}
</style>
