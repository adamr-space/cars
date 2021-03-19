const Colours = (table) => {
  return {
    div: document.getElementById("colours"),
    timer: 0,
    delay: 200,
    prevent: false,

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
    },
    addEvents(input) {
      input.onclick = (e) => {
        e.stopPropagation();
        this.timer = setTimeout(() => {
          if (!this.prevent) {
            this.filterColour(input);
          }
          this.prevent = false;
        }, this.delay);
        console.table([
          ["timer", "delay", "prevent"],
          [this.timer, this.delay, this.prevent],
        ]);
      };
      input.ondblclick = (e) => {
        e.stopPropagation();
        clearTimeout(this.timer);
        this.prevent = true;
        this.filterColours(input);
      };
    },
    addColour(colour) {
      colour = parseInt(colour);
      if (!this.hasColour(colour)) this.list.push(colour);
    },
    removeColour(colour) {
      colour = parseInt(colour);
      const index = this.list.indexOf(colour);
      console.log(index);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    },
    hasColour(colour) {
      colour = parseInt(colour);
      return this.list.includes(colour);
    },
    isColoursDefault() {
      return this.list.length == this.length;
    },
    reset() {
      this.list = [...new Set(Array.from(table.column("colour:name").data()))];
      this.length = this.list.length;
    },
    filterColours(sender) {
      if (!sender.checked) {
        // sender.checked = true;
        for (const element of this.div.children) {
          if (element.type == "checkbox" && element.value != sender.value) {
            element.checked = false;
          }
        }
        this.colour = sender.value;
        garage.filter();
      } else {
        const colours = [];
        // sender.checked = false;
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
    disable(list) {
      for (const number of this.colours) {
        for (const element of this.div.children) {
          if (element.type == "checkbox" && element.value == number) {
            if (!list.includes(number)) {
              element.disabled = true;
            } else {
              element.disabled = false;
            }
          }
        }
      }
    },

    filterColour(sender) {
      if (sender.checked) this.addColour(sender.value);
      else this.removeColour(sender.value);
      garage.filter();
    },
    reset() {
      for (const element of this.div.children) {
        if (element.type == "checkbox") {
          element.checked = true;
          element.disabled = false;
        }
      }
    },
  };
};
