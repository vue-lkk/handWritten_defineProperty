import { def } from "./utils"

// 得到Array.prototype
const arrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype)

// 要被改写的7个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

// 遍历
methodsNeedChange.forEach(methodName => {
  // 备份原来的方法，因为push,pop等7个函数的功能不能被剥夺
  const original = arrayPrototype[methodName]

  // 定义新的方法
  def(arrayMethods, methodName, function(){
    // 把这个数组身上的__ob__取出来,__ob__已经被添加了，为什么已经被添加了？
    // 因为数组肯定不是最高层，比如obj.g属性是数组，obj不可能是数组，第一次遍历obj
    // 这个对象的第一层的时候，已经给g属性（就是这个数组）添加了__ob__属性
    const ob = this.__ob__
    // 有三种方法 push/unshift/splice 能够插入新项，现在要把插入的新项也要变为observe
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = arguments
        break;
      case 'splice':
        // splice(下标，数量，插入的新项)
        inserted = Array.from(arguments).slice(2)
        break
      default:
        break;
    }
    // 判断有没有要插入的新项,让新项也变为响应式的
    if(inserted) {
      ob.observeArray(inserted)
    }
    console.log('巅峰大赛')
    // 注意：this指向就是调用push,pop等方法...的数组
    // 恢复原来的功能
    const result = original.apply(this,arguments)
    // 为什么需要返回，因为splice等方法需要返回值
    return result
  }, false)
})