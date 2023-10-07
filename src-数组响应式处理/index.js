import { observe } from "./observe";

var obj = {
  a:{
    m:{
      n:100
    }
  },
  b:10,
  c:['666','888']
}

observe(obj)
obj.c.splice(1,1,'8080')
console.log(obj.c)