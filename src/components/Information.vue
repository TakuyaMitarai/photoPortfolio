<template>
    <transition name="fade" appear @after-leave="afterLeave">
      <div v-if="!isFadingOut" class="information-container">
        <!-- ヘッダー（Gallery.vueからコピー） -->
        <header class="header">
          <div class="header-left"></div> <!-- 左側の空白部分 -->
          <h1 class="logo">Takuya Mitarai</h1>
          <div class="header-right">
            <div class="menu" ref="menu">
              <div class="menu-icon" @click="toggleDropdown" aria-haspopup="true" :aria-expanded="showDropdown">
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
                  <router-link to="/" class="dropdown-item" @click="closeDropdown">Gallery</router-link>
                  <router-link to="/research" class="dropdown-item" @click="closeDropdown">Research</router-link>
                  <router-link to="/information" class="dropdown-item" @click="closeDropdown">Information</router-link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="header-line"></div>
  
        <!-- コンテンツ -->
        <div class="information-content">
          <h2 class="section-title">Information</h2>
          <div class="info-cards">
            <div class="info-card">
              <span class="info-icon">
                <!-- 氏名アイコン（例としてユーザーアイコン） -->
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path fill-rule="evenodd" d="M8 9c-4 0-6 2-6 4v1h12v-1c0-2-2-4-6-4z"/>
                </svg>
              </span>
              <div class="info-text">
                <h3>氏名</h3>
                <p>御手洗　拓弥</p>
              </div>
            </div>
            <div class="info-card">
              <span class="info-icon">
                <!-- 所属アイコン（例としてビルアイコン） -->
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                  <path d="M4 0a2 2 0 0 0-2 2v1h12V2a2 2 0 0 0-2-2H4zm0 4v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4H4z"/>
                </svg>
              </span>
              <div class="info-text">
                <h3>所属</h3>
                <p>東京都市大学　環境情報学研究科　環境情報学専攻</p>
              </div>
            </div>
            <div class="info-card">
              <span class="info-icon">
                <!-- GitHubアイコン -->
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.68 7.68 0 0 1 2-.28c.68 0 1.36.09 2 .28 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </span>
              <div class="info-text">
                <h3>GitHub</h3>
                <a href="https://github.com/TakuyaMitarai" target="_blank" rel="noopener noreferrer">
                    https://github.com/TakuyaMitarai
                </a>
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
  
  const router = useRouter();
  const isFadingOut = ref(false);
  
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
  /* ヘッダーのスタイル（Gallery.vueからコピー） */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: black;
    padding: 12px 20px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右に配置 */
  }
  
  .header-left {
    flex: 1; /* 左側の空白部分 */
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
    position: relative;
    margin-right: 0px; /* 右から左に20px移動 */
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
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
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
  .information-container {
    margin-top: 91px; /* ヘッダーとコンテンツの間に余白を追加 */
    background-color: black;
    min-height: 100vh;
    padding: 0 10vw; /* 左右にビューポートの1/10の余白 */
    color: white;
    font-family: 'Yu Mincho', 'Hiragino Mincho Pro', 'MS Mincho', serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  /* セクションタイトル */
  .section-title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  
  /* 情報カードコンテナ */
  .info-cards {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    max-width: 600px;
  }
  
  /* 個々の情報カード */
  .info-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }
  
  .info-card:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .info-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .info-text {
    display: flex;
    flex-direction: column;
  }
  
  .info-text h3 {
    margin: 0 0 5px 0;
    font-size: 20px;
  }
  
  .info-text p,
  .info-text a {
    margin: 0;
    font-size: 16px;
  }
  
  .info-text a {
    color: #00aced;
    text-decoration: none;
  }
  
  .info-text a:hover {
    text-decoration: underline;
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
  
  /* レスポンシブデザイン */
  @media (max-width: 768px) {
    .information-container {
      padding: 0 5vw;
    }
  
    .info-cards {
      max-width: 100%;
    }
  
    .info-card {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .info-icon {
      margin-bottom: 10px;
    }
  }
  </style>
  