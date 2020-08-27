import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component:  ()=>import('@/views/login'),

  },
    {
      path: '/addquestion',
      name: '/addquestion',
      component: ()=>import('@/views/teacher/index'),
      children: [    
      {
        path: 'submitQuestions',
        name: 'submitQuestions',
        component: ()=>import('@/views/teacher/submit_question/addquestion'),
      },]
    },
    {
      path: '/questions',
      name: 'questions',
      component: ()=>import('@/views/questions/index'),
      children:[
      {
        path: 'chooseBychapter',
        name: 'chooseBychapter',
        component: ()=>import('@/views/questions/chapter/choose_bychapter'),
      },{
        path: 'chooseByknowledge',
        name: 'chooseByknowledge',
        component: ()=>import('@/views/questions/knowledge/choose_byknowledge'),
      },{
        path: 'chooseByIntelligent',
        name: 'chooseByIntelligent',
        component: ()=>import('@/views/questions/intelligent/choose_byIntelligent'),
      },{
        path: 'examinationPaper',
        name: 'examinationPaper',
        component: ()=>import('@/views/questions/examination/examination_paper'),
      },{
        path: 'actualPreview',
        name: 'actualPreview',
        component: ()=>import('@/views/questions/actual/actual_preview'),
      },{
        path: 'actualPaper',
        name: 'actualPaper',
        component: ()=>import('@/views/questions/actual/index'),
        children: [{
          path: 'search/:isComplete',
          name: 'actualSearch',
          component: ()=>import('@/views/questions/actual/actual_search'),
        },{
          path: 'maintain/:paperId?',
          name: 'actualMaintain',
          component: ()=>import('@/views/questions/actual/actual_maintain'),
        }]
      }]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: ()=>import('@/views/teacher/index'),
      children:[{
        path: 'home',
        name: 'home',
        component: ()=>import('@/views/teacher/home/home'),
      },{
        path: 'uploadResource',
        name: 'uploadResource',
        component: ()=>import('@/views/teacher/home/upload_resource'),
      },
      {
        path: 'resource/:resourceType',
        name: 'resource',
        component: ()=>import('@/views/teacher/resource/resourceList'),
      },
      // {
      //   path: 'courseware',
      //   name: 'courseware',
      //   component: ()=>import('@/views/teacher/resource/courseware'),
      // },
      {
        path: 'resourceRreview',
        name: 'resourceRreview',
        component: ()=>import('@/views/teacher/resource/resource_preview'),
      },{
        path: 'personal',
        name: 'personal',
        component: ()=>import('@/views/teacher/personal_center/index'),
        children: [{
          path: 'myWarehouse',
          name: 'myWarehouse',
          component: ()=>import('@/views/teacher/personal_center/collections'),
        },{
          path: 'myExampaper',
          name: 'myExampaper',
          component: ()=>import('@/views/teacher/personal_center/exampaper'),
        }]
      },
      // {
      //   path: 'myWarehouse',
      //   name: 'myWarehouse',
      //   component: ()=>import('@/views/teacher/warehouse'),
      // },
      
      // ,{
      //   path: 'myCollections',
      //   name: 'myCollections',
      //   component: ()=>import('@/views/teacher/collections'),
      // },
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => { 

    NProgress.start()

    if( Cookies.get('resource-teacher')) {

      if (store.state.person.userInfo.person && store.state.person.userInfo.person.fullName) {
      } else {

        store.dispatch('getUserBaseInfo',router)
      }

      if (to.path =='/login') {


        next({
          path: '/addquestion/submitQuestions',
        })
      } else {

        next()
      }


    } else {

      if (to.path !='/login') {
        next({
          path: '/login',
        })
      } else {
        next()
      }

    }


    next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
