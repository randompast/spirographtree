require("es6-shim")
var Node = function(up, name) {
  this.children = []
  this.up = up
  this.name = name
}

Node.prototype.move = function(x, y, r, i) {
  return [
    x+Math.cos(performance.now()/(50*r)+(i+1)/(this.children.length)*2*Math.PI)*r*2
    ,y+Math.sin(performance.now()/(50*r)+(i+1)/(this.children.length)*2*Math.PI)*r*2
  ]
}

Node.prototype.draw = function(canvas, ctx, x, y, r) {
  this.circle(canvas, ctx, x, y, r, "green")
  for(var i = 0; i < this.children.length; i++){
    p = this.move(x, y, r, i)
    this.children[i].draw(canvas, ctx, p[0], p[1], r/3)
  }
}

Node.prototype.trace = function(canvas, ctx, x, y, r, arr){
  var i = arr.shift()[1]
  p = this.move(x, y, r, i)
  arr.length > 1 ?
    this.children[i].trace(canvas, ctx, p[0], p[1], r/3, arr)
    : this.selected(canvas, ctx, x, y, r, arr[0][1])
}

Node.prototype.selected = function(canvas, ctx, x, y, r, i) {
  p = this.move(x, y, r, i)
  this.circle(canvas, ctx, p[0], p[1], r/3, "blue")
}

Node.prototype.circle = function(canvas, ctx, x, y, r, color) {
  ctx.beginPath()
  ctx.arc(x,y,r,0,2*Math.PI)
  ctx.fillStyle = color
  ctx.lineWidth = r/10
  ctx.fill()
  ctx.stroke()
}

Node.prototype.populate = function(children, layers){
  if (layers > 0){
    for(var i = 0; i < children; i++){
      this.children[i] = new Node(this, "dummy")
      this.children[i].populate(children, layers-1)
    }
  }
}

Node.prototype.sum = function(){
  return this.children.reduce(
    (sum, node) => { return sum + node.sum() }
    , 1)
}

module.exports = Node
