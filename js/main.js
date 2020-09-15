var startButton = document.getElementById('br-body__start-button')
var restartButton = document.getElementById('br-body__restart-button')
var inputField = document.getElementById('br-body__input-field')
var inputLines = document.getElementById('br-body__info-lines')

/*
------------------------------
Set variables for the circle
------------------------------
*/
var greenColor = '#3db540'
var redColor = '#c70000'

var circleWidth = 300
var circleHeight = 300
var circleRadius = Math.min(circleHeight, circleWidth) / 2
var canvasArea = circleWidth * circleHeight

var margin = {
  top:10,
  left: 60,
  right: 20,
  bottom: 40
}
var lineWidth = 300 - margin.left - margin.right
var lineHeight = 250 - margin.top - margin.bottom


/*
------------------------------
set global variables for the methods
------------------------------
*/
var totalInCircle = 0
var totalPoints = 0
var radius = 4

var totalPointsDrawn = 0
var pointsInCircle = 0
var estimatedPi = 0
var currentError = 0

/*
------------------------------
METHOD: calculate the euclidean distance so you can tell if a dot was in the circle
------------------------------
*/
var euclideanDistance = (x1, x2, y1, y2) => {
  return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
}

/*
------------------------------
METHOD: come up with a random integer
------------------------------
*/
var randomInt = (min, max) => {
  return parseInt((max - min) * Math.random() + min)
}



/*
------------------------------
METHOD: create the canvas and its context. use the Canvas Context Rendering 2D API
------------------------------
*/
var canvas = d3.select('#canvas-element')
.attr('width', circleWidth)
.attr('height', circleHeight)

var context = canvas.node().getContext("2d")
context.strokeStyle = 'black'
context.lineWidth = 3


/*
------------------------------
METHOD: clear the rectangle and redraw the shape
------------------------------
*/
var drawCircle = () => {
  context.clearRect(0, 0, 300, 300)
  context.beginPath()
  context.arc(circleWidth/2, circleHeight/2, circleRadius, 0, 2 * Math.PI)
  context.closePath()
  context.stroke()
}

/*
------------------------------
METHOD: draw the actual dot
------------------------------
*/
var drawPoint = (x, y, r) => {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.closePath()
  context.fill()
}


/*
------------------------------
METHOD: change the text everytime a new point is drawn
------------------------------
*/
var updateText = () => {
  document.getElementById('total-iteration').innerHTML = totalPointsDrawn.toString()
  document.getElementById('in-circle').innerHTML = totalInCircle.toString()
  document.getElementById('pi-estimate').innerHTML = estimatedPi.toFixed(5)
}


/*
------------------------------
METHOD: check if the text field is empty or a number
------------------------------
*/
var validateText = () => {
  if(inputField.value == "" || isNaN(inputField.value) || parseInt(inputField.value) <= 0) {
    alert('Please type in a number greater than 0')
    return false
  } else {
    totalPoints = parseInt(inputField.value)
    return true
  }
}


/*
------------------------------
METHOD: event listener for the start and restart button. depending on which, restart variables or change text
------------------------------
*/
restartButton.addEventListener('click', (o) => {
  if(validateText()) {
    totalPointsDrawn = 0
    totalInCircle = 0
    drawCircle()
    start()
  }
})

startButton.addEventListener('click', (o) => {
  if(validateText()) {
    startButton.innerHTML = 'Add more'
    inputLines.style.opacity = 1
    restartButton.style.opacity = 1
    start()
  }
})


/*
------------------------------
METHOD: iterate over every dot. call the update method to draw it
------------------------------
*/
var start = () => {
  var count = 1
  var drawInterval = setInterval(function() {
    if(count >= totalPoints) {
      clearInterval(drawInterval)
    }
    update(count)
    count++
  }, 5)

  startButton.addEventListener('click', null)
  restartButton.addEventListener('click', null)
}


/*
------------------------------
METHOD: draw a dot and determine if it is in the circle
------------------------------
*/
var update = (count) => {
  //first, generate a random x and y number to figure out the next dot's coordinates
  var x = randomInt(0, circleWidth)
  var y = randomInt(0, circleHeight)

  //check if the point is in the circle using euclideanDistance
  if (euclideanDistance(x, circleWidth / 2, y, circleHeight / 2) < circleRadius) {
    context.fillStyle = greenColor
    totalInCircle++
  }
  else {
    context.fillStyle = redColor
  }

  totalPointsDrawn++
  estimatedPi = (totalInCircle/totalPointsDrawn) * 4
  currentError = Math.PI - estimatedPi

  //draw a point and update the text
  drawPoint(x, y, radius)
  updateText()
}


drawCircle()
