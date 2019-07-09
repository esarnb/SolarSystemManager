//When the document is ready...
$(function() {
  /*   Global Variables   */
  deletePlanetBtn = $("#deletePlanet"),
  insertPlanetBtn = $("#insertPlanet"),
  updatePlanetBtn =  $("#updatePlanet"),
  confirmPrompt = $("#confirmPrompt");

  /*On the click of a planet's class, open the planet's edit menu */

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

  
  /**
   * Function creates a new planet that is
   * associated with the name and color the user inputs.
   * 
   * Uses type POST and sends the data to be updated with.
   */
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
      name: nameText,
      color: colorText
    }

    $.ajax(`/api/solar/new`, {
      type: "POST",
      data: planetProperties
    }).then(() => { location.reload() })
  }

  /**
   * Function returns a new random hex color.
   * 
   * Only used when color is not provided.
   * 
   * Function created by Sajjan Sarkar
   **/
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
    
    //Create divs for each planet with equal angles, rotations, and custom data.
    for (var i = 0; i < data.length; i++) {
      wrapper.append(`<div class='circle tooltip' value='${data[i].id}' style='transform: rotate(${currAngle}deg) translate(12em) rotate(-${currAngle}deg);background-color:${(data[i].color == "#random" ? getRandomColor() : data[i].color)}'><div class='tooltiptext'>${data[i].name}</div></div>`);
      currAngle = currAngle + degreeAngle;
    }
  })

  /**
   * On a planet's click event, 
   * open the custom menu for the specific planet.
   */
  $(document).on("click", ".circle", function() {
    $(`#Planet_${$(this).attr("value")}_Modal`).show("slow");
  })

  /**
   * On the insert planet button click, 
   * open the new planet menu.
   */
  $(document).on("click", "#insertPlanet", function() {
    console.log("id insertPlanet clicked");
    $("#insertPlanetModal").show("slow");
  })

  /**
   * Once the submit button is clicked,
   * send the new planet data to the server.
   */
  $(document).on("click", "#submitNewPlanet", function() {
    console.log("id submitNewPlanet clicked");
    insertPlanet();
  })

  /**
   * Send the specific planet's data to the server,
   * when the update button for that planet is clicked.
   */
  $(document).on("click", "#updatePlanet", function() {
    console.log("id updatePlanet clicked");
    editPlanet($(this).val());
  })

  /**
   * Delete the specific planet's data form the server,
   * when the delete button for that planet is clicked.
   */
  $(document).on("click", "#deletePlanet", function() {
    console.log("id deletePlanet clicked");
    deletePlanet($(this).val());
  })

  // Close modal when x button is hit.
  $(document).on("click", ".close", function() { $(`.modal`).hide("slow") })

});