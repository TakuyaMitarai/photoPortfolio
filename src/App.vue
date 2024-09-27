<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// 特にスクリプトは必要ありません
</script>

<style>
/* グローバルスタイル */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-color: white; /* 背景色を白に変更 */
  color: black; /* テキストカラーを黒に */
  min-height: 100vh;
}
</style>
