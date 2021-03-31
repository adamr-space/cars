const tableMap = {
  //helper object with column numbers referenced by name
  make: 0,
  model: 1,
  year: 2,
  colour: 3,
  mileage: 4,
  price: 5,
};

const creEL = (tag) => document.createElement(tag); //helper function to create element for passed tag

const makeElement = (tag, attributes) => {
  //helper function to create element for passed tag and assign passed attributes
  const element = creEL(tag); //call helper function
  for (const attribute in attributes) {
    //iterate ofver attributes
    const value = attributes[attribute]; //get value of attribute
    if (typeof value !== "function") element[attribute] = value; //create attribute with value only if it is not a function
  }
  return element; //return created element
};

const createFilterEvents = () => {
  //function applying filtering on table once input controls are edited
  const inputs = garage.table.inputs; //get inputs from the table object
  $.fn.dataTable.ext.search.push(
    //register search on table element as soon as any of the below inputs value is changed
    (settings, searchData, index, rowData, counter) => {
      //use searchData and rowData from table to get record values
      const minPrice = parseInt(inputs.price.minVal); //get filter settings from input controls
      const maxPrice = parseInt(inputs.price.maxVal); //get filter settings from input controls
      const price = parseInt(searchData[tableMap.price]) || 0; //get record from table
      const minYear = parseInt(inputs.year.minVal); //get filter settings from input controls
      const maxYear = parseInt(inputs.year.maxVal); //get filter settings from input controls
      const year = parseInt(searchData[tableMap.year]) || 0; //get record from table
      const minMileage = parseInt(inputs.mileage.minVal); //get filter settings from input controls
      const maxMileage = parseInt(inputs.mileage.maxVal); //get filter settings from input controls
      const mileage = parseInt(searchData[tableMap.mileage]) || 0;
      const colour = parseInt(rowData.colour); //get record from table
      const colours = inputs.colours.colours; //get filter settings from input controls
      const make = document.getElementById("make").value.toLowerCase(); //get filter settings from input controls
      const makes = searchData[tableMap.make].toLowerCase(); //get record from table
      const model = document.getElementById("model").value.toLowerCase(); //get filter settings from input controls
      const models = searchData[tableMap.model].toLowerCase(); //get record from table
      if (
        //check if record meets conditions
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
        return true; //if yes return true for record to be included
      }
      return false; //else return false for record to be excluded
    }
  );
};
