// src/data/useRepresentativePhotos.js

import { reactive } from 'vue';

// 画像のインポート
import minamibouso_todai from '../assets/minamibouso_todai.jpg';
import minamibousou_sea from '../assets/minamibousou_sea.jpg';
import minamibousou_morning from '../assets/minamibousou_morning.jpg';

// 名前付きエクスポートとして代表画像配列を定義
export const representativeImages = reactive([
  { name: 'minamibouso_todai', title: '野島埼灯台集', src: minamibouso_todai, visible: false, elementRef: null },
  { name: 'minamibousou_sea', title: '海空', src: minamibousou_sea, visible: false, elementRef: null },
  { name: 'minamibousou_morning', title: '朝釣りへ', src: minamibousou_morning, visible: false, elementRef: null },
]);
