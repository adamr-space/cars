"use strict";
const getNumInRng = (
  min,
  range //helper function to generate random number in range beetwen min and min+range
) => Math.floor(Math.random() * (range + 1)) + min;

const rndToHundred = (value) => Math.round(value / 100) * 100; //helper function for rounding to nearest 100

const pickCar = () => {
  //helper function randomly selecting car template from cars data
  const lastCar = carsData.length - 1;
  return carsData[getNumInRng(0, lastCar)];
};

const getColour = () => {
  //helper function rando,ly selecting colour from colours data
  const lastColour = coloursData.length - 1;
  return getNumInRng(0, lastColour);
};

const getMileage = (fromYr) => {
  //helper function generating random yearly mileage multiplied by car age
  const agvMileagePerYear = getNumInRng(2000, 8000); //get random mileage between 2000-10000 miles (2000+8000, min+(min+range))
  return rndToHundred((currYr - fromYr + 0.2) * agvMileagePerYear); //multply yearly mileage by car age and round to nearest 100
};

const getMnfYr = (fromYr, toYr) => {
  //get random manufacturing year from range present in cars data
  if (toYr === undefined) toYr = currYr;
  return getNumInRng(fromYr, toYr - fromYr);
};

const getPrice = () => rndToHundred(getNumInRng(1000, 99000)); //get random car price from range

const assembleCar = ({ make, model, year }) => ({
  //helper function, car assembly line, using helper functions and passed arguments
  make,
  model,
  year,
  colour: getColour(),
  price: getPrice(),
  mileage: getMileage(year),
});

const carFactory = (n) => {
  //main function, cars factory based on random template selected randomly from cars data, will generate number of cars equal to passed n parameter
  const carsFactory = []; //make empty cars storage
  for (let i = 0; i < n; i++) {
    //factory loop until all n cars are assembled
    const template = pickCar(); //picking random car template
    const car = assembleCar({
      //calling assembly line with template instructions
      make: template.make,
      model: template.model,
      year: getMnfYr(template.fromYr, template.toYr),
    });
    carsFactory.push(car); //pushing assembled car into factory storage
  }
  return carsFactory; //factory cars returned
};

let currYr = new Date().getFullYear(); //getting current yearr
