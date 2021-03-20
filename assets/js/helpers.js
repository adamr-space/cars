const tableMap = {
  make: 0,
  model: 1,
  year: 2,
  colour: 3,
  mileage: 4,
  price: 5,
};

const creEL = (tag) => document.createElement(tag);

const makeElement = (tag, attributes) => {
  const element = creEL(tag);
  for (const attribute in attributes) {
    const value = attributes[attribute];
    if (typeof value !== "function") element[attribute] = value;
  }
  return element;
};

const makeFilters = () => {
  const inputs = garage.table.inputs;
  $.fn.dataTable.ext.search.push(
    (settings, searchData, index, rowData, counter) => {
      const minPrice = parseInt(inputs.price.minVal);
      const maxPrice = parseInt(inputs.price.maxVal);
      const price = parseInt(searchData[tableMap.price]) || 0;
      const minYear = parseInt(inputs.year.minVal);
      const maxYear = parseInt(inputs.year.maxVal);
      const year = parseInt(searchData[tableMap.year]) || 0;
      const minMileage = parseInt(inputs.mileage.minVal);
      const maxMileage = parseInt(inputs.mileage.maxVal);
      const mileage = parseInt(searchData[tableMap.mileage]) || 0;
      const colour = parseInt(rowData.colour);
      const colours = inputs.colours.colours;
      const make = document.getElementById("make").value.toLowerCase();
      const makes = searchData[tableMap.make].toLowerCase();
      const model = document.getElementById("model").value.toLowerCase();
      const models = searchData[tableMap.model].toLowerCase();
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
