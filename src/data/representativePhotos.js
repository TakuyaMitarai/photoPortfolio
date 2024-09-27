// src/data/useRepresentativePhotos.js

import { reactive } from 'vue';

// 画像のインポート
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

// 名前付きエクスポートとして代表画像配列を定義
export const representativeImages = reactive([
  { name: 'photo1', title: 'Photo 1', src: photo1, visible: false, elementRef: null },
  { name: 'photo2', title: 'Photo 2', src: photo2, visible: false, elementRef: null },
  { name: 'photo3', title: 'Photo 3', src: photo3, visible: false, elementRef: null },
  { name: 'photo4', title: 'Photo 4', src: photo4, visible: false, elementRef: null },
  { name: 'photo5', title: 'Photo 5', src: photo5, visible: false, elementRef: null },
  { name: 'photo6', title: 'Photo 6', src: photo6, visible: false, elementRef: null },
  { name: 'photo7', title: 'Photo 7', src: photo7, visible: false, elementRef: null },
  { name: 'photo8', title: 'Photo 8', src: photo8, visible: false, elementRef: null },
  { name: 'photo9', title: 'Photo 9', src: photo9, visible: false, elementRef: null },
  { name: 'photo10', title: 'Photo 10', src: photo10, visible: false, elementRef: null },
  { name: 'photo11', title: 'Photo 11', src: photo11, visible: false, elementRef: null },
  { name: 'photo12', title: 'Photo 12', src: photo12, visible: false, elementRef: null },
  { name: 'photo13', title: 'Photo 13', src: photo13, visible: false, elementRef: null },
  { name: 'photo14', title: 'Photo 14', src: photo14, visible: false, elementRef: null },
  { name: 'photo15', title: 'Photo 15', src: photo15, visible: false, elementRef: null },
  { name: 'photo16', title: 'Photo 16', src: photo16, visible: false, elementRef: null },
  { name: 'photo17', title: 'Photo 17', src: photo17, visible: false, elementRef: null },
  { name: 'photo18', title: 'Photo 18', src: photo18, visible: false, elementRef: null },
  { name: 'photo19', title: 'Photo 19', src: photo19, visible: false, elementRef: null },
  { name: 'photo20', title: 'Photo 20', src: photo20, visible: false, elementRef: null },
]);
