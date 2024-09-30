// src/data/useRepresentativePhotos.js

import { reactive } from 'vue';

// 画像のインポート
import minamibouso_todai from '../assets/minamibouso_todai.jpg';
import minamibousou_sea from '../assets/minamibousou_sea.jpg';
import minamibousou_morning from '../assets/minamibousou_morning.jpg';
import nogeyama_zoo from '../assets/nogeyama_zoo.jpg';
import shibuya1 from '../assets/shibuya1.jpg';
import yokohama1 from '../assets/yokohama1.jpg';
import umanose from '../assets/umanose.jpg';

// 名前付きエクスポートとして代表画像配列を定義
export const representativeImages = reactive([
  { name: 'minamibouso_todai', title: '野島埼灯台集', src: minamibouso_todai, visible: false, elementRef: null },
  { name: 'minamibousou_sea', title: 'フェリー旅', src: minamibousou_sea, visible: false, elementRef: null },
  { name: 'minamibousou_morning', title: '朝釣り', src: minamibousou_morning, visible: false, elementRef: null },
  { name: 'nogeyama_zoo', title: '野毛山動物園', src: nogeyama_zoo, visible: false, elementRef: null },
  { name: 'shibuya1', title: '渋谷', src: shibuya1, visible: false, elementRef: null },
  { name: 'yokohama1', title: 'みなとみらい', src: yokohama1, visible: false, elementRef: null },
  { name: 'umanose', title: '馬の背', src: umanose, visible: false, elementRef: null },
]);
