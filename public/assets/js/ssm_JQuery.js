//When the document is ready...
$(function() {
  /*   Global Variables   */
  var planets = $(".planet"),

  planetModal = $("#PlanetMenu")
  deletePlanetBtn = $("#deletePlanet"),
  insertPlanetBtn = $("#insertPlanet"),
  updatePlanetBtn =  $("#updatePlanet"),
  confirmPrompt = $("#confirmPrompt");

    /*On the click of a planet's class, open the planet's edit menu */
  // planets.on("click", function() { planetModal.show() });

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
      changeText.text("Color should start with '#' and have 6 alphanumeric letters! ('#random' for random color)");
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
      name: `'${nameText}'`,
      color: `'${colorText}'`
    }

    $.ajax(`/api/solar/${rowid}`, {
      type: "PUT",
      data: planetProperties
    }).then(() => { location.reload() })
  }

  
  function insertPlanet() {

    var nameText = $("#planetNameFieldNew").val().trim();
    var colorText =  $("#planetColorFieldNew").val().trim();
    var changeText =  $(`#insertPlanetPrompt`)
    var currentPrompt = changeText.text()

    if (!colorText.startsWith("#") || (colorText.length !== 0 && colorText.length !== 7)) {
      changeText.text("Color should start with '#' and have 6 alphanumeric letters! ('#random' for random color)");
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
      name: `'${nameText}'`,
      color: `'${colorText}'`
    }

    $.ajax(`/api/solar/${rowid}`, {
      type: "POST",
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
      wrapper.append(`<div class='circle tooltip' style='transform: rotate(${currAngle}deg) translate(12em) rotate(-${currAngle}deg);background-color:${(data[i].color == "#random" ? getRandomColor() : data[i].color)}'><div class='tooltiptext'>Planet ${data[i].id}</div></div>`);
      currAngle = currAngle + degreeAngle;
    }
  })


  $(document).on("click", ".circle", function(event) {
    console.log(event);
    console.log("Clicked");
  })

  $(document).on("click", ".planetBtns", function() {
    console.log("class planetBtns clicked");
    
    $(`#Planet_${$(this).val()}_Modal`).show("slow");
  })

  $(document).on("click", "#insertPlanet", function() {
    console.log("id insertPlanet clicked");
    $("#insertPlanetModal").show("slow");
  })

  $(document).on("click", "#submitNewPlanet", function() {
    insertPlanet();
    console.log("id submitNewPlanet clicked");
  })

  $(document).on("click", "#updatePlanet", function() {
    console.log("id updatePlanet clicked");
    editPlanet($(this).val());
  })

  $(document).on("click", "#deletePlanet", function() {
    console.log("id deletePlanet clicked");
    deletePlanet($(this).val());
  })

  // Close modal when x button is hit.
  $(document).on("click", ".close", function() { $(`.modal`).hide("slow") })

});