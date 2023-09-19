export function createFilterMenu(menu, listItems) {
  let menuToFill = document.querySelector(`.${menu} ul`);
  menuToFill.innerHTML = "";
  listItems.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", "../../assets/icons/Group 11.svg");
    li.innerHTML = item;
    li.appendChild(img);
    li.setAttribute("tabindex", 0);
    menuToFill.appendChild(li);
  });
}
