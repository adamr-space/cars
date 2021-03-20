"use strict";
$(document).ready(function () {});

const filterCars = () => {
  garage.table.table.draw();
  garage.table.inputs.colours.disable();
  garage.table.inputs.adjustFilters()
};

const outCars = (cars) => {
  if (!cars) cars = garage.cars;
  garage.table.render(cars);
};

const resetFilters = () => {
  garage.table.inputs.setDefaults()
  garage.table.inputs.colours.reset();
  garage.filter()
};

const init = async () => {
  //this is called first once to initialize run time state
  cars = carFactory(50000); //assign n random cars to global cars variable
  garage = {}; //assign empty object global garage variable
  garage.cars = [...cars]; //assign new array from global cars to garage property
  garage.render = outCars; //assign outCars function to property
  garage.filter = filterCars; //assign filterCars function to property
  garage.table = Dt("cars"); //create DataTable
  await garage.table.make(); //initialise table
  garage.reset = resetFilters; //assign resetFilters function to property
  garage.reset(); //call reset
  makeFilters(); // create table fitler
};

//main entry point
//GLOBAL SCOPE VARIABLES
let cars, garage;
init();
