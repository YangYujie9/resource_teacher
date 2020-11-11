// 防抖
export function debounce(fn, delay) {

    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}
// 节流
export function _throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}


  // function debounce(fn, time) {
  //     let _arguments = arguments
  //     let timeout = null
  //     return function () {
  //         if (timeout) {
  //             clearTimeout(timeout)
  //         }
  //         timeout = setTimeout(() => {
  //             fn.call(this, _arguments)
  //         }, time);
  //     }
  // }



export function VueDebounce(fnName, time) {
  let timeout = null;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      this[fnName]();
    }, time);
  };
}




//统一处理小题 
export function handleQuestion(item,item0,index,index0) {
      //选项
  item.selectoption = []
  if(item.options && item.options.length) {
    item.options.forEach(item1=>{
      item.selectoption.push({key:item1.key,id:item1.value.id,value:item1.value.name})
      // for(let key in item1) {
      //   item.selectoption.push({word:key,value:item1[key]})
      // }
    })
  }


  //答案
  //item.answers = []
  if(item.fillAnswers && item.fillAnswers.length) {
    // console.log(item0)
    item0.answers.push({index:index+1,name:''})
    item.fillAnswers.forEach(item1=>{
      
      item0.answers[item0.answers.length-1].name += item1.value.name + ' '
      // for(let key in item1) {
      //   item0.answers.push(item1[key])
      // }
    })
  }



  //章节
  item.chapterPoint = []

  if(item.chapters && item.chapters.length) {
    item.chapters.forEach(item1=>{
      item.chapterPoint.push(item1.name)
    })
  } 
  //知识点
  item.knowledgesPoint = []

  if(item.knowledges && item.knowledges.length) {
    item.knowledges.forEach(item1=>{
      item.knowledgesPoint.push(item1.name)
    })
  }     

  

  if(item.smallQuestions && item.smallQuestions.length) {
    item.smallQuestions.forEach((item1,index1)=>{
      index0 += 1
      item1.index = index0
      // item.children.push(item1)
      // item1.index = "("+ Number(index1 + 1) + ")"
      handleQuestion(item1,item,index1)
    })
    
  }
}
