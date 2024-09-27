<template>
  <div>
    <AppHeader />
    <div class="gallery">
      <div
        v-for="(image, index) in representativeImages"
        :key="index"
        class="gallery-item"
        :class="{ 'fade-in': image.visible }"
        @click="goToPhotoSection(image.name)"
        :ref="(el) => (image.elementRef = el)"
      >
        <div class="image-wrapper">
          <img
            :src="image.src"
            :alt="image.name"
          />
          <div class="overlay">
            <span class="image-name">{{ image.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script setup>
  import { reactive, onMounted } from 'vue';
  import AppHeader from './AppHeader.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const representativeImages = reactive([
  {
    name: 'photo1',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo2',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo3',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo4',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo5',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo6',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo7',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo8',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo9',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo10',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo11',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo12',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo13',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo14',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo15',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo16',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo17',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo18',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo19',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
  {
    name: 'photo20',
    src: '',
    aspectRatio: 0,
    visible: false,
    elementRef: null,
  },
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
    router.push({ name: 'PhotoGallery', params: { folderName } }); // ルート名を修正
    };
  </script>
  
  <style scoped>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 80px; /* ヘッダーの高さと余白 */
  }
  
  /* 共通のスタイル */
  .gallery-item {
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  }
  
  .gallery-item img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
  
  .gallery-item.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }
  
  .gallery-item:hover .overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .image-name {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .gallery-item:hover .image-name {
    opacity: 1;
  }
  
  /* 縦長ビューポートの場合 */
  @media (max-aspect-ratio: 16/9) {
    .gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 80px; /* ヘッダーの高さと余白 */
    align-items: center; /* 追加 */
    }
  
    .gallery-item img {
      height: calc(80vh); /* ビューポートの高さの4/5 */
    }
  }
  
  /* 横長ビューポートの場合 */
  @media (min-aspect-ratio: 16/9) {
    .gallery {
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 calc(16.66%); /* 横の端をビューポートの1/6空ける */
    }
  
    .gallery-item {
      width: calc((100% - (2 * (100% / 9))) / 4); /* 4列にするための幅 */
      margin: 0 calc((100% / 9) / 2); /* 各アイテムの左右にビューポート幅の1/9の合計を持たせる */
      margin-bottom: 20px;
    }
  
    .gallery-item img {
      width: 100%;
      height: auto;
    }
  }
  .gallery-item {
  position: relative;
  margin: 1%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
  display: flex;
  align-items: center;
}

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.image-wrapper:hover .overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.image-name {
  opacity: 0;
  transition: opacity 0.3s;
}

.image-wrapper:hover .image-name {
  opacity: 1;
} 
  
  </style>
  