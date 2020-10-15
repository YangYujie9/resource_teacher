/*用户信息 企业信息*/
import Vue from 'vue'
import Cookies from 'js-cookie'

const state = {
  //用户信息
  userInfo: {
  },

  pageDict: [],
  staffVO: {
    Authorization: ''
  },
  gradeList: [],
  subjectList:[],
  difficultyList: [],
  partDifficultyList: [],
  paperId:'',
  isReady: false,
  siteInfo: {
    picture:'',
    copyright:''
  },
}

const getters = {

  getuserInfo: state => {
    return state.userInfo
  },
  getstaffVO: state => {
    
    return state.staffVO
  },
  getpageDict: state => {
    
    return state.pageDict
  },
  gradeList: state => {

    return state.gradeList
  },
  subjectList: state => {

    return state.subjectList
  },
  difficultyList: state => {

    return state.difficultyList
  },

  partDifficultyList: state => {

    return state.partDifficultyList
  },

  paperId: state => {

    return state.paperId
  },
  isReady: state => {

    return state.isReady
  },

  getsiteInfo: state => {

    return state.siteInfo
  },

}

const mutations = {
  setUserInfo(state, data) {

    state.userInfo = data
  },
  setstaffVO(state, data) {

    state.staffVO = data
    
  },

  setpageDict(state, data) {

    state.pageDict = data
    
  },

  setgradeList(state, data) {

    state.gradeList = data
    
  },
  setsubjectList(state, data) {

    state.subjectList = data
    
  },
  setdifficultyList(state, data) {

    state.difficultyList = data
    
  },
  setpartDifficultyList(state, data) {

    state.partDifficultyList = data
    
  },

  setpaperId(state, data) {

    state.paperId = data
    
  },
  setisReady(state, data) {

    state.isReady = data
    
  },

  setsiteInfo(state, data) {

    state.siteInfo.picture = data.picture
    state.siteInfo.copyright = data.copyright
    
  },
}
function getBasicList(id,context) {


    Vue.$http.get(`/api/internal/configuration/logo`) 
    .then(data=>{
      if(data.status == '200') {
        context.commit('setsiteInfo',data.data)
      }
    })
    


    Vue.$http.get(`/api/open/common/grades/${id}`)
      .then(data => {
        if (data.status == "200") {
          
          context.commit('setgradeList',data.data)

          localStorage.setItem('gradeList',JSON.stringify(data.data))
        } 
      })

    Vue.$http.get(`/api/open/common/${id}/subjects`)
    .then(data => {
      if (data.status == "200") {
        
        context.commit('setsubjectList',data.data)

        localStorage.setItem('subjectList',JSON.stringify(data.data))
        context.commit('setisReady', true)
      } 
    })
      

}

//console.info(fStartWebsocket)
const actions = {

  getUserBaseInfo(context,router) {//注意参数的传递


      // let user = JSON.parse(localStorage.getItem("userInfo"))
      // let subjectList = JSON.parse(localStorage.getItem("subjectList"))
      // let gradeList = JSON.parse(localStorage.getItem("subjectList"))
      
      // if(user) {
      //   context.commit('setUserInfo', user)
      //   context.commit('setgradeList',gradeList)
      //   context.commit('setsubjectList',subjectList)
      //   context.commit('setpaperId',Cookies.get('paperId'))

      //   context.commit('setdifficultyList', JSON.parse(localStorage.getItem("difficultyList")))
      //   context.commit('setpartDifficultyList',JSON.parse(localStorage.getItem("partDifficultyList")))

      // }else {
          
        
        Vue.$http.get(`/api/open/teacher/info`)
        .then((data) => {
            if (data.status == "200") {

              context.commit('setUserInfo', data.data)

              localStorage.setItem('userInfo',JSON.stringify(data.data))


              context.commit('setstaffVO', {Authorization: Cookies.get('resource-teacher')})

              // context.commit('setloading',false)
              getBasicList(data.data.school.id,context)

              context.commit('setpaperId',Cookies.get('paperId'))

            }
          
        })
        .catch((err)=>{
          if(err.status == '404') {
            
            Cookies.remove("resource-teacher")
            localStorage.clear()
            this.$router.replace("/login")        
          }

        })





        Vue.$http.get(`/api/open/common/difficultyType`)
          .then(data => {
            if (data.status == "200") {
              let arr = []
              arr.push({key:'',value:"全部"}) 
              data.data.forEach(item=>{
                arr.push(item) 
              })
              context.commit('setdifficultyList', arr)
              context.commit('setpartDifficultyList',data.data)

              localStorage.setItem('difficultyList',JSON.stringify(arr))

              localStorage.setItem('partDifficultyList',JSON.stringify(data.data))


            }
        })
      // }
 

    



  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
