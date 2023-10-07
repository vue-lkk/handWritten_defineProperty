// 数据劫持
import defineReactive from "./defineReactive"
// value对象添加__ob__属性，值为Observer实例
import {def} from "./utils"
import {arrayMethods} from './array'
import { observe } from "./observe"

/**
 *此类功能：将一个正常的object转换为每一个层级的属性都是响应式（可以被侦听的）object
 */
export default class Observer {
  constructor(value) {
    // 给实例（this,一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性
    // def()的功能是：给value对象添加__ob__属性，值为Observer实例
    def(value, '__ob__', this, false)
    // 不要忘记初心，Observer类的目的是：将每一个正常的object转换为每一层级的属性都是响应式（可以被侦听的）的object

    // 检查它是数组还是对象
    if(Array.isArray(value)) {
      // 如果是数组，要非常强行的蛮干：将这个数组的原型，指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
      // 让这个数组变成observe
      this.observeArray(value)
    }else{
      this.walk(value)
    }
  }

  // 先遍历低一层对象
  walk(value) {
    for (let key in value) {
      defineReactive(value,key)
    }
  }

  // 数组的特殊遍历
  observeArray(arr) {
    for(let i = 0, l = arr.length; i < l; i++) {
      // 逐项进行observe
      observe(arr[i])
    }
  }
}