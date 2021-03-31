const Colours = (table) => {
  //colours object with checkboxes
  return {
    div: document.getElementById("colours"), //get div element for hosting colours
    altPressed: false, //set default bool for key pressed

    init() {
      //initialise colour inputs
      this.div.classList.add("coloursFilter"); //add class coloursFilter to div
      this.makeInputs_Labels(); //method call
    },
    set colour(colour) {
      //setter for single colour
      colour = parseInt(colour); //make sure it is integer
      this.list = [colour]; //assign value of colour to list with one element
    },
    set colours(colours) {
      //setter for colours
      this.list = colours; //assing colours list to list
    },
    get colours() {
      //getter for colours
      return this.list; //return list of colours
    },
    makeInputs_Labels() {
      //method to generate inputs and labels elements
      for (const colour of this.list) {
        //iterate over colours list
        const id = `radio${colour}`; //make id from prefix and colour
        const label = makeElement("label", {
          //call method to make label element with arguments
          htmlFor: id,
          innerText: coloursData[colour],
        });

        const input = makeElement("input", {
          //call method to make input element with arguments
          type: "checkbox",
          id: id,
          name: id,
          colour: colour,
          value: colour,
          checked: true,
        });

        this.addEvents(input); //method call
        this.div.append(label, input); //method call
      }
      document.addEventListener("keydown", (e) => {
        //event listener for handling Alt key being hold
        if (e.key === "Alt") this.altPressed = true;
      });

      document.addEventListener("keyup", (e) => {
        //event listener for releasing Alt key
        if (e.key === "Alt") this.altPressed = false;
      });
    },
    addEvents(input) {
      //adding event to input element
      input.onclick = (e) => {
        //onclick element method
        e.stopPropagation(); //stop bubling
        if (this.altPressed) this.filterColours(input);
        //check if Alt key is being held down, if it is call method to filter colours based on input value
        else this.filterColour(input); //else call method to filter single colour based on input value
      };
    },
    addColour(colour) {
      //method for adding colour to list
      colour = parseInt(colour); //make sure it is integer
      if (!this.hasColour(colour)) this.list.push(colour); //if list has no such colour, add it
    },
    removeColour(colour) {
      //method for removine colour from list
      colour = parseInt(colour); //make sure it is integer
      const index = this.list.indexOf(colour); //get index position in the list
      if (index > -1) {
        //if index found...
        this.list.splice(index, 1); //remove element from the list
      }
    },
    hasColour(colour) {
      //method checking if list contains colour
      colour = parseInt(colour); //make sure it is integer
      return this.list.includes(colour); //return check result
    },
    filterColours(sender) {
      //method filtering colours
      if (sender.checked) {
        //checking state of checkbox
        sender.checked = true; //make sure that checkbox is still checked after clicking it
        for (const element of this.div.children) {
          //iterate over colours of div children elements
          if (element.type == "checkbox" && element.value != sender.value) {
            //checking element type and value, if value is not the same as clicked element...
            element.checked = false; //...uncheck element
          }
        }
        this.colour = sender.value; //call setter to set colour to single value
        garage.filter(); //call method to filter results
      } else {
        //if checkbox wasn't checked when control was clicked
        const colours = []; //create empty array
        sender.checked = false; //make sure that checkbox remains unchecked
        for (const element of this.div.children) {
          //iterate over colours of div children elements
          if (element.type == "checkbox" && element.value != sender.value) {
            //checking element type and value, if value is not the same as clicked element...
            element.checked = true; //...check element
            colours.push(parseInt(element.value)); //add colour to array
          }
        }
        this.colours = colours; //call setter to set colours to array of colours
        garage.filter(); //call method to filter results
      }
    },

    filterColour(sender) {
      //method to filter single colour
      if (sender.checked) this.addColour(sender.value);
      //if element is checked call method to add single colour
      else this.removeColour(sender.value); //else call method to remove single colour from the list
      garage.filter(); //call method to filter results
    },
    disable() {
      //method to disable checkbox element
      const filteredColours = [
        //create new list of unique colours remaining after filter was applied
        ...new Set(
          table.columns("colour:name", { search: "applied" }).data()[0] //create array from set of unique values, from filtered results of colours column
        ),
      ];
      for (const number of this.colours) {
        //iterate over colours of colours list
        for (const element of this.div.children) {
          //iterate over colours of div children elements
          if (element.type == "checkbox" && element.value == number) {
            //if elemnt is checkbox and value is matching current colour...
            if (!filteredColours.includes(parseInt(number))) {
              //...and colour is filtered out...
              element.disabled = true; //... disable this element
            } else {
              element.disabled = false; //...otherwise enable it
            }
          }
        }
      }
    },
    reset() {
      //method reseting coulrs filter
      this.list = [...new Set(table.columns("colour:name").data()[0])]; //get all unique colours from all cars
      // this.length = this.list.length;//set length property to be equal to colours list length, if at any point list length differs from it we know colours are filtered

      for (const element of this.div.children) {
        //iterate over colours of div children elements...
        if (element.type == "checkbox") {
          //make sure elements are checkboxes
          element.checked = true; //check element
          element.disabled = false; //enable element
        }
      }
    },
  };
};
