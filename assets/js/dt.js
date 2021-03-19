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
      language: {
        info: "Showing _START_ to _END_ of _TOTAL_ cars",
        infoEmpty: "Showing 0 to 0 of 0 cars",
        infoFiltered: "(filtered from _MAX_ total cars)",
        lengthMenu: "Show _MENU_ cars",
        loadingRecords: "Loading cars...",
        processing: "Processing cars...",
        search: "Search cars:",
        zeroRecords: "No matching cars found",
      },
      responsive: true,
      "deferRender": true,
      dom:
        "<'row'<'#" +
        this.inputs.priceInputs +
        ".col-sm col-md'><'#" +
        this.inputs.yearInputs +
        ".col-sm col-md'><'#" +
        this.inputs.mileageInputs +
        ".col-sm col-md'><'#search.col-sm col-md'f>>" +
        "<'row'<'col-sm'tr>>" +
        "<'row'<'col-sm col-md-5'i><'#reset.col-sm col-md-2'><'col-sm col-md-5'p>>",
      data: garage.cars,
      columns: [
        { data: "make", name: "make", title: "Make" },
        { data: "model", name: "model", title: "Model" },
        { data: "year", name: "year", title: "Year" },
        {
          data: "colour",
          name: "colour",
          render: (data) => 
`<div class="row">
    <div class="col clrTxt">${coloursData[data]}</div>
    <div class="col clrSample" style="color:${coloursData[
      data
    ].toLowerCase()}">◉</div>
</div>`,
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
});
