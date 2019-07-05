//When the document is ready...
$(function() {
  /*   Global Variables   */
  var planets = $(".planet"),
      confirmDenyModal = $("#confirmDenyModal"),
      deletePlanetBtn = $("#deletePlanet"),
      updatePlanetBtn =  $("#updatePlanet"),
      confirmPrompt = $("#confirmPrompt"),
      confirmBtn = $("#confirmManage"),
      cancelBtn = $("#confirmCancel"),
      planetNameField = $("#nameField"),
      planetColorField = $("#colorField"),
      numPlanetsCount = $("#NoOfCircles"),
      decrementBtn = $("#decrement"),
      incrementBtn = $("#increment");
    
    var noOfCircles = 3;
    numPlanetsCount.val(noOfCircles);
    numPlanetsCount.text(noOfCircles);
  /*   Update Planet's properties   */

  //On the click of a planet's class, open the planet's edit menu
  planets.on("click", function() { planetModal.modal("toggle") });

  //When delete btn is clicked, confirm with user first.
  deletePlanetBtn.on("click", function() {
    planetModal.modal("toggle"); //Hide edit menu
    confirmDenyModal.modal("toggle");//Show confirm modal
    confirmPrompt.val("Are you sure you want to delete this planet?");
    
    //Delete the planet if confirm btn is clicked
    confirmBtn.on("click", function() { deletePlanet() })
  })
    
  //Hide confirm modal if cancel btn is clicked
  cancelBtn.on("click", function() { confirmDenyModal.toggle("toggle") })

  //When update btn is clicked, confirm if user first.
  updatePlanetBtn.on("click", function() {
    planetModal.modal("toggle"); //Hide edit menu
    confirmDenyModal.modal("toggle");//Show confirm modal
    confirmPrompt.val("Are you sure you want to update this planet?");
    
    //Update planet if confirm btn is clicked
    confirmBtn.on("click", function() { editPlanet() })
  })

  //TEMPORARY: Increment or decrement the text-value of the amount of planets.
  noOfCircles = parseInt(numPlanetsCount.text());
  $(document).on("click", "#increment", function() {
    noOfCircles++;
    numPlanetsCount.val(noOfCircles);
    numPlanetsCount.text(`${noOfCircles}`) 
  })

  $(document).on("click", "#decrement", function() {
    noOfCircles--;
    numPlanetsCount.val(noOfCircles);
    numPlanetsCount.text(`${noOfCircles}`) 
  })

  /**
   * Function deletes the specific planet that is
   * associated with the id the user clicked on.
   * 
   * Uses type DELETE and sends the row-id
   */
  function deletePlanet() {
    $.ajax(`/api/solar/${$(this).data("id")}`, {
      type: "DELETE"
    }).then(() => { location.reload() })
  }

  /**
   * Function updates the specific planet that is
   * associated with the id the user clicked on.
   * 
   * Uses type PUT and sends the row-id 
   * and the data to be updated with.
   */
  function editPlanet() {

    var planetProperties = {
      name: planetNameField,
      color: planetColorField
    }

    $.ajax(`/api/solar/${$(this).data("id")}`, {
      type: "PUT",
      data: planetProperties
    }).then(() => { location.reload() })
  }

})





/**
 * Function returns a random hex color.
 * 
 * Blog by Paul Irish (https://www.paulirish.com/2009/random-hex-color-code-snippets/)
 * Paul then credits: ben alman, nlogax, and temp01. 
 */
function getRandomColor() { return `#${Math.floor(Math.random()*16777215).toString(16)}` }


/**
 * Function runs the math for the planets
 * 
 * Written by Sajjan Sarkar. His CodePen: 
 * http://jsfiddle.net/sajjansarkar/zgcgq8cg/
 */

$(function () {
  /* add onchange listener */
  $(document).on('change', "#NoOfCircles", function() {
        console.log("Change 1");
        /* get the value in the textbox */
      var noOfCircles = parseInt($("#NoOfCircles").val());
      /* equally divide 360 by the no of circles to be drawn */
      var degreeAngle = 360 / noOfCircles;
      /* get handle on the wrapper canvas */
      var wrapper = $("#circle-container");
      /* clear it first */
      wrapper.empty();
      /* initialize angle incrementer variable */
        console.log("Change 2");
        var currAngle = 0;
      /* draw each circle at the specified angle */
      for (var i = 0; i < noOfCircles; i++) {
        console.log("Change I=" + i);
        
          /* add to the wrapper */
          wrapper.append(getDiv(currAngle));
          /* increment the angle incrementer */
          currAngle = currAngle + degreeAngle;
      }
      console.log("Change end");

  });
  function getDiv(currAngle) {
    console.log(currAngle);
    
    return `<div class='circle' style='transform: rotate(${currAngle}) translate(12em) rotate(-${currAngle}deg);background-color:getRandomColor()'></div>`
  }
});
