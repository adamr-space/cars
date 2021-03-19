const Inputs = ({ priceInputs, yearInputs, mileageInputs }) => ({
  priceInputs,
  yearInputs,
  mileageInputs,

  async init(table) {
    this.makeInputs_Labels("Price", 500, "£:");
    this.makeInputs_Labels("Year", 1, "Yr:");
    this.makeInputs_Labels("Mileage", 1, "mi:");
    this.price = this.makePropGetSet("Price");
    this.year = this.makePropGetSet("Year");
    this.mileage = this.makePropGetSet("Mileage");
    this.colours = Colours(table);
    await this.setDefaults(table);
    await this.colours.init();
  },
  makePropGetSet(type) {
    const min = document.getElementById(`input${type}Min`);
    const max = document.getElementById(`input${type}Max`);
    return {
      set minMin(val) {
        min.min = val;
      },
      set minVal(val) {
        min.value = val;
        if (min.previousValue === 0) min.previousValue = val;
      },
      set minMax(val) {
        min.max = val;
      },
      set maxMin(val) {
        max.min = val;
      },
      set maxVal(val) {
        max.value = val;
        if (max.previousValue === 0) max.previousValue = val;
      },
      set maxMax(val) {
        max.max = val;
      },
      get minMin() {
        return parseInt(min.min);
      },
      get minVal() {
        return parseInt(min.value);
      },
      get minMax() {
        return parseInt(min.max);
      },
      get maxMin() {
        return parseInt(max.min);
      },
      get maxVal() {
        return parseInt(max.value);
      },
      get maxMax() {
        return parseInt(max.max);
      },
    };
  },
  makeInputs_Labels(type, step, suffix) {
    for (const id of [`input${type}Min`, `input${type}Max`]) {
      const label = makeLabel(
        "label",
        { htmlFor: id },
        id.includes("Max") ? `Max ${suffix}` : `Min ${suffix}`
      );

      const input = makeInput("input", {
        type: "number",
        id: id,
        name: id,
        step: step,
        previousValue: 0,
      });

      this.addEvents(input);
      document
        .getElementById(this[type.toLowerCase() + "Inputs"])
        .append(label, input);
    }
  },
  addEvents(input) {
    input.reset = (e) => {
      const input = e.target;
    };
    input.onchange = (e) => {
      e.stopPropagation();
      const input = e.target;
      const { value, id } = input;
      const obj = this.getByID(id);
      const up = input.previousValue < value;
      const max = id.toLowerCase().includes("max");
      if (max) {
        if (up) {
          if (value > obj.maxMax) {
            input.value = obj.maxMax;
            return;
          }
        } else {
          if (value < obj.minVal) {
            input.value = obj.minVal;
            return;
          }
        }
      } else {
        if (up) {
          if (value > obj.maxVal) {
            input.value = obj.maxVal;
            return;
          }
        } else {
          if (value < obj.minMin) {
            input.value = obj.minMin;
            return;
          }
        }
      }
      input.previousValue = value;
      garage.filter();
    };
  },
  getByID(id) {
    id = id.toLowerCase();
    if (id.includes("price")) return this.price;
    if (id.includes("year")) return this.year;
    if (id.includes("mileage")) return this.mileage;
  },
  async setDefaults(table) {
    this.price.maxVal = Math.max.apply(Math, table.column("price:name").data());
    this.price.minVal = Math.min.apply(Math, table.column("price:name").data());
    this.year.maxVal = Math.max.apply(Math, table.column("year:name").data());
    this.year.minVal = Math.min.apply(Math, table.column("year:name").data());
    this.mileage.maxVal = Math.max.apply(
      Math,
      table.column("mileage:name").data()
    );
    this.mileage.minVal = Math.min.apply(
      Math,
      table.column("mileage:name").data()
    );
    this.price.minMin = this.price.minVal;
    this.price.minMax = this.price.maxVal;
    this.price.maxMin = this.price.minVal;
    this.price.maxMax = this.price.maxVal;
    this.year.minMin = this.year.minVal;
    this.year.minMax = this.year.maxVal;
    this.year.maxMin = this.year.minVal;
    this.year.maxMax = this.year.maxVal;
    this.mileage.minMin = this.mileage.minVal;
    this.mileage.minMax = this.mileage.maxVal;
    this.mileage.maxMin = this.mileage.minVal;
    this.mileage.maxMax = this.mileage.maxVal;
    this.colours.list = [
      ...new Set(Array.from(table.column("colour:name").data())),
    ];
    this.colours.length = this.colours.list.length;
  },
});
