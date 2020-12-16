// Write your JavaScript code here!
window.addEventListener("load", function () {

 let form = document.querySelector("form");

   form.addEventListener("submit", function (event) {
      event.preventDefault();

      let pilotName = document.querySelector("input[name = pilotName]").value;
      let copilotName = document.querySelector("input[name =copilotName]").value;
      let fuelLevel = document.querySelector("input[name= fuelLevel]").value;
      let cargoMass = document.querySelector("input[name = cargoMass]").value;

      let errormessage = "";
      let validationSuccess = true;
      

      if (pilotName == "") {

         errormessage += "The pilotname cannot be blank \n";
         validationSuccess = false;
        
      }

      if (validationSuccess && copilotName == "") {
         errormessage += "The copilotname cannot be blank ";
         
         validationSuccess = false;
         
      }
      if (validationSuccess && fuelLevel == "") {
         errormessage += "The fuellevel cannot be blank \n";
         validationSuccess = false;
         
      }
      if (validationSuccess && cargoMass == "") {
         errormessage += "The cargomass cannot be blank \n";
         validationSuccess = false;
         
      }
      if (validationSuccess && (isNaN(fuelLevel) || isNaN(cargoMass))) {
         errormessage += "The cargoMass/fuelLevel should  be a number \n";
         validationSuccess = false;
         


      }
      if (errormessage != "") {
         alert(errormessage);
         
         

         launchStatus.innerHTML = 'Awaiting Information Before Launch';
         launchStatus.style.color = "black";
         


      }
      else {
         alert('Values successfully loaded to the LaunchStatus form');

         //......Fetching the values to the ShuttleReadyForm getting to know the status if its ready to take off or not.......


         let list = document.getElementById("faultyItems");
         list.style.visibility = "visible";
         let form = document.querySelector("form");
         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");
         let fuelStatus = document.getElementById("fuelStatus");
         let cargoStatus = document.getElementById("cargoStatus");

         let shuttleReady = true;



         pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch`;
         console.log(pilotStatus.innerHTML);

         copilotStatus.innerHTML = `Copilot ${copilotName}   is ready for Launch`;

         if (Number(fuelLevel) < 10000) {
            fuelStatus.innerHTML = `Fuel Level too low for launch. It should be > 10000, it is:  ${fuelLevel}`;
            shuttleReady = false;
         }
         if (Number(cargoMass) >= 10000) {
            cargoStatus.innerHTML = `Cargo Mass too heavy for lift-off. It should be < 10000, it is: ${cargoMass}`;
            shuttleReady = false;
         }
          // If any of the values are not appropriate it will display error message in red color
         if (shuttleReady == false) {
            launchStatus.innerHTML = "Shuttle is not ready for Launch";
            launchStatus.style.color = "red";
            faultyItems.style.visibility = "visible";
         }
         if(shuttleReady == true){
            launchStatus.innerHTML = "Shuttle is ready for the Launch";
            launchStatus.style.color = "lime";
            faultyItems.style.visibility = "visible";
         }

      }
   })

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json){
         const randomIndex = Math.floor(Math.random() * json.length);
         const missiontarget = document.getElementById("missionTarget");
         missiontarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[randomIndex].name}</li>
            <li>Diameter: ${json[randomIndex].diameter}</li>
            <li>Star: ${json[randomIndex].star}</li>
            <li>Distance from Earth: ${json[randomIndex].distance}</li>
            <li>Number of Moons: ${json[randomIndex].moons}</li>
         </ol>
         <img src="${json[randomIndex].image}">
         `
      }); 
   } );


})

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
