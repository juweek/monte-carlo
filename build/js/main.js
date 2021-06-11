/*
------------------------------
METHOD: fetch the elements from the DOM
------------------------------
*/
var svgElement = document.getElementById("svg")
var textElement = document.getElementById("text_container")
var dropdownElement = document.getElementById("mySelect")
let svgPaths = svgElement.getElementsByTagName("path")

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
METHOD: add event listener to dropdown
------------------------------
*/

dropdownElement.addEventListener("change", function(event)
{
  clearHover()
  const currentElement = event.target
  var countryName = currentElement.value
  var currentCountry = currentElement.options[currentElement.selectedIndex]
  var mapElement = document.getElementById(countryName.toLowerCase())
  console.log(countryName)
  console.log(currentCountry.dataset.classification)
  mapElement.classList.add("highlighted")
})

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
METHOD: hover interaction for map
------------------------------
*/

arr.forEach(element =>
  element.addEventListener("mouseover", function(event)
  {
    clearHover()
    const currentElement = event.target
    currentElement.classList.add("highlighted")
    textElement.classList.add("highlighted")
    const words = formatText(event.target)
    textElement.innerHTML = (words + ' has ' + event.target.classList[0] + '% of their total genomes sequenced.')
  }))

  arr.forEach(element =>
    element.addEventListener("mouseleave", function(event)
    {
      const currentElement = event.target;
      currentElement.classList.remove("highlighted");
    }))
