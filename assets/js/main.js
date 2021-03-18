"use strict";
$(document).ready(function () {});

const fltCars = () => {
  const {price,mileage,year} = dt.inputs
  const toRender = garage.cars.filter((car) => {
    let includeCar = true;
    // console.log(dt.inputs.price.minVal, car.price)
    if (includeCar) {
      includeCar =
        price.minVal <= car.price && price.maxVal >= car.price;
    }
    if (includeCar) {
      includeCar = year.minVal <= car.year && year.maxVal >= car.year;
    }
    if (includeCar) {
      includeCar =
        mileage.minVal <= car.mileage &&
        mileage.maxVal >= car.mileage;
    }
    if (includeCar && !filters.isColoursDefault()) {
      includeCar = filters.hasColour(car.colour);
    }
    return includeCar;
  });
  garage.render(toRender);
  clrFlt.disable([...new Set(toRender.map((car) => car.colour))]);
};

const outCars = (cars) => {
  console.log(cars)
  if (!cars) cars = garage.cars;
  dt.table.clear()
      .rows.add(cars)
      .draw()
};

const outClrs = () => {
  colours.innerHTML = "";
  colours.append(clrFlt.clrFltrs);
  return clrFlt;
};

const creEL = (tag) => document.createElement(tag);

const rstFlt = () => {
  clrsFlt.reset();
  filters.reset();
};

const init = () => {
  //this is called first once to initialize run time state

  colours = document.getElementById("colours");
  cars = carFactory(5000); //assign n random cars to global cars variable
  garage = {}; //assign empty object global garage variable
  garage.cars = [...cars]; //assign new array from global cars to garage property
  garage.render = outCars; //assign outCars function to property
  garage.reset = rstFlt; //assign rstFlt function to property
  garage.filter = fltCars; //assign fltCars function to property
  garage.total = cars.length;
  filters = new Filters(garage.cars);
  clrFlt = new ColoursFilter();
  clrsFlt = outClrs();
  garage.reset(); //call reset
  dt = Dt({id:"cars"})
  dt.make()
};

//main entry point
//GLOBAL SCOPE VARIABLES
let cars,
  garage,
  colours,
  clrsFlt,
  clrFlt,
  filters,
  dt;
init();
