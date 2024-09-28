<!-- achievement.vue -->
<template>
    <transition name="fade" appear @after-leave="afterLeave">
      <div v-if="!isFadingOut">
        <!-- ヘッダー -->
        <header class="header">
          <h1 class="logo">Takuya Mitarai</h1>
          <div class="header-right">
            <div class="menu" ref="menu">
              <div
                class="menu-icon"
                @click="toggleDropdown"
                aria-haspopup="true"
                :aria-expanded="showDropdown"
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
        <div class="achievement-container">
          <div class="achievement-content">
            <h2 class="section-title">Achievement</h2>
            <!-- 最初の横線 -->
            <div class="content-separator"></div>
            <div class="cards">
              <div
                v-for="(item, index) in achievementItems"
                :key="index"
                class="card"
                @click="navigateTo(item.url)"
              >
                <div class="card-content">
                  <div class="card-image">
                    <img :src="getImageUrl(item.image)" :alt="item.title" />
                  </div>
                  <div class="card-text">
                    <h3 class="card-title">{{ item.title }}</h3>
                    <p class="card-caption">{{ item.caption }}</p>
                  </div>
                </div>
                <div class="card-overlay"></div>
                <div class="card-separator"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  
  // 研究項目のデータ
  const achievementItems = ref([
    {
      image: 'achievement/dt.jpg', // src/assets/images/achievement2.jpg
      title: '多目的共生進化による決定木最適化',
      caption: 'Simplified Decision Tree Induction with Multi-objective Symbiotic Evolution（2024）',
      url: '/achievement/DT_with_multi-objective_symbiotic_evolution',
    },
    {
      image: 'achievement/nsse.jpg', // src/assets/images/achievement1.jpg
      title: '多目的共生進化の有用性の検討',
      caption: '第24回進化計算学会研究会(2023)',
      url: '/achievement/nsse',
    },
    {
      image: 'achievement/mosaic_art.jpg', // src/assets/images/achievement1.jpg
      title: '進化計算を用いた画像配置の最適化によるモザイク写真生成',
      caption: '第5回都市大研究プレゼンコンテストにて発表(2022)',
      url: '/achievement/mosaic_art',
    },
  ]);
  
  const router = useRouter();
  const isFadingOut = ref(false);
  
  const navigateTo = (url) => {
    isFadingOut.value = true;
    setTimeout(() => {
      router.push(url);
    }, 500); // フェードアウトの時間と合わせる
  };
  
  // 画像のURLを動的に生成する関数
  const getImageUrl = (imagePath) => {
    return new URL(`../assets/${imagePath}`, import.meta.url).href;
  };
  
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
  
  // フェードアウト後の処理
  const afterLeave = () => {
    // 必要に応じて追加
  };
  </script>
  
  <style scoped>
  /* ヘッダーのスタイル */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: black;
    padding: 12px 20px; /* 左右の余白を固定値に変更 */
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center; /* ロゴを中央に配置 */
    box-sizing: border-box;
  }
  
  .logo {
    color: white;
    font-style: italic;
    font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
    font-size: 21px;
    margin: 0;
    text-align: center;
    white-space: nowrap; /* テキストを一行にまとめる */
  }
  
  .header-right {
    position: absolute;
    right: 20px; /* メニューを右側に固定 */
    display: flex;
    align-items: center;
  }
  
  .menu {
    position: relative;
    display: inline-block;
  }
  
  .menu-icon {
    color: white; /* アイコンの色を白に設定 */
    cursor: pointer;
    position: relative;
  }
  
  .menu-icon svg {
    display: block;
  }
  
  /* プルダウンメニュー */
  .dropdown {
    position: absolute;
    top: 30px; /* アイコンの下に配置 */
    right: 0;
    background-color: rgba(0, 0, 0, 0.9); /* 背景色を黒に設定 */
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgba(255, 255, 255, 0.215);
    z-index: 1;
    border-radius: 4px;
    overflow: hidden;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .dropdown-item {
    color: rgb(255, 255, 255); /* テキスト色を白に設定 */
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
    height: 2px; /* ラインの太さ */
    background-color: #ccc; /* ラインの色（グレー） */
    position: fixed;
    top: 56px; /* ヘッダーの高さ + padding の調整 */
    z-index: 999; /* ヘッダーの下に表示 */
  }
  
  /* コンテナのスタイル */
  .achievement-container {
    margin-top: 91px; /* ヘッダーとコンテンツの間に余白を追加 */
    background-color: black;
    min-height: 100vh;
    padding: 0 10vw; /* 左右にビューポートの1/10の余白 */
    color: white;
    font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
  }
  
  .achievement-content {
    padding-top: 20px;
  }
  
  /* セクションタイトル */
  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  /* 最初の横線 */
  .content-separator {
    width: 100%;
    height: 1px;
    background-color: gray;
    margin: 0 auto 40px auto;
  }
  
  /* カードコンテナ */
  .cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  /* 個々のカード */
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: transparent;
  }
  
  .card-content {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
  }
  
  .card-image {
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease-in-out;
  }
  
  .card:hover .card-image img {
    transform: scale(1.05); /* ホバー時に少し拡大 */
  }
  
  .card-text {
    flex: 1;
  }
  
  .card-title {
    font-size: 24px;
    margin: 0 0 10px 0;
  }
  
  .card-caption {
    font-size: 16px;
    margin: 0;
  }
  
  /* セパレーターライン */
  .card-separator {
    width: 100%;
    height: 1px;
    background-color: gray;
    margin: 20px auto 0 auto;
  }
  
  /* オーバーレイ */
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
    .achievement-container {
      padding: 0 5vw;
    }
  
    .card-content {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .card-image {
      width: 100%;
      height: auto;
    }
  
    .card-image img {
      width: 100%;
      height: auto;
    }
  
    .card-separator {
      width: 100%;
    }
  
    .content-separator {
      width: 90%;
      margin-bottom: 30px;
    }
  }
  </style>
  