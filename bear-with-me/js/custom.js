$(document).ready(function(){
  //DOM queries
  // Submission buttons for each step
  var detailsConfirm = document.getElementById("selected-details");
  var destinationConfirm = document.getElementById("selected-destination");
  var vehicleConfirm = document.getElementById("selected-vehicle");
  // Right column of DOM
  var rightColumn = document.getElementById("col-right__child");

  //UI
  //Turn off Bootstrap button outline on click
  $(".btn-primary").click(function () {
    $(".btn-primary").blur();
  });

  //Transition to show date and passenger selection
  function moveToDetails() {
    $("#start-button").click(function () {
      $(".intro").hide();
      $(".form__dates").show();
      $(".form__passengers").show();
      $(".details").show();
      $("#col-right__child").removeClass("col-right__intro");
      $("#col-right__child").addClass("col-right__details");
    });
  }

  //Transition to show vehicle options
  function moveToVehicles() {
    $(".form__dates").hide();
    $(".form__passengers").hide();
    $(".vehicles").show();
    $(".form__vehicles").show();
    $(".vehicle-options").css("display", "flex");
    $("#col-right__child").removeClass("col-right__details");
    $("#col-right__child").addClass("col-right__passengers");
  }

  //Transition to show map
  function moveToMap() {
    $(".vehicles").hide();
    $(".form__vehicles").hide();
    $(".vehicle-options").hide();
    $(".form__destination").show();
    $("#col-right__child").removeClass("col-right__passengers");
    $("#col-right__child").addClass("col-right__map");
  }

  //Toggles visible selection of one vehicle option
  $(".vehicle-options").children().click(function () {
    $(this).toggleClass("is-selected");
    $(this).siblings().removeClass("is-selected");
  });

  //Calculations
  // Take dates and passenger inputs and make them numbers
  function getDetails() {
    datesString = document.getElementById("dates").value;
    passengersString = document.getElementById("passengers").value;
    datesNumber = parseInt(datesString);
    passengersNumber = parseInt(passengersString);
  }

  //Work out which vehicles are available based on user data
  function findPossibleVehicles() {
    if (passengersNumber === 1 && datesNumber < 3) {
      //UI transition
      moveToVehicles();
      //Show options in DOM
      $(".small-car").show();
      $(".motorbike").show();
    }
    else if (passengersNumber === 1 && datesNumber < 6) {
      moveToVehicles();
      $(".small-car").show();
      $(".motorbike").show();
      $(".big-car").show();
    }
    else if (passengersNumber === 1 && datesNumber < 11) {
      moveToVehicles();
      $(".small-car").show();
      $(".big-car").show();
    }
    else if (passengersNumber === 2 && datesNumber === 1) {
      moveToVehicles();
      $(".small-car").show();
    }
    else if (passengersNumber === 2 && datesNumber === 2) {
      moveToVehicles();
      $(".small-car").show();
      $(".camper").show();
    }
    else if (passengersNumber === 2 && datesNumber > 2 && datesNumber < 11) {
      moveToVehicles();
      $(".small-car").show();
      $(".big-car").show();
      $(".camper").show();
    }
    else if (passengersNumber < 6 && datesNumber > 2 && datesNumber < 11) {
      moveToVehicles();
      $(".big-car").show();
      $(".camper").show();
    }
    else if (passengersNumber > 1 && datesNumber > 1) {
      moveToVehicles();
      $(".camper").show();
    }
    else {
      //Validation - requires users to enter correct data before advancing
      alert("Oops! We don't have vehicles available based on these selections. Please try altering your dates/passenger numbers.");
    }
  }

  //Determines which vehicle is selected
  function selectVehicle() {
    vehicleChoice = document.querySelector(".is-selected");
    //Validation - prevents advancing without vehicle selection
    if (vehicleChoice === null) {
      alert("Please select a vehicle");
    }
    else {
      //removes 'is selected' from class name, used to access vehicles object for calculations
      selectedVehicle = (vehicleChoice.className).replace(" is-selected", "");
      //Creates and transitions to map
      createMap();
      moveToMap();
    }
  }

  //Creates mapbox when called
  function createMap() {
    mapContainer = document.createElement("div");
    mapContainer.style.width = "100%";
    mapContainer.style.height = "100%";
    mapContainer.setAttribute("id", "map");
    rightColumn.appendChild(mapContainer);
    mapboxgl.accessToken = "pk.eyJ1Ijoic2Via25pZ2h0IiwiYSI6ImNqaTNuNDFodTAwYjQzcHIxNXB5YWFxNDEifQ.wpTWbTXyg2OGtiM9G1UvrA";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/sebknight/cjintebre1ihi2rnpwvmoa7y7",
      center: [174.02, -41.09],
      zoom: 5
    });

    map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric"
    }), "top-left");
  }

  //gets distance output from mapbox directions API
  function calculateDistance() {
    container = document.querySelector(".mapbox-directions-route-summary");
    //Validation - prevernts advancing without a distance value
    if (container === null) {
      alert("Please enter an origin and destination, or wait for the distance to be calculated");
    }
    //Takes distance from mapbox DOM and turns into number
    else {
      distanceOutput = container.getElementsByTagName("h1");
      distanceText = $(distanceOutput).text();
      distance = parseInt(distanceText);
      // Gets data of selected vehicle from vehicles object
      selectVehicleData();
      // Takes input data to calculate cost
      calculateCost();
      // UI transitions to final page
      $(".form__destination").hide();
      $("#map").hide();
      $(".form__confirm").show();
      // Puts calculation results into DOM
      outputDetails();
    }
  }

  // Assigns hire and cost values based on selected vehicles, using vehicles object in data.js
  function selectVehicleData() {
    if (selectedVehicle === "vehicle motorbike") {
      packageName = "Riding solo (motorbike)";
      rentalCost = vehicles.motorbike.price;
      fuelUsage = vehicles.motorbike.fuel;
    }
    else if (selectedVehicle === "vehicle small-car") {
      packageName = "Couples (small car)";
      rentalCost = vehicles.smallCar.price;
      fuelUsage = vehicles.smallCar.fuel;
    }
    else if (selectedVehicle === "vehicle big-car") {
      packageName = "Magnum (4WD)";
      rentalCost = vehicles.bigCar.price;
      fuelUsage = vehicles.bigCar.fuel;
    }
    else {
      packageName = "Group fun (camper van)";
      rentalCost = vehicles.camper.price;
      fuelUsage = vehicles.camper.fuel;
    }
  }
  // Pricing algorithm
  function calculateCost() {
    // calculates total hireage cost
    totalRental = rentalCost * datesNumber;
    // restricts number to two decimal places
    totalRentalTruncated = totalRental.toFixed(2);
    // calculates fuel usage
    totalFuel = fuelUsage * (distance / 100);
    totalFuelTruncated = totalFuel.toFixed(2);
    // calculates total cost
    // totalCost = totalRent + totalFuel;
    // totalCostTruncated = totalCost.toFixed(2);
  }

  // Outputs calculated data to the DOM
  function outputDetails() {
    //Package name
    $("#list-package").text
      (packageName + " package");
    //Makes sure pluralisaton is correct
    if (datesNumber === 1) {
      $("#list-dates").text("Hired for 1 day");
    }
    else {
      $("#list-dates").text("Hired for " + datesNumber + " days");
    }
    if (passengersNumber === 1) {
      $("#list-passengers").text("1 passenger");
    }
    else {
      $("#list-dates").text(passengersNumber + " passengers");
    }
    // Trip details
    $("#list-distance").text("Travel distance: " + distanceText);
    $("#list-rent-cost").text("Rental cost: $" + totalRentalTruncated);
    $("#list-fuel-usage").text("Estimated fuel usage: " + totalFuelTruncated + "L");
    // $("#list-total-cost").text("Estimated total cost: $" + totalCostTruncated);
  }

  var app = {
    init: function () {
      // UI transition
      moveToDetails();
      // adds listener to take form data about passenger numbers and dates
      detailsConfirm.addEventListener("click", function (event) {
        event.preventDefault();
        // convert passenger and date strings to number
        getDetails();
        // determine available vehicles based on passenger numbers and dates
        findPossibleVehicles();
        // details submit button function ENDS
      });

      vehicleConfirm.addEventListener("click", function (event) {
        event.preventDefault();
        selectVehicle();
      });
      // adds event listener to take map data
      destinationConfirm.addEventListener("click", function (event) {
        event.preventDefault();
        calculateDistance();
      });
      // init ENDS
    }
    // var app ENDS
  };

  //run app
  app.init();

})
