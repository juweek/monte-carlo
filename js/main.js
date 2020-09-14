var startButton = document.getElementById('start-button')
console.log('yerr')
/*
Set variables for the circle
------------------------------
*/
var circleWidth = 400
var circleHeight = 400
var circleRadius = Math.min(circleHeight, circleWidth) / 2
var canvasArea = circleWidth * circleHeight


/*
Set variables for the circle
------------------------------
*/
var margin = {
  top:10,
  left: 60,
  right: 20,
  bottom: 40
}
var lineWidth = 400 - margin.left - margin.right
var lineHeight = 250 - margin.top - margin.bottom


/*
set variables for the io
------------------------------
*/
var totalInCircle = 0
var totalPoints = 2000
var radius = 4
var drawIntervalTime = 1

var totalPointsDrawn = 0
var pointsInCircle = 0
var estimatedPi = 0
var currentError = 0

var lineData = []


/*
METHOD: create the canvas and its context
------------------------------
*/
var canvas = d3.select('#canvas-element')
.attr('width', circleWidth)
.attr('height', circleHeight)

//???????figure out what this does??????
var context = canvas.node().getContext("2d")

context.strokeStyle = 'black'
context.lineWidth = 3

context.beginPath()
context.arc(circleWidth/2, circleHeight/2, circleRadius, 0, 2 * Math.PI)
context.closePath()
context.stroke()


startButton.addEventListener('click', (o) => {
    start()
})

/*
METHOD: calculate the total count, then draw the circles and repeat
------------------------------
*/
var start = () => {
  //first, reset the varibles
  var count = 0

  //iterate over every dot. call the update method to draw it
  var drawInterval = setInterval(function() {

    if(count > totalPoints) {
      clearInterval(drawInterval)
    }
    update(count)
    count++
  }, 10)

  startButton.addEventListener('click', null)
}


/*
METHOD: draw a dot an determine if it is in the circle
------------------------------
*/
var update = (count) => {
  //first, generate a random x and y number to figure out the next dot's coordinates
  var x = randomFloat(0, circleWidth)
  var y = randomFloat(0, circleHeight)

  //check if the point is in the circle
  if (euclideanDistance(x, circleWidth / 2, y, circleHeight / 2) < circleRadius) {
    context.fillStyle = '#73d2de'
    totalInCircle++
  }
  else {
    context.fillStyle = '#c70000'
  }

  //draw the point
  drawPoint(x, y, radius)
  totalPointsDrawn++

  estimatedPi = (totalInCircle/totalPointsDrawn) * 4
  currentError = Math.PI - estimatedPi

  //update the text
  updateText()
}


/*
METHOD: change the text everytime a new point is drawn
------------------------------
*/
var updateText = () => {
  document.getElementById('total-iteration').innerHTML = totalPointsDrawn.toString()
  document.getElementById('in-circle').innerHTML = totalInCircle.toString()
  document.getElementById('pi-estimate').innerHTML = estimatedPi
}

/*
METHOD: draw the actual dot
------------------------------
*/
var drawPoint = (x, y, r) => {
  context.beginPath()
  context.arc(x, y, r, 0, 2 * Math.Pi)
  context.closePath()
  context.fill()
}

/*
METHOD: translate string as needed
------------------------------
*/
var translateString = (x, y) => {
  var out = []
  out.push("translate(")
  out.push(x)
  out.push(" ")
  out.push(y)
  out.push(")")
  return out.join("")
}

/*
METHOD: rotate string as needed
------------------------------
*/
var rotateString = (r) => {
  var out = []
  out.push("rotate(")
  out.push(r)
  out.push(")")
  return out.join("")
}

/*
METHOD: calculate the euclidean distance so you can tell if a dot was in the circle
------------------------------
*/
var euclideanDistance = (x1, x2, y1, y2) => {
  console.log('x1: ' + x1)
  console.log('x2: ' + x2)
  console.log('y1: ' + y1)
  console.log('y2: ' + y2)
  return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
}

/*
METHOD: calculate the euclidean distance so you can tell if a dot was in the circle
------------------------------
*/
var randomFloat = (min, max) => {
  return (max - min) * Math.random() + min
}
