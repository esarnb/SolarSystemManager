//When the document is ready...
$(function() {
  /*   Global Variables   */
  var planets = $(".planet"),

  planetModal = $("#PlanetMenu")
  deletePlanetBtn = $("#deletePlanet"),
  updatePlanetBtn =  $("#updatePlanet"),
  confirmPrompt = $("#confirmPrompt"),
  
  confirmDenyModal = $("#confirmDenyModal"),
  confirmBtn = $("#confirmManage"),
  cancelBtn = $("#confirmCancel"),

  planetCreatedAtField = $("#colorField"),

  numPlanetsCount = $("#NoOfCircles");
    
    var noOfCircles = 3;
  /*   Update Planet's properties   */

  //On the click of a planet's class, open the planet's edit menu
  planets.on("click", function() { planetModal.show() });

  // //When delete btn is clicked, confirm with user first.
  // deletePlanetBtn.on("click", function() {
  //   planetModal.hide("hide"); //Hide edit menu
  //   confirmDenyModal.modal("toggle");//Show confirm modal
  //   confirmPrompt.val("Are you sure you want to delete this planet?");
    
  //   //Delete the planet if confirm btn is clicked
  //   confirmBtn.on("click", function() { deletePlanet() })
  // })
    
  // //Hide confirm modal if cancel btn is clicked
  // cancelBtn.on("click", function() { confirmDenyModal.toggle("toggle") })

  // //When update btn is clicked, confirm if user first.
  // updatePlanetBtn.on("click", function() {
  //   planetModal.modal("toggle"); //Hide edit menu
  //   confirmDenyModal.modal("toggle");//Show confirm modal
  //   confirmPrompt.val("Are you sure you want to update this planet?");
    
  //   //Update planet if confirm btn is clicked
  //   confirmBtn.on("click", function() { editPlanet() })
  // })

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
  function deletePlanet(rowid) {
    $.ajax(`/api/solar/${rowid}`, {
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
  function editPlanet(rowid) {
    var nameText = $("#planetNameField"+rowid).val().trim();
    var colorText =  $("#planetColorField"+rowid).val().trim();
    var changeText =  $(`#confirmPrompt${rowid}`)
    var currentPrompt = changeText.text()
    if (!colorText.startsWith("#") || (colorText.length !== 0 && colorText.length !== 7)) {
      changeText.text("Color should start with '#' and have 6 alphanumeric letters!");
      setTimeout(function(){
        changeText.text(currentPrompt)
      },3000)
      return;
    }
    else if (!nameText) {
      changeText.text("There should be a name before you update it's name!");
      setTimeout(function(){
        changeText.text(currentPrompt)
      },3000)
      return;
    }
    var planetProperties = {
      name: nameText,
      color: colorText
    }

    $.ajax(`/api/solar/${rowid}`, {
      type: "PUT",
      data: planetProperties
    }).then(() => { location.reload() })
  }

  /**
   * Function returns a random hex color.
   * 
   * Blog by Paul Irish (https://www.paulirish.com/2009/random-hex-color-code-snippets/)
   * Paul then credits: Ben Alman, Nlogax, and Temp01. 
   */
  // function getRandomColor() { return `#${Math.floor(Math.random()*16777215).toString(16)}` }
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


  /**
   * Function runs the math for the planets,
   * altered to run with current planets in db.
   * 
   * Inspired by Sajjan Sarkar. His CodePen: 
   * http://jsfiddle.net/sajjansarkar/zgcgq8cg/
   */

  /**
   * AJAX GET call to get all the planets currently in the solars db,
   * creates all current planets onto page.
   */
  $.get("/api/solar", function(data) {
    console.log(data);
    var degreeAngle = 360 / data.length;
    var wrapper = $("#circle-container");
    wrapper.empty();
    var currAngle = 0;

    for (var i = 0; i < data.length; i++) {
      wrapper.append("<div class='circle' style='transform: rotate(" + currAngle + "deg) translate(12em) rotate(-" + currAngle + "deg);background-color:" + getRandomColor() + "'></div>");
      currAngle = currAngle + degreeAngle;
    }
  })

  //Show modal when a planet is clicked.
  // $("#circle-container").mouseover(function () {
  //   console.log("mouseover");
  // })
  $(document).on("click", ".planetBtns", function() {
    $(`#Planet_${$(this).val()}_Modal`).show();
  })
  $(document).on("click", "#updatePlanet", function() {
    editPlanet($(this).val());
  })

  $(document).on("click", "#deletePlanet", function() {
    deletePlanet($(this).val());
  })
  // Close modal when x button is hit.
  $(document).on("click", ".close", function() { $(`.modal`).hide() })

});