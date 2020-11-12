import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  {
    path: '/library',
    component: Layout,
    name: 'Question & Answer',
    redirect: '/library/question',
    alwaysShow: true,
    meta: {
      title: 'Question & Answer',
      icon: 'el-icon-question',
    },
    children: [
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/question/index'),
        meta: {title: 'Question'}
      },
      {
        path: 'answer',
        name: 'Answer',
        component: () => import('@/views/answer/index'),
        meta: {title: 'Answer'}
      },
      {
        path: 'topic',
        name: 'Topic',
        component: () => import('@/views/topic/index'),
        meta: {title: 'Topic'}
      },

    ]
  },
  {
    path: '/quizconfig',
    component: Layout,
    redirect: '/quizconfig/config',
    alwaysShow: true,
    name: 'Quiz Config',
    meta: {
      title: 'Quiz Config',
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/config/index'),
        meta: {title: 'Config'}
      },
      {
        path: 'examination',
        name: 'Exam',
        component: () => import('@/views/examination/index'),
        meta: {title: 'Examination'}
      },
      {
        path: 'template',
        component: () => import('@/views/template/index'),
        name: 'Template',
        meta: {title: 'Template'}
      }
    ]
  },
  {
    path: '/quizconfig/template/download',
    component: () => import('@/views/template/download'),
    hidden: true
  },


  {
    path: '/quiz',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Quiz',
        component: () => import('@/views/quiz/index'),
        meta: { title: 'Quiz', icon: 'el-icon-minus' }
      }
    ]
  },

  {
    path: '/quizgenerate',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Generate Quiz',
        component: () => import('@/views/quizgenerate/index'),
        meta: { title: 'Generate Quiz', icon: 'el-icon-minus' }
      }
    ]
  },

];
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: {
          title: 'User',
          icon: 'user',
          roles: ['admin', 'super admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}

];


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router
