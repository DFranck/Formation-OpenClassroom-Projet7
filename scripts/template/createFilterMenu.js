export function createFilterMenu(menu, listItems) {
  let menuToFill = document.querySelector(`.${menu} ul`);
  menuToFill.innerHTML = "";
  listItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    menuToFill.appendChild(li);
  });
}
