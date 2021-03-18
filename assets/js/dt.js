const Inputs = ({ priceInputs, yearInputs, mileageInputs }) => ({
  priceInputs,
  yearInputs,
  mileageInputs,
  async init(table) {
    await this.makeInputs_Labels("Price", 500, "£:");
    await this.makeInputs_Labels("Year", 1, "Yr:");
    await this.makeInputs_Labels("Mileage", 1, "mi:");
    this.price = await this.makePropGetSet("Price");
    this.year = await this.makePropGetSet("Year");
    this.mileage = await this.makePropGetSet("Mileage");
    this.setDefaults(table);
  },
  async makePropGetSet(type) {
    return new Promise((resolve) => {
      const min = document.getElementById(`input${type}Min`);
      const max = document.getElementById(`input${type}Max`);
      resolve({
        set minMin(val) {
          min.min = val;
        },
        set minVal(val) {
          min.value = val;
        },
        set minMax(val) {
          min.max = val;
        },
        set maxMin(val) {
          max.min = val;
        },
        set maxVal(val) {
          max.value = val;
        },
        set maxMax(val) {
          max.max = val;
        },
        get minMin() {
          return min.min;
        },
        get minVal() {
          return min.value;
        },
        get minMax() {
          return min.max;
        },
        get maxMin() {
          return max.min;
        },
        get maxVal() {
          return max.value;
        },
        get maxMax() {
          return max.max;
        },
      });
    });
  },
  async makeInputs_Labels(type, step, suffix) {
    for (const id of [`input${type}Min`, `input${type}Max`]) {
      const label = await this.makeLabel(
        "label",
        { htmlFor: id },
        id.includes("Max") ? `Max ${suffix}` : `Min ${suffix}`
      );

      const input = await this.makeInput("input", {
        type: "number",
        id: id,
        name: id,
        step: step,
      });

      await this.addEvents(input);
      document
        .getElementById(this[type.toLowerCase() + "Inputs"])
        .append(label, input);
    }
  },
  async addEvents(input) {
    input.reset = (e) => {
      const input = e.target;
    };
    input.onchange = (e) => {
      e.stopPropagation();
      const input = e.target;
      let value = parseInt(input.value);
      let min = parseInt(input.min);
      let max = parseInt(input.max);
      if (value > max || value < min) {
        input.focus();
        input.id.toLowerCase().includes("max")
          ? (input.value = input.max)
          : (input.value = input.min);
      } else {
        // const type = input.id
        //   .substring(5)
        //   .replace(/(min|max)/i, "");
        // console.log(type, input.id.slice(-3).toLowerCase());
        // filters[`${input.id.slice(-3).toLowerCase()}${type}`] = value;
        garage.filter();
      }
    };
  },
  async makeLabel(tag, attributes, suffix) {
    const label = document.createElement(tag);
    label.innerHTML = suffix;
    for (const attribute in attributes) {
      label[attribute] = attributes[attribute];
    }
    return label;
  },
  async makeInput(tag, attributes) {
    const input = document.createElement(tag);
    for (const attribute in attributes) {
      input[attribute] = attributes[attribute];
    }
    return input;
  },
  setDefaults(table) {
    this.price.maxVal = Math.max.apply(Math, table.column(5).data());
    this.price.minVal = Math.min.apply(Math, table.column(5).data());
    this.year.maxVal = Math.max.apply(Math, table.column(2).data());
    this.year.minVal = Math.min.apply(Math, table.column(2).data());
    this.mileage.maxVal = Math.max.apply(Math, table.column(4).data());
    this.mileage.minVal = Math.min.apply(Math, table.column(4).data());
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
  },
});

const Dt = ({ id }) => ({
  id,
  inputs: Inputs({
    priceInputs: "toolbar1",
    yearInputs: "toolbar2",
    mileageInputs: "toolbar3",
  }),
  table: {},
  make() {
    this.table = this.init().then((table) => {
      this.table = table;
      this.inputs.init(this.table);
    });
  },
  async init() {
    return $("#" + this.id).DataTable({
      dom:
        "<'row'<'#" +
        this.inputs.priceInputs +
        ".col-sm-12 col-md'><'#" +
        this.inputs.yearInputs +
        ".col-sm-12 col-md'><'#" +
        this.inputs.mileageInputs +
        ".col-sm-12 col-md'><'col-sm-12 col-md'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      data: garage.cars,
      columns: [
        { data: "make", title: "Make" },
        { data: "model", title: "Model" },
        { data: "year", title: "Year" },
        {
          data: "colour",
          render: function (data) {
            return (
              coloursData[data] +
              `\t\t\t\t<span class="clrSample" style="color:${coloursData[
                data
              ].toLowerCase()}">◉</span>`
            );
          },
          title: "Colour",
        },
        {
          data: "mileage",
          title: "Mileage",
          render: $.fn.dataTable.render.number(",", ".", 0, "", " mi"),
        },
        {
          data: "price",
          render: $.fn.dataTable.render.number(",", ".", 0, "£"),
          title: "Price",
        },
      ],
    });
  },
});
