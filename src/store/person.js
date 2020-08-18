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
  difficultyList: [],
  partDifficultyList: [],
  paperId:'',
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

  difficultyList: state => {

    return state.difficultyList
  },

  partDifficultyList: state => {

    return state.partDifficultyList
  },

  paperId: state => {

    return state.paperId
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

  setdifficultyList(state, data) {

    state.difficultyList = data
    
  },
  setpartDifficultyList(state, data) {

    state.partDifficultyList = data
    
  },

  setpaperId(state, data) {

    state.paperId = data
    
  },

}
function getGradeList(id,context) {


    Vue.$http.get(`/api/open/common/grades/${id}`)
      .then(data => {
        if (data.status == "200") {
          
          context.commit('setgradeList',data.data)

          
        } 
      })

}

//console.info(fStartWebsocket)
const actions = {

  getUserBaseInfo(context,router) {//注意参数的传递

      Vue.$http.get(`/api/open/teacher/info`)
      .then((data) => {
          if (data.status == "200") {

            context.commit('setUserInfo', data.data)


            context.commit('setstaffVO', {Authorization: Cookies.get('resource-teacher')})

            // context.commit('setloading',false)
            getGradeList(data.data.school.id,context)


            console.log(Cookies.get('paperId'))
            context.commit('setpaperId',Cookies.get('paperId'))

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


            
          }
      })
 

    



  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
