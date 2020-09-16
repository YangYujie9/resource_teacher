import $http from '@/common/axios'
import store from '@/store'
/**
 * 根据学科获取题型
 * @param {*} subjectCode
 */


export const getquestionType = function (subjectCode) {
  return $http.get(`/api/open/common/getQuestionType/${store.getters.getuserInfo.learningSection}/${subjectCode}`)

}

export const getfileType = function () {
  
  return $http.get(`/api/open/common/fileType`)

}

// /**
//  * 根据年级获取试题蓝
//  * @param {*} gradeName
//  */
// export const getmyTestBasket = function (gradeName) {
  
//   return $http.get(`/api/open/paper/${gradeName.substr(0,gradeName.length-1)}/myTestBasket`)

// }