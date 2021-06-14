/*
------------------------------
METHOD: fetch the elements from the DOM
------------------------------
*/
var svgElement = document.getElementById("uit-canvas__map-svg")
var textElement = document.getElementById("text_container")
var dropdownElement = document.getElementById("mySelect")
let svgPaths = svgElement.getElementsByTagName("path")
var buttonElements = document.querySelectorAll(".buttonsContainer button");
var keyText = document.querySelectorAll(".key_block span");

var arr = Array.from(svgPaths)


/*
------------------------------
METHOD: format text
------------------------------
*/

function formatText(element) {
  var words = element.getAttribute('id').replace('_', ' ').split(" ")

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  words.join(" ")
  return words
}

/*
------------------------------
METHOD: convert into to abbreviated string
------------------------------
*/
function intToString (value) {
  if (!value) {
    return '0'
  }
  var suffixes = ["", "k", "m", "b","t"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue+suffixes[suffixNum];
}


/*
------------------------------
METHOD: add event listener to dropdown
------------------------------
*/

dropdownElement.addEventListener("change", event => {
  clearHover()
  const currentElement = event.target
  var countryName = currentElement.value
  var currentCountry = currentElement.options[currentElement.selectedIndex]
  var mapElement = document.getElementById(countryName.toLowerCase())
  mapElement.classList.add("highlighted")
  //textElement.innerHTML = (currentElement.value + ' has sequenced ' + mapElement.dataset.genomesshared.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' genomes out of ' + mapElement.dataset.covidcases.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' covid cases. That is an ' + mapElement.classList[0] + '% genome sequencing rate.')
  var m

  textElement.innerHTML = (currentElement.value + ' has sequenced ' + intToString(parseInt(mapElement.dataset.genomenumbers)) + ' genomes out of ' + intToString(parseInt(mapElement.dataset.covidcases)) + ' covid cases. That is an ' + mapElement.classList[0] + '% genome sequencing rate.')
})

/*
------------------------------
METHOD: button click interaction
------------------------------
*/
var currentFilter

buttonElements.forEach(element =>
  element.addEventListener("click", event => {
    printFilter(event.target.dataset.filter)
    svgElement.classList = ''
    svgElement.classList.add(event.target.dataset.filter)

  }))

/*
------------------------------
METHOD: clear out all the hover states
------------------------------
*/

function clearHover() {
  arr.forEach(element =>
    element.classList.remove("highlighted")
)}

/*
------------------------------
METHOD: print out certain filter
------------------------------
*/

function printFilter(currentFilter) {
  arr.forEach(function(element) {
    var current = element.getAttribute('data-' + currentFilter.toLowerCase())
})
keyText.forEach((item) => {
  item.classList.remove('visibleText')
  var currentKeyText = document.querySelectorAll('.' + currentFilter + "_text");

  currentKeyText.forEach((current) => {
    current.classList.add('visibleText')
  })
})
}

/*
------------------------------
METHOD: mouse enter hover interaction for map
------------------------------
*/

arr.forEach(element =>
  element.addEventListener("mouseover", event => {
    clearHover()
    const currentElement = event.target
    currentElement.classList.add("highlighted")
    textElement.classList.add("highlighted")
    const words = formatText(event.target)
    textElement.innerHTML = (words + ' has sequenced ' + intToString(parseInt(event.target.dataset.genomenumbers)) + ' genomes out of ' + intToString(parseInt(event.target.dataset.covidcases)) + ' covid cases. That is an ' + event.target.classList[0] + '% genome sequencing rate.')
    }))

/*
------------------------------
METHOD: mouse out interaction for map
------------------------------
*/
arr.forEach(element =>
  element.addEventListener("mouseleave", event => {
    const currentElement = event.target;
      currentElement.classList.remove("highlighted");
    }))
