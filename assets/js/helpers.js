const tableMap = {
  make: 0,
  model: 1,
  year: 2,
  colour: 3,
  mileage: 4,
  price: 5,
};

const creEL = (tag) => document.createElement(tag);

const makeLabel = (tag, attributes, suffix) => {
  const label = document.createElement(tag);
  label.innerHTML = suffix;
  for (const attribute in attributes) {
    label[attribute] = attributes[attribute];
  }
  return label;
};
const makeInput = (tag, attributes) => {
  const input = document.createElement(tag);
  for (const attribute in attributes) {
    input[attribute] = attributes[attribute];
  }
  return input;
};

const makeFilters = () => {
  $.fn.dataTable.ext.search.push(
    (settings, searchData, index, rowData, counter) => {
      const minPrice = parseInt(garage.table.inputs.price.minVal);
      const maxPrice = parseInt(garage.table.inputs.price.maxVal);
      const price = parseInt(searchData[tableMap.price]) || 0;
      const minYear = parseInt(garage.table.inputs.year.minVal);
      const maxYear = parseInt(garage.table.inputs.year.maxVal);
      const year = parseInt(searchData[tableMap.year]) || 0;
      const minMileage = parseInt(garage.table.inputs.mileage.minVal);
      const maxMileage = parseInt(garage.table.inputs.mileage.maxVal);
      const mileage = parseInt(searchData[tableMap.mileage]) || 0;
      const colour = parseInt(rowData.colour);
      const colours = garage.table.inputs.colours.colours;
      const make = document.getElementById('make').value.toLowerCase()
      const makes = searchData[tableMap.make].toLowerCase()
      const model = document.getElementById('model').value.toLowerCase()
      const models = searchData[tableMap.model].toLowerCase()
      if (
        minPrice <= price &&
        price <= maxPrice &&
        minYear <= year &&
        year <= maxYear &&
        minMileage <= mileage &&
        mileage <= maxMileage &&
        mileage <= maxMileage &&
        makes.includes(make) &&
        models.includes(model) &&
        colours.includes(colour)
      ) {
        return true;
      }
      return false;
    }
  );

};

