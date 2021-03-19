"use strict";
$(document).ready(function () {});

const filterCars = () => {
  const { price, mileage, year, colours } = garage.table.inputs;
  const toRender = garage.cars.filter((car) => {
    let includeFlag = true;
    if (includeFlag) {
      includeFlag = price.minVal <= car.price && price.maxVal >= car.price;
    }
    if (includeFlag) {
      includeFlag = year.minVal <= car.year && year.maxVal >= car.year;
    }
    if (includeFlag) {
      includeFlag =
        mileage.minVal <= car.mileage && mileage.maxVal >= car.mileage;
    }
    if (includeFlag && !colours.isColoursDefault()) {
      includeFlag = colours.hasColour(car.colour);
    }
    return includeFlag;
  });
  garage.render(toRender);
  garage.table.inputs.colours.disable([
    ...new Set(toRender.map((car) => car.colour)),
  ]);
};

const outCars = (cars) => {
  if (!cars) cars = garage.cars;
  garage.table.render(cars);
};

const creEL = (tag) => document.createElement(tag);

const resetFilters = () => {
  garage.table.inputs.colours.reset();
  // filters.reset();
};

const init = async () => {
  //this is called first once to initialize run time state
  cars = carFactory(5000); //assign n random cars to global cars variable
  garage = {}; //assign empty object global garage variable
  garage.cars = [...cars]; //assign new array from global cars to garage property
  garage.render = outCars; //assign outCars function to property
  garage.filter = filterCars; //assign filterCars function to property
  garage.table = Dt("cars");
  await garage.table.make();
  garage.reset = resetFilters; //assign resetFilters function to property
  garage.reset(); //call reset
};

//main entry point
//GLOBAL SCOPE VARIABLES
let cars, garage;
init();
