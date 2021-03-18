const Inputs = ({ priceToolbar, yearToolbar, mileageToolbar }) => ({
  priceToolbar,
  yearToolbar,
  mileageToolbar,
  init() {
    // const calls = []
    // for (const key in {
    //   price: { txt: "Price", step: 500, lbl: "£:",col:5 },
    //   price: { txt: "Year", step: 1, lbl: "Yr:",col:2 },
    //   price: { txt: "Mileage", step: 500, lbl: "mi:",col:4 },
    // }) {
    //   const element = object[key];
    //   const callBack = async () => {
    //     await this.genInputs(element.txt, element.step, element.lbl);
    //     this[element.txt.toLowerCase()] = await this.generateProperties(element.txt);
    //     this[element.txt.toLowerCase()].maxVal = Math.max.apply(Math, dt.dt.column(element.col).data());
    //     this[element.txt.toLowerCase()].minVal = Math.min.apply(Math, dt.dt.column(element.col).data());
    //   };
    //   calls.push(callBack)
    // }
    const genPriceInputs = async () => {
      await this.genInputs("Price", 500, "£:");
      this.price = await this.generateProperties("Price");
      this.price.maxVal = Math.max.apply(Math, dt.dt.column(5).data());
      this.price.minVal = Math.min.apply(Math, dt.dt.column(5).data());
    };
    const genYearInputs = async () => {
      await this.genInputs("Year", 1, "Yr:");
      this.year = await this.generateProperties("Year");
      this.year.maxVal = Math.max.apply(Math, dt.dt.column(2).data());
      this.year.minVal = Math.min.apply(Math, dt.dt.column(2).data());
    };
    const genMilageInputs = async () => {
      await this.genInputs("Mileage", 1, "mi:");
      this.mileage = await this.generateProperties("Mileage");
      this.mileage.maxVal = Math.max.apply(Math, dt.dt.column(4).data());
      this.mileage.minVal = Math.min.apply(Math, dt.dt.column(4).data());
    };
    // calls.forEach(call)=>
    genYearInputs();
    genPriceInputs();
    genMilageInputs();
  },
  async generateProperties(type) {
    const min = document.getElementById(`input${type}Min`);
    const max = document.getElementById(`input${type}Max`);
    return {
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
    };
  },
  async genInputs(type, step, txt) {
    [`input${type}Min`, `input${type}Max`].forEach((id) => {
      const lbl = this.makeLbl(
        "label",
        { htmlFor: id },
        id.includes("Max") ? `Max ${txt}` : `Min ${txt}`
      );
      const inp = this.makeInp("input", {
        type: "number",
        id: id,
        name: id,
        min: 1000,
        max: 100000,
        step: step,
        value: 10000,
      });
      document
        .getElementById(this[type.toLowerCase() + "Toolbar"])
        .append(lbl, inp);
    });
  },
  makeLbl(tag, attrs, txt) {
    const lbl = document.createElement(tag);
    lbl.innerHTML = txt;
    for (const key in attrs) {
      lbl[key] = attrs[key];
    }
    return lbl;
  },
  makeInp(tag, attrs) {
    const inp = document.createElement(tag);
    for (const key in attrs) {
      inp[key] = attrs[key];
    }
    return inp;
  },
});

const inputs = Inputs({
  priceToolbar: "toolbar1",
  yearToolbar: "toolbar2",
  mileageToolbar: "toolbar3",
});

const Dt = ({ id }) => ({
  id,
  dt: {},
  make() {
    this.init().then((table) => {
      this.dt = table;
      this.makeBar();
    });
  },
  async init() {
    return await $("#" + this.id).DataTable({
      dom:
        "<'row'<'#toolbar1.col-sm-12 col-md'><'#toolbar2.col-sm-12 col-md'><'#toolbar3.col-sm-12 col-md'><'col-sm-12 col-md'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      // dom: '<lf>rtip',
      // buttons: [
      //   {
      //     text: "My button",
      //     action: function (e, dt, node, config) {
      //       alert("Button activated");
      //     },
      //   },
      // ],
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
  makeBar() {
    inputs.init();
    // maxAge.value = maxYr.value - minYr.value;
  },
});
