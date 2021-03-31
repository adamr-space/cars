"use strict";

const filterCars = () => {
  garage.table.table.draw(); //redraw table
  garage.table.inputs.adjustFilters(); //recalculate all filters min, max and values to match new filtered table data
  garage.table.inputs.colours.disable(); //call method on colours to disable colours checkboxes matching data out of filtered scope
};

const outCars = (cars) => {
  //function rendering cars table
  if (!cars) cars = garage.cars; //if cars parameter was empty assign cars from object to it
  garage.table.render(cars); //render table
};

const resetFilters = () => {
  //function reseting filters
  garage.table.inputs.setDefaults(); //setting defaults for inputs
  garage.table.inputs.colours.reset(); //reset all colour checboxes
  garage.filter(); //applying filter to restore all cars
};

const init = () => {
  //create main garage object and assign data and methods to its properties
  //this is called first once to initialize run time state
  const cars = carFactory(50000); //assign n random cars to global cars variable
  garage = {}; //assign empty object global garage variable
  garage.cars = [...cars]; //assign new array from global cars to garage property
  garage.render = outCars; //assign outCars function to property
  garage.filter = filterCars; //assign filterCars function to property
  garage.table = Dt("cars"); //create DataTable and insert into div element with id cars
  garage.table.make(); //make and initialise table
  garage.reset = resetFilters; //assign resetFilters function to property
  garage.reset(); //call reset method
};

//main entry point
//GLOBAL SCOPE VARIABLES
let garage;
init();
