/**
 * obj： 对象
 * key：  __ob__
 * value： Observer的实例
 * enumerable： 是否可枚举
 * 功能：定义obj对象属性
 */
export const def = function (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,    // 值
    enumerable,   // 枚举
    writable:true,  // 可写
    configurable:true  // 可删
  })
}