const Dt = (id) => ({
  id,
  inputs: Inputs({
    priceInputs: "toolbar1",
    yearInputs: "toolbar2",
    mileageInputs: "toolbar3",
  }),
  async make() {
    this.table = await this.init();
    await this.inputs.init(this.table);
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
        { data: "make", name: "make", title: "Make" },
        { data: "model", name: "model", title: "Model" },
        { data: "year", name: "year", title: "Year" },
        {
          data: "colour",
          name: "colour",
          render: function (data) {
            return `
<div class="row">
    <div class="col-sm clrTxt">${coloursData[data]}</div>
    <div class="col-sm clrSample" style="color:${coloursData[data].toLowerCase()}">◉</div>
</div>`;
          },
          title: "Colour",
        },
        {
          data: "mileage",
          name: "mileage",
          title: "Mileage",
          render: $.fn.dataTable.render.number(",", ".", 0, "", " mi"),
        },
        {
          data: "price",
          name: "price",
          render: $.fn.dataTable.render.number(",", ".", 0, "£"),
          title: "Price",
        },
      ],
    });
  },
  render(cars) {
    this.table.clear().rows.add(cars).draw();
  },
});
