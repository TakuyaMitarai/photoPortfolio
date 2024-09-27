<template>
  <section ref="section" class="photo-section">
    <div
      class="image"
      :class="{ fixed: isFixed, 'fade-in': fade }"
      :style="{ backgroundImage: `url(${imageSrc})` }"
    ></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// propsを取得
const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  fadeIn: {
    type: Boolean,
    default: false,
  },
});

const section = ref(null);
const isFixed = ref(false);
const fade = ref(!props.fadeIn); // fadeInがtrueの場合、fadeはfalse（opacity: 0）、falseの場合はfadeはtrue（opacity: 1）

const handleScroll = () => {
  if (section.value) {
    const sectionRect = section.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (sectionRect.bottom / 2 <= windowHeight) {
      isFixed.value = true;
    } else {
      isFixed.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 初期状態を設定
  handleScroll();

  if (props.fadeIn) {
    // フェードインが必要な場合
    setTimeout(() => {
      fade.value = true; // opacityを1にする
    }, 100); // 0.1秒後にフェードイン開始
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.photo-section {
  height: 200vh;
  position: relative;
  background-color: black;
}

.image {
  position: sticky;
  top: 55px;
  width: 100%;
  height: calc(100vh - 20px);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0; /* 初期状態で透明にする */
  transition: opacity 1s ease-in;
}

.image.fade-in {
  opacity: 1; /* フェードイン時に不透明にする */
}

.image.fixed {
  position: fixed;
  top: 55px;
}
</style>
