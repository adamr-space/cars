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
        ".col-3'><'#" +
        this.inputs.yearInputs +
        ".col-3'><'#" +
        this.inputs.mileageInputs +
        ".col-3'><'#search.col-3'f>>" +
        "<'row'<'col-sm'tr>>" +
        "<'row'<'col-sm col-md-5'i>" +
        "<'#reset.col-sm col-md-2'><'col-sm col-md-5'p>>",
      data: garage.cars,
      ...tableSettings,
    });
  },
});
