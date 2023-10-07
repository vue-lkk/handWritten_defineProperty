import Dep from "./Dep"

let uid = 0
export default class Watcher {
  /**
   * 
   * @param {监听哪个对象} target 
   * @param {什么样的表达式比如a.b.c} expression 
   * @param {回调函数} callback 
   */
  constructor(target, expression, callback) {
    console.log('我是Watcher类的构造器')
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()  // 创建实例时调用一次
  }
  // 更新
  update() {
    this.run()
  }
  get() {
    //进入依赖收集阶段,让全局的Dep.target设置为Watcher本身,那么就是进入依赖收集阶段
    Dep.target = this  // 存储Watcher实例对象
    const obj = this.target  // 处理的对象
    
    let value
    // 只要能找，就一直找
    try {
      value = this.getter(obj) 
    } finally {
      // 最后一定要设置为null
      Dep.target = null 
    }

    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  // 再次唤起get()
  getAndInvoke(cb) {
    const newValue = this.get()

    if(newValue !== this.value || typeof newValue === 'object') {
      // 利用oldValue存储之前的this.value
      const oldValue = this.value
      // 更新this.value
      this.value = newValue
      // (改变this指向，参数1，参数2)
      cb.call(this.target, newValue, oldValue)  
    }
  }
}

// 解决a.b.c，点符号
function parsePath(str) {
  let segments = str.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}