import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegistroView from '../views/RegistroView.vue';
import PanelProductos from '../views/PanelProductos.vue';
import ClientePanel from '../views/ClientePanel.vue';
import ProductListView from '../views/ProductListView.vue';


const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/registro', name: 'registro', component: RegistroView },
  {
    path: '/panel',
    name: 'panel',
    component: PanelProductos,
    meta: { roles: [1, 2] }
  },
  {
    path: '/productos',
    name: 'productos',
    component: ProductListView,
    meta: { roles: [1, 2] }
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClientePanel,
    meta: { roles: [3] }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard de navegación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  let userRole = null;

  if (token && userData) {
    try {
      const parsedUserData = JSON.parse(userData);
      userRole = parsedUserData.rol_id;

      // si la ruta tiene restricciones de roles
      if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        console.warn(`Acceso denegado: el rol ${userRole} no tiene permiso para acceder a ${to.path}`);
        return next('/');
      }

      if (to.path === '/' || to.path === '/registro') {
        if (userRole === 1 || userRole === 2) return next('/panel');  
        if (userRole === 3) return next('/cliente');  
      }
    } catch (error) {
      console.error('Error al procesar los datos de usuario:', error);
      localStorage.clear();
      return next('/');  
    }
  }

  //proteger rutas especificas para usuarios no autenticados
  const protectedRoutes = ['/panel', '/cliente', '/productos'];
  if (protectedRoutes.includes(to.path) && !token) {
    return next('/');
  }

  next(); 
});
export default router;
