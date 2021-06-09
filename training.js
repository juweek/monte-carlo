
     var svgElement = document.getElementById("svg")
     let svgPaths = svgElement.getElementsByTagName("path")

     var arr = Array.from(svgPaths);

     arr.forEach(element =>
       element.addEventListener("mouseover", function(event)
       {
         const currentElement = event.target
         currentElement.classList.add("highlighted")
       }))

       arr.forEach(element =>
         element.addEventListener("mouseleave", function(event)
         {
           const currentElement = event.target;
           currentElement.classList.remove("highlighted");
         }))
