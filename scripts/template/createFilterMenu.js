export function createFilterMenu(menu, listItems) {
  const filterSelected = document.querySelector(".filter-selected");
  const inputfilter = document.querySelector(
    `.filter .filter-header .custom-selects .custom-select .custom-select-header input.${menu}`
  );
  const resetinputFilter = document.querySelector(
    `.filter .filter-header .custom-selects .custom-select .custom-select-header .cross-select.${menu}`
  );
  const btnFilter = document.querySelectorAll(
    ".filter .filter-selected button"
  );
  const menuToFill = document.querySelector(`.${menu} ul`);
  let newListItem = [];
  newListItem.length === 0
    ? createListItem(listItems)
    : createListItem(newListItem);
  function createListItem(listItems) {
    menuToFill.innerHTML = "";
    listItems.forEach((item) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.setAttribute("src", "../../assets/icons/li-cross.svg");
      img.addEventListener("click", function (event) {
        event.stopPropagation();
      });
      li.innerHTML = item;
      li.appendChild(img);
      li.setAttribute("class", "list-filter");
      li.setAttribute("tabindex", 0);
      menuToFill.appendChild(li);
      li.addEventListener("click", (e) => {
        const btnText = e.target.textContent.trim();
        const isFilterBtn = document.getElementById(btnText);
        if (isFilterBtn) {
          isFilterBtn.remove();
        } else {
          inputfilter.value = "";
          const newBtn = document.createElement("button");
          const newImg = document.createElement("img");
          newImg.setAttribute("src", "./assets/icons/black-cross.svg");
          newBtn.textContent = btnText;
          newBtn.setAttribute("class", "filterBtn");
          newBtn.setAttribute("id", btnText);
          newBtn.appendChild(newImg);
          filterSelected.appendChild(newBtn);
          newBtn.addEventListener("click", () => {
            newBtn.remove();
          });
        }
      });
    });
  }
  btnFilter.forEach((btn) => {
    if (listItems.includes(btn.id))
      menuToFill.querySelectorAll("li").forEach((li) => {
        if (li.textContent.includes(btn.id)) {
          li.classList.add("activeSearch");
        }
      });
  });
  inputfilter.addEventListener("input", (e) => {
    newListItem = [];
    for (let i = 0; i < listItems.length; i++) {
      const matchItem = listItems[i].toLowerCase().includes(e.target.value);
      if (matchItem) newListItem.push(listItems[i]);
    }
    createListItem(newListItem);
  });
  resetinputFilter.addEventListener("click", () => {
    inputfilter.value = "";
    createListItem(listItems);
  });
}
