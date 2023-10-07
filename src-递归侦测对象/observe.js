import Observer from "./Observer";

// 创建observe函数，注意函数的名字是没有r的
export const observe = function (value) {
  // 如果不是对象
  if(typeof value != 'object') return;
  // 定义ob
  var ob
  if(typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  }else{
    ob = new Observer(value)
  }
  return ob
}