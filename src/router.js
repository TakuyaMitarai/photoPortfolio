// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Gallery from './components/Gallery.vue';
import PhotoGallery from './components/PhotoGallery.vue';
import Achievement from './components/Achievement.vue'; // 追加
import Information from './components/Information.vue'; // 追加
import Article from './components/Article.vue';

const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/gallery/:folderName',
    name: 'PhotoGallery',
    component: PhotoGallery,
    props: true,
  },
  {
    path: '/achievement',
    name: 'Achievement',
    component: Achievement,
  },
  {
    path: '/achievement/:id',
    name: 'Article',
    component: Article,
    props: true,
  },
  {
    path: '/information',
    name: 'Information',
    component: Information,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
