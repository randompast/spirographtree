//Run with:
//nvm use stable
//npm install canvas-fit
//bude --live --open gebra.js
require("es6-shim")

document.title = "MathGame"
var fit = require('canvas-fit')
  var canvas = document.body.appendChild(document.createElement('canvas'))
    window.addEventListener('resize', fit(canvas), false)
  var ctx = canvas.getContext('2d')
  var h = canvas.height/2



var mn = require("./mathnode.js")
a = new mn(null, "=")
a.populate(6,3)
//(6,3) -> 1 + 6 + 6*6 + 6*6*6, 259
          // a.children = [new mn(a, "x"), new mn(a, "x"), new mn(a, "x"), new mn(a, "x"), new mn(a, "x"), new mn(a, "x"), new mn(a, "x"), new mn(a, "x")]
          // b = new mn(null, "b")
          // a.children[0] = b

select = [[null, 0], [a,0], [a.children[0], 2], [a.children[0].children[0], 2], [a.children[0].children[0].children[0], 2]]

document.addEventListener("keydown", function(e){
  var s = select[select.length-1]
  switch(e.keyCode){
    case 37: s[1] = s[1] > 0 ? s[1] - 1 : s[0] ? s[0].children.length - 1 : 0
      select[select.length-1] = s
      break
    case 39: s[1] = s[1] < s[0].children.length - 2 ? s[1] + 1 : 0
      select[select.length-1] = s
      break
    case 38:
      console.log(select)
      if (select.length > 1) {
        select.pop()
      }
      break
    case 40:
      console.log(s[0].children)
      if (true) {
//        select.push([ s[0], 0 ])
      }
      break
    default: true
  }
})
a.draw(canvas, ctx, canvas.width/2, canvas.height/2, 100)

function render(){
  // console.log("gamepads : " + gamepad.count())
  ctx.clearRect(0,0, canvas.width, canvas.height)
  window.requestAnimationFrame(render)
  a.draw(canvas, ctx, canvas.width/2, canvas.height/2, 150)
  a.trace(canvas, ctx, canvas.width/2, canvas.height/2, 150, select.slice())

// console.log(gamepad.update())
  // if (gamepad.button(0, "a")){
  //   console.log("AHHHH")
  // }
} render()
