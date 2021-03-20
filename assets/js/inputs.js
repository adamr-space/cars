const Inputs = ({ priceInputs, yearInputs, mileageInputs }) => ({
  priceInputs,
  yearInputs,
  mileageInputs,

  async init(table) {
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
    this.makeInputs_Labels(["Min", "Max"], "Year", "Yr:", args);
    this.makeInputs_Labels(["Min", "Max"], "Mileage", "mi:", args);
    this.makeInputs_Labels(["Min", "Max"], "Price", "£:", args.setStep(500));
    this.price = this.makePropGetSet("Price");
    this.year = this.makePropGetSet("Year");
    this.mileage = this.makePropGetSet("Mileage");
    this.colours = Colours(this.table);
    await this.setDefaults();
    await this.colours.init();
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
      const id = `input${variant}${name}`;
      args.id = id;
      const label = makeElement("label", {
        htmlFor: id,
        innerHTML: `${variant} ${suffix}`,
      });
      const input = makeElement("input", args);
      this.addEvents(input);
      document
        .getElementById(this[name.toLowerCase() + "Inputs"])
        .append(label, input);
    }
  },
  addEvents(input) {
    input.onchange = (e) => {
      e.stopPropagation();
      garage.filter();
    };
  },

  adjustFilters() {
    const filter = { search: "applied" };
    for (const element of ["price", "year", "mileage"]) {
      const data = this.table.columns(`${element}:name`, filter).data()[0];
      this[element].maxVal = Math.max.apply(Math, data);
      this[element].minVal = Math.min.apply(Math, data);
    }
  },

  async setDefaults() {
    for (const element of ["price", "year", "mileage"]) {
      const data = this.table.columns(`${element}:name`).data()[0];
      this[element].maxVal = Math.max.apply(Math, data);
      this[element].minVal = Math.min.apply(Math, data);
      this[element].minMin = this[element].maxMin = this[element].minVal;
      this[element].minMax = this[element].maxMax = this[element].maxVal;
    }
    this.colours.list = [
      ...new Set(this.table.columns("colour:name").data()[0]),
    ];
    this.colours.length = this.colours.list.length;
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    this.table.search("");
  },
});
