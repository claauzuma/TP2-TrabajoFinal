import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeAdmin from '../views/InicioAdminView.vue'
import Alumnos from '../views/AlumnosView.vue'
import HomeAlumno from '../views/HomeAlumnoView.vue'
import HomeProfe from '../views/HomeProfeView.vue'
import AdminProfe from '../views/AdminProfesoresView.vue'
import AdminClases from '../views/AdminClasesView.vue'
import VistaRutinas from '../views/RutinasView.vue'
import VistaPerfil from '../views/PerfilView.vue'
import VistaAlumnoClases from '../views/AlumnoClasesView.vue'
import ClaseInscriptos from '../views/ClaseInscriptosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'loginview',
      component: LoginView
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    }
    ,
    {
      path: '/homeAdmin',
      name: 'homeadmin',
      component: HomeAdmin,
    }
    ,
    {
      path: '/alumnos',
      name: 'alumnos',
      component: Alumnos,
    }
    ,
    {
      path: '/alumno/inicio',
      name: 'inicio alumno',
      component: HomeAlumno,
    }
    ,
    {
      path: '/profe/inicio',
      name: 'inicio profe',
      component: HomeProfe,
    }
    ,
    {
      path: '/admin/profesores',
      name: 'admin profe',
      component: AdminProfe,
    }
    ,
    {
      path: '/admin/clases',
      name: 'admin clases',
      component: AdminClases,
    }
    ,
    {
      path: '/rutinas',
      name: 'vista rutinas',
      component: VistaRutinas,
    }
    ,
    {
      path: '/perfil',
      name: 'vista perfil',
      component: VistaPerfil,
    }
    ,
    {
      path: '/alumno/clases',
      name: 'vista alumno clases',
      component: VistaAlumnoClases,
    },
    { 
      path: '/admin/clases/:id',
      name: 'vista inscriptos clases',
      component: ClaseInscriptos, 
    }
    
    
   
  ]
})

router.beforeEach( (to,from,next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if( to.matched.some(r => r.meta.RequireAuth) && !usuarioLog ) {
    next('/')
  }
  next()
})
  
export default router
