var startButton = document.getElementById('br-body__start-button')
var restartButton = document.getElementById('br-body__restart-button')
/*
------------------------------
Set variables for the circle
------------------------------
*/
var circleWidth = 300
var circleHeight = 300
var circleRadius = Math.min(circleHeight, circleWidth) / 2

/*
------------------------------
set global variables for the methods
------------------------------
*/
var totalPoints = 0
var radius = 4

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
var drawPoint = (x, y) => {
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
var updateText = (totalPointsDrawn, totalInCircle, estimatedPi) => {
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
  var inputField = document.getElementById('br-body__input-field')
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
    drawCircle()
    start()
  }
})

startButton.addEventListener('click', (o) => {
  var inputLines = document.getElementById('br-body__info-lines')
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

  //set variables
  var count = 1
  var totalPointsDrawn = 0
  var totalInCircle = 0
  var estimatedPi = 0
  var drawInterval = setInterval(update, 5)

  startButton.addEventListener('click', null)
  restartButton.addEventListener('click', null)

  var update = () => {
    //first, validate that you arent finished
    if(count >= totalPoints) {
      clearInterval(drawInterval)
    }
    //second, generate a random x and y number to figure out the next dot's coordinates
    var x = randomInt(0, circleWidth)
    var y = randomInt(0, circleHeight)

    //check if the point is in the circle using euclideanDistance
    if (euclideanDistance(x, circleWidth / 2, y, circleHeight / 2) < circleRadius) {
      context.fillStyle = '#3db540'
      totalInCircle++
    }
    else {
      context.fillStyle = '#c70000'
    }

    //aincrease counter, calculate new values
    count++
    totalPointsDrawn++
    estimatedPi = (totalInCircle/totalPointsDrawn) * 4

    //draw a point and update the text
    drawPoint(x, y, radius)
    updateText(totalPointsDrawn, totalInCircle, estimatedPi)
  }
}


drawCircle()
