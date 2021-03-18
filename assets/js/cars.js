"use strict";
const getNumInRng = (min, range) =>
  Math.floor(Math.random() * (range + 1)) + min;

const rndToHundred = (value) => Math.round(value / 100) * 100;

const pickCar = () => {
  const lastCar = carsData.length - 1;
  return carsData[getNumInRng(0, lastCar)];
};

const getColour = () => {
  const lastColour = coloursData.length - 1;
  return getNumInRng(0, lastColour);
};

const getMileage = (fromYr) => {
  const agvMileagePerYear = getNumInRng(2000, 8000);
  return rndToHundred((currYr - fromYr + 0.2) * agvMileagePerYear);
};

const getMnfYr = (fromYr, toYr) => {
  if (toYr === undefined) toYr = currYr;
  return getNumInRng(fromYr, toYr - fromYr);
};

const getPrice = () => rndToHundred(getNumInRng(1000, 99000));

const assembleCar = ({ make, model, year }) => ({
  make,
  model,
  year,
  colour: getColour(),
  price: getPrice(),
  mileage: getMileage(year),
});

const carFactory = (n) => {
  const carsFactory = [];
  for (let i = 0; i < n; i++) {
    const template = pickCar();
    const car = assembleCar({
      make: template.make,
      model: template.model,
      year: getMnfYr(template.fromYr, template.toYr),
    });
    carsFactory.push(car);
  }
  return carsFactory;
};

let currYr = new Date().getFullYear();
