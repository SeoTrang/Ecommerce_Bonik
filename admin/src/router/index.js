import { createRouter, createWebHistory } from 'vue-router'



import appRoutes from './appRoutes'
import { isLogined } from '../guard/auth';


const routes = [
    ...appRoutes
  ]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogined()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // Nếu route không yêu cầu xác thực, cho phép truy cập
  }
});


export default router;






