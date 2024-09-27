import { createRouter, createWebHistory } from 'vue-router';
import Gallery from './components/Gallery.vue';
import PhotoGallery from './components/PhotoGallery.vue';

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
