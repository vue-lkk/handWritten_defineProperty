import Watcher from "./Watcher";
import { observe } from "./observe";

var obj = {
  a:{
    m:{
      n:5
    }
  },
  b:10,
  c:{
    d:{
      e:{
        f:666
      }
    }
  },
  g:[666,888,333,999]
}

observe(obj)
// 测试对象中的dep
// obj.a.m.n = 666
// 测试数组中的dep
// obj.g.push('123')

// 测试Watcher实例是否可以监控到数据更新, wtach的handler()函数就是这样
const watcher = new Watcher(obj, 'a.m.n', (newValue,oldValue) => {
  console.log('★★★★★',newValue,oldValue)
})
console.log(watcher)
obj.a.m.n = 666

console.log(obj)