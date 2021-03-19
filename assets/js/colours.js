const Colours = (table) => {
  return {
    div: document.getElementById("colours"),
    altPressed: false,

    async init() {
      this.div.classList.add("coloursFilter");
      this.makeInputs_Labels();
    },
    set colour(colour) {
      colour = parseInt(colour);
      this.list = [colour];
    },
    set colours(colours) {
      this.list = colours;
    },
    get colours() {
      return this.list;
    },
    makeInputs_Labels() {
      for (const colour of this.list) {
        const id = `radio${colour}`;
        const label = makeLabel(
          "label",
          { htmlFor: id },
          coloursData[colour],
          (innerText = coloursData[colour])
        );

        const input = makeInput("input", {
          type: "checkbox",
          id: id,
          name: id,
          colour: colour,
          value: colour,
          checked: true,
        });

        this.addEvents(input);
        this.div.append(label, input);
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "Alt") this.altPressed = true;
      });

      document.addEventListener("keyup", (e) => {
        if (e.key === "Alt") this.altPressed = false;
      });
    },
    addEvents(input) {
      input.onclick = (e) => {
        e.stopPropagation();
        if (this.altPressed) this.filterColours(input);
        else this.filterColour(input);
      };
    },
    addColour(colour) {
      colour = parseInt(colour);
      if (!this.hasColour(colour)) this.list.push(colour);
    },
    removeColour(colour) {
      colour = parseInt(colour);
      const index = this.list.indexOf(colour);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    },
    hasColour(colour) {
      colour = parseInt(colour);
      return this.list.includes(colour);
    },
    filterColours(sender) {
      if (sender.checked) {
        sender.checked = true;
        for (const element of this.div.children) {
          if (element.type == "checkbox" && element.value != sender.value) {
            element.checked = false;
          }
        }
        this.colour = sender.value;
        garage.filter();
      } else {
        const colours = [];
        sender.checked = false;
        for (const element of this.div.children) {
          if (element.type == "checkbox" && element.value != sender.value) {
            element.checked = true;
            colours.push(parseInt(element.value));
          }
        }
        this.colours = colours;
        garage.filter();
      }
    },

    filterColour(sender) {
      if (sender.checked) this.addColour(sender.value);
      else this.removeColour(sender.value);
      garage.filter();
    },
    disable() {
      const filteredColours = [
        ...new Set(
          table.columns("colour:name", { search: "applied" }).data()[0]
        ),
      ];
      for (const number of this.colours) {
        for (const element of this.div.children) {
          if (element.type == "checkbox" && element.value == number) {
            if (!filteredColours.includes(number)) {
              element.disabled = true;
            } else {
              element.disabled = false;
            }
          }
        }
      }
    },
    reset() {
      this.list = [...new Set(table.columns("colour:name").data()[0])];
      this.length = this.list.length;

      for (const element of this.div.children) {
        if (element.type == "checkbox") {
          element.checked = true;
          element.disabled = false;
        }
      }
    },
  };
};
