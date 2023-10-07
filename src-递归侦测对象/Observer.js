// 数据劫持
import defineReactive from "./defineReactive"
// value对象添加__ob__属性，值为Observer实例
import {def} from "./utils"

/**
 *此类功能：将一个正常的object转换为每一个层级的属性都是响应式（可以被侦听的）object
 */
export default class Observer {
  constructor(value) {
    // 给实例（this,一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性
    // def()的功能是：给value对象添加__ob__属性，值为Observer实例
    def(value, '__ob__', this, false)
    // 不要忘记初心，Observer类的目的是：将每一个正常的object转换为每一层级的属性都是响应式（可以被侦听的）的object
    this.walk(value)
    console.log(value)
  }
  // 先遍历一层
  walk(value) {
    for (let key in value) {
      defineReactive(value,key)
    }
  }
}