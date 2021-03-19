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
