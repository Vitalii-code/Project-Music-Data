import { getUserIDs } from "./data.mjs";

export const countUsers = () => getUserIDs().length;

export function populateSelector(selector, data) {
  if (!Array.isArray(data)) {
    throw new TypeError("populateSelector: data must be an array");
  }

  data.map((element, i) => {
    let opt = document.createElement("option");
    opt.value = i; // the index
    opt.innerHTML = element;
    selector.append(opt);
  });
}
