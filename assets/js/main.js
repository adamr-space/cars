"use strict";
$(document).ready(function () {});

const fltCars = () => {
  const toRender = garage.cars.filter((car) => {
    let includeCar = true;
    if (includeCar && !filters.isPriceDefault()) {
      includeCar =
        filters.price.min <= car.price && filters.price.max >= car.price;
    }
    if (includeCar && !filters.isYearDefault()) {
      includeCar = filters.year.min <= car.year && filters.year.max >= car.year;
    }
    if (includeCar && !filters.isMileageDefault()) {
      includeCar =
        filters.mileage.min <= car.mileage &&
        filters.mileage.max >= car.mileage;
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
  if (!cars) cars = garage.cars;
  // carsCnt.innerText = `${cars.length} of ${garage.total}`;
  let inner = "";
  let index = 0;
  for (const car of cars) {
    inner += `<div id="${index++}" class="car">${outCar(car)}</div>`;
  }
  // outClrs();
  results.innerHTML = inner;
  results.style.visibility = "visible";
};

// const fltClrs = (value, only = false) => {
//   if (only) fltCars((car) => car.colour == value);
//   else fltCars((car) => car.colour != value);
// };

const outClrs = () => {
  colours.innerHTML = "";
  colours.append(clrFlt.clrFltrs);
  return clrFlt;
};

// const outClr = (colour) => {
//   const clrFlt = new ColoursFilter(colour);
//   // const rd = creEL("input");
//   // const rdOpts = {
//   //   id: `rd${colour}`,
//   //   value: colour,
//   //   checked: true,
//   //   type: "checkbox",
//   //   onclick: () => {
//   //     timer = setTimeout(function () {
//   //       if (!prevent) {
//   //         fltClrs(colour, false);
//   //       }
//   //       prevent = false;
//   //     }, delay);
//   //   },
//   //   ondblclick: () => {
//   //     clearTimeout(timer);
//   //     prevent = true;
//   //     fltClrs(colour, true);
//   //   },
//   // };
//   // for (const key in rdOpts) {
//   //   rd[key] = rdOpts[key];
//   // }
//   // const lbl = creEL("label");
//   // lbl.for = rdOpts.id;
//   // lbl.innerText = coloursData[colour];
//   return clrFlt;
// };

const capFstLetter = (word) => word[0].toUpperCase() + word.slice(1);

// const getTag = (key) => (["make", "model"].includes(key) ? "div" : "span"); //return tag based on property.

const getHTML = (key) => {
  let reply = ["model", "make"].includes(key) ? "" : `${capFstLetter(key)}: `;
  return (reply += key == "price" ? "£" : "");
};

const creEL = (tag) => document.createElement(tag);

const outCar = (car) => {
  let inner = "";
  for (const key in car) {
    inner += `<div class="${key}">`;
    inner += getHTML(key);
    inner += `${key == "colour" ? coloursData[car[key]] : car[key]} `;
    inner += `</div>`;
  }
  return inner;
};

const changePrice = () => {
  const minGaragePrice = Math.min(...garage.cars.map((car) => car.price));
  const maxGaragePrice = Math.max(...garage.cars.map((car) => car.price));
  min.value > max.value ? (max.value = min.value) : null;
  filters.minPrice = min.value >= minGaragePrice ? min.value : minGaragePrice;
  filters.maxPrice = max.value <= maxGaragePrice ? max.value : maxGaragePrice;
};

const rstFlt = () => {
  clrsFlt.reset();
  // min.value = Math.min(...garage.cars.map((car) => car.price));
  // max.value = Math.max(...garage.cars.map((car) => car.price));
  results.style.visibility = "hidden";
  results.innerHTML = "";
  filters.reset();
  // garage.cars = [...cars]; //assign new array from global cars to garage property
  // garage.render(); //call render
};

const init = () => {
  //this is called first once to initialize run time state

  cusPrice = document.getElementById("customPrice");
  results = document.getElementById("results");
  colours = document.getElementById("colours");
  carsCnt = document.getElementById("carsCount");
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
  cusPrice,
  results,
  colours,
  carsCnt,
  clrsFlt,
  clrFlt,
  filters,
  minMi,
  maxMi,
  maxPrice,
  minPrice,
  maxYr,
  minYr,
  maxAge,
  dt;
init();
