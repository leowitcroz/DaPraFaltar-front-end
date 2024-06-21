import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import MateriasView from '../views/MateriasView.vue';

// Definindo as rotas da aplicação
const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView,
  },
  {
    path: '/materias',
    name: 'materia',
    component: MateriasView,
    meta: { requiresAuth: true } // Define que essa rota requer autenticação
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Adicionando uma guarda global para proteger as rotas
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken'); // Obtém o token do localStorage

  if (to.meta.requiresAuth && !authToken) {
    // Se a rota requer autenticação e não há token, redireciona para a página de login
    next({ name: 'home' });
  } else {
    // Caso contrário, permite a navegação
    next();
  }
});

export default router;
