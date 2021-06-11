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

dropdownElement.addEventListener("change", function(event)
{
  clearHover()
  const currentElement = event.target
  var countryName = currentElement.value
  var currentCountry = currentElement.options[currentElement.selectedIndex]
  var mapElement = document.getElementById(countryName.toLowerCase())
  mapElement.classList.add("highlighted")
  //textElement.innerHTML = (currentElement.value + ' has sequenced ' + mapElement.dataset.genomesshared.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' genomes out of ' + mapElement.dataset.covidcases.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' covid cases. That is an ' + mapElement.classList[0] + '% genome sequencing rate.')
  var m

  textElement.innerHTML = (currentElement.value + ' has sequenced ' + intToString(parseInt(mapElement.dataset.genomesshared)) + ' genomes out of ' + intToString(parseInt(mapElement.dataset.covidcases)) + ' covid cases. That is an ' + mapElement.classList[0] + '% genome sequencing rate.')
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
      textElement.innerHTML = (words + ' has sequenced ' + intToString(parseInt(event.target.dataset.genomesshared)) + ' genomes out of ' + intToString(parseInt(event.target.dataset.covidcases)) + ' covid cases. That is an ' + event.target.classList[0] + '% genome sequencing rate.')
    }))

    arr.forEach(element =>
      element.addEventListener("mouseleave", function(event)
      {
        const currentElement = event.target;
        currentElement.classList.remove("highlighted");
      }))
