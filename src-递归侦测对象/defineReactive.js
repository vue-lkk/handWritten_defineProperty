import { observe } from "./observe"

/**
 * 数据劫持
 */
export default function defineReactive(data,key,val) {
  // 如果用户传递2个参数
  if(arguments.length === 2) {
    val = data[key]
  }
  
  // 1核心：妙处
  // 子元素要进行observe,形成了递归，这个递归，不是自己调用自己，而是多个函数，类循环调用
  let childOb = observe(val)

  Object.defineProperty(data,key,{
    // 可枚举
    enumerable:true,
    // 可以被配置，比如可以被delete
    configurable:true,
    // getter
    get() {
      console.log('你试图访问obj的' + key + '属性')
      return val
    },
    // setter
    set(newVal) {
      console.log('你试图改变obj的' + key + '属性',newVal)
      if(val === newVal) return
      val = newVal
      // 当设置了新值，这个新值也要被observe
      childOb = observe(newVal)
    }
  })
}