"use strict";
class Filters {
  constructor(cars) {
    this._colours = {
      list: [...new Set(cars.map((car) => car.colour))],
      length: [...new Set(cars.map((car) => car.colour))].length,
    };
    this._mileage = {
      min: Math.min(...cars.map((car) => car.mileage)),
      max: Math.max(...cars.map((car) => car.mileage)),
      defaulted: true,
    };
    this._price = {
      min: Math.min(...cars.map((car) => car.price)),
      max: Math.max(...cars.map((car) => car.price)),
      defaulted: true,
    };
    this._year = {
      min: Math.min(...cars.map((car) => car.year)),
      max: Math.max(...cars.map((car) => car.year)),
      defaulted: true,
    };
  }

  set maxAge(age) {
    this._year.min = this.getCurrentYear() - age;
    this._year.max = this.getCurrentYear();
    this._year.defaulted = false;
  }

  set minYear(min) {
    this._year.min = min;
    this._year.defaulted = false;
  }

  set maxYear(max) {
    this._year.max = max;
    this._year.defaulted = false;
  }

  set minMileage(min) {
    this._mileage.min = min;
    this._mileage.defaulted = false;
  }

  set maxMileage(max) {
    this._mileage.max = max;
    this._mileage.defaulted = false;
  }

  set minPrice(min) {
    this._price.min = min;
    this._price.defaulted = false;
  }

  set maxPrice(max) {
    this._price.max = max;
    this._price.defaulted = false;
  }

  set colour(colour) {
    colour = parseInt(colour);
    this._colours.list = [colour];
  }

  set colours(colours) {
    this._colours.list = colours;
  }

  get colours() {
    return this._colours.list;
  }
  get year() {
    return this._year;
  }
  get price() {
    return this._price;
  }
  get mileage() {
    return this._mileage;
  }

  addColour(colour) {
    colour = parseInt(colour);
    if (!this.hasColour(colour)) this._colours.list.push(colour);
  }

  removeColour(colour) {
    colour = parseInt(colour);
    const index = this._colours.list.indexOf(colour);
    if (index > -1) {
      this._colours.list.splice(index, 1);
    }
  }

  hasColour(colour) {
    colour = parseInt(colour);
    return this._colours.list.includes(colour);
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  isColoursDefault() {
    return this._colours.list.length == this._colours.length;
  }

  isPriceDefault() {
    return this._price.defaulted;
  }

  isYearDefault() {
    return this._year.defaulted;
  }

  isMileageDefault() {
    return this._mileage.defaulted;
  }

  reset() {
    this.resetColours();
    this.resetPrice();
    this.resetMileage();
    this.resetYear();
  }
  resetMileage() {
    this._mileage = {
      min: Math.min(...cars.map((car) => car.mileage)),
      max: Math.max(...cars.map((car) => car.mileage)),
      defaulted: true,
    };
  }
  resetYear() {
    this._year = {
      min: Math.min(...cars.map((car) => car.year)),
      max: Math.max(...cars.map((car) => car.year)),
      defaulted: true,
    };
  }
  resetPrice() {
    this._price = {
      min: Math.min(...cars.map((car) => car.price)),
      max: Math.max(...cars.map((car) => car.price)),
      defaulted: true,
    };
  }
  resetColours() {
    this._colours.list = [...new Set(cars.map((car) => car.colour))];
    this._colours.length = this._colours.list.length;
  }
}

class ColoursFilter {
  constructor() {
    this.colours = [...new Set(cars.map((car) => car.colour))];
    this.clrFltrs = document.createElement("div");
    this.clrFltrs.classList.add("clrsFlt");
    this.timer = 0;
    this.delay = 200;
    this.prevent = false;
    for (const colour of this.colours) {
      const lbl = document.createElement("label");
      lbl.for = `rd${colour}`;
      lbl.innerText = coloursData[colour];
      const inp = document.createElement("input");
      inp.colour = colour;
      inp.id = `rd${colour}`;
      inp.value = colour;
      inp.checked = true;
      inp.type = "checkbox";
      inp.onclick = (e) => {
        e.stopPropagation();
        this.timer = setTimeout(() => {
          if (!this.prevent) {
            this.fltClr(inp);
          }
          this.prevent = false;
        }, this.delay);
      };
      inp.ondblclick = (e) => {
        e.stopPropagation();
        clearTimeout(this.timer);
        this.prevent = true;
        this.fltClrs(inp);
      };
      this.clrFltrs.append(inp, lbl);
    }
  }
  fltClrs(sender) {
    if (sender.checked) {
      sender.checked = true;
      for (const element of this.clrFltrs.children) {
        if (element.type == "checkbox" && element.value != sender.value) {
          element.checked = false;
        }
      }
      filters.colour = sender.value;
      fltCars();
    } else {
      const colours = [];
      sender.checked = false;
      for (const element of this.clrFltrs.children) {
        if (element.type == "checkbox" && element.value != sender.value) {
          element.checked = true;
          colours.push(parseInt(element.value));
        }
      }
      filters.colours = colours;
      fltCars();
    }
  }

  disable(list) {
    for (const number of filters.colours) {
      for (const element of this.clrFltrs.children) {
        if (element.type == "checkbox" && element.value == number) {
          if (!list.includes(number)) {
            element.disabled = true;
          } else {
            element.disabled = false;
          }
        }
      }
    }
  }

  fltClr(sender) {
    sender.checked = !sender.checked;
    if (sender.checked) filters.addColour(sender.value);
    else filters.removeColour(sender.value);
    fltCars();
  }
  reset() {
    for (const element of this.clrFltrs.children) {
      if (element.type == "checkbox") {
        element.checked = true;
        element.disabled = false;
      }
    }
  }
}
