const Inputs = ({ priceInputs, yearInputs, mileageInputs }) => ({
  priceInputs,
  yearInputs,
  mileageInputs,

  init(table) {
    this.table = table;
    const args = {
      min: 0,
      max: 0,
      step: 1,
      setStep(step) {
        this.step = step;
        return this;
      },
      previousValue: 0,
      type: "number",
    };
    const variants = ["Min", "Max"];
    this.year = this.makeInputs_Labels(variants, "Year", "Yr:", args);
    this.mileage = this.makeInputs_Labels(variants, "Mileage", "mi:", args);
    this.price = this.makeInputs_Labels(variants, "Price", "£:", args.setStep(500));
    this.colours = Colours(this.table);
    this.setDefaults();
    this.colours.init();
    const resetEl = document.getElementById("reset");
    resetEl.innerHTML += `<button type="button" class="btn-sm btn-secondary">Reset All</button>`;
    resetEl.children[0].onclick = () => garage.reset();
  },
  makePropGetSet(type) {
    const min = document.getElementById(`inputMin${type}`);
    const max = document.getElementById(`inputMax${type}`);
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
  makeInputs_Labels(variants = [""], name = "", suffix = "", args = {}) {
    for (const variant of variants) {
      args.id = `input${variant}${name}`;
      const label = makeElement("label", {
        htmlFor: args.id,
        innerHTML: `${variant} ${suffix}`,
      });
      const input = makeElement("input", args);
      this.addEvents(input);
      document.getElementById(this[name.toLowerCase() + "Inputs"]).append(label, input);
    }
    return this.makePropGetSet(name); //create setters and getters for inputs, return created set/get object
  },
  addEvents(input) {
    //add event onchange to element
    input.onchange = (e) => {
      //assign code to onchange event
      e.stopPropagation(); //stop bubling
      garage.filter(); //method call to filter results
    };
  },

  adjustFilters() {
    //setting new min/max for inputs based on filtered table data
    const filter = { search: "applied" }; //create filter condition
    for (const element of ["price", "year", "mileage"]) {
      //iterate over array of strings matching columns
      const data = this.table.columns(`${element}:name`, filter).data()[0]; //get data for matched and filtered column
      this[element].maxVal = Math.max.apply(Math, data); //get max value for filtered data and assign to element property
      this[element].minVal = Math.min.apply(Math, data); //get min value for filtered data and assign to element property
    }
  },

  setDefaults() {
    //set defaults for inputs
    for (const element of ["price", "year", "mileage"]) {
      //iterate over array of strings matching columns
      const data = this.table.columns(`${element}:name`).data()[0]; //get data for matched column
      this[element].maxVal = Math.max.apply(Math, data); //get max value for data and assign to element property
      this[element].minVal = Math.min.apply(Math, data); //get min value for data and assign to element property
      this[element].minMin = this[element].maxMin = this[element].minVal; //set properites of two elements to match min value
      this[element].minMax = this[element].maxMax = this[element].maxVal; //set properites of two elements to match max value
    }
    this.colours.list = [
      //get sorted array of unique colours from dataset
      ...new Set(this.table.columns("colour:name").data()[0]),
    ].sort();
    // this.colours.length = this.colours.list.length;
    document.getElementById("make").value = ""; //null make input
    document.getElementById("model").value = ""; //null model input
    this.table.search(""); //null table search input
  },
});
