var startButton = document.getElementById('start-button')
var restartButton = document.getElementById('restart-button')
var inputField = document.getElementById('input-field')
var inputLines = document.getElementById('info-lines')

/*
Set variables for the circle
------------------------------
*/
var circleWidth = 300
var circleHeight = 300
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
var lineWidth = 300 - margin.left - margin.right
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

context.clearRect(0, 0, 300, 300)
context.beginPath()
context.arc(circleWidth/2, circleHeight/2, circleRadius, 0, 2 * Math.PI)
context.closePath()
context.stroke()

/*
METHOD: create the canvas and its context
------------------------------
*/
restartButton.addEventListener('click', (o) => {
  if(inputField.value == "" || isNaN(inputField.value)) {
    alert('Please type in a number')
  } else {
    totalPoints = parseInt(inputField.value)

    totalPointsDrawn = 0
    totalInCircle = 0
    context.clearRect(0, 0, 300, 300)
    context.beginPath()
    context.arc(circleWidth/2, circleHeight/2, circleRadius, 0, 2 * Math.PI)
    context.closePath()
    context.stroke()

    start()
  }
})

/*
METHOD: create the canvas and its context
------------------------------
*/
startButton.addEventListener('click', (o) => {
  if(inputField.value == "" || isNaN(inputField.value)) {
    alert('Please type in a number')
  } else {
    totalPoints = parseInt(inputField.value)
    startButton.innerHTML = 'Add more'
    restartButton.style.opacity = 1
    start()
  }
})

  /*
  METHOD: calculate the total count, then draw the circles and repeat
  ------------------------------
  */
  var start = () => {
    //first, reset the varibles
    var count = 1

    //show the other lines
    inputLines.style.opacity = "1"

    //iterate over every dot. call the update method to draw it
    var drawInterval = setInterval(function() {

      if(count >= totalPoints) {
        clearInterval(drawInterval)
      }
      update(count)
      count++
    }, 5)

    startButton.addEventListener('click', null)
  }


  /*
  METHOD: draw a dot an determine if it is in the circle
  ------------------------------
  */
  var update = (count) => {
    //first, generate a random x and y number to figure out the next dot's coordinates
    var x = randomInt(0, circleWidth)
    var y = randomInt(0, circleHeight)

    //check if the point is in the circle
    if (euclideanDistance(x, circleWidth / 2, y, circleHeight / 2) < circleRadius) {
      context.fillStyle = '#3db540'
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
    document.getElementById('pi-estimate').innerHTML = estimatedPi.toFixed(5)
  }

  /*
  METHOD: draw the actual dot
  ------------------------------
  */
  var drawPoint = (x, y, r) => {
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    //context.arc(x, y, r, 0, 2 * Math.Pi)
    context.closePath()
    context.fill()
  }

  /*
  METHOD: calculate the euclidean distance so you can tell if a dot was in the circle
  ------------------------------
  */
  var euclideanDistance = (x1, x2, y1, y2) => {
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
  }

  /*
  METHOD: calculate the euclidean distance so you can tell if a dot was in the circle
  ------------------------------
  */
  var randomInt = (min, max) => {
    return parseInt((max - min) * Math.random() + min)
  }
