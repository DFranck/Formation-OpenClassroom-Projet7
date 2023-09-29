
export const toggleFilter = () => {
  
  const inputSearch = document.getElementById("searchBar");
  const filterMenu = document.querySelectorAll(".custom-select ul");
  const newEvent = new Event("filterChange");
  const selectBtn = document.querySelectorAll(".custom-select-header button");
  const ingredientsFilter = document.querySelectorAll(
    ".custom-select .ingredients"
  );
  const devicesFilter = document.querySelectorAll(".custom-select .devices");
  const utensilsFilter = document.querySelectorAll(".custom-select .utensils");
  let isIngredientsOpen = false;
  let isDevicesOpen = false;
  let isUtensilsOpen = false;
  let chevronDown;
  let chevronUp;
  selectBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const whichBtn = e.target.id;

      if (whichBtn === "ingredients") {
        chevronDown = document.querySelector(`#${whichBtn} .chevron-down`);
        chevronUp = document.querySelector(`#${whichBtn} .chevron-up`);
        if (isIngredientsOpen) {
          closeFilterMenu(whichBtn);
        } else {
          openFilterMenu(whichBtn);
        }
      } else if (whichBtn === "devices") {
        chevronDown = document.querySelector(`#${whichBtn} .chevron-down`);
        chevronUp = document.querySelector(`#${whichBtn} .chevron-up`);
        if (isDevicesOpen) {
          closeFilterMenu(whichBtn);
        } else {
          openFilterMenu(whichBtn);
        }
      } else if (whichBtn === "utensils") {
        chevronDown = document.querySelector(`#${whichBtn} .chevron-down`);
        chevronUp = document.querySelector(`#${whichBtn} .chevron-up`);
        if (isUtensilsOpen) {
          closeFilterMenu(whichBtn);
        } else {
          openFilterMenu(whichBtn);
        }
      }
    });
  });
  const openFilterMenu = (whichBtn) => {
    if (whichBtn === "ingredients" && !isIngredientsOpen) {
      isIngredientsOpen = true;
      chevronDown.style.opacity = 0;
      chevronUp.style.opacity = 1;
      ingredientsFilter.forEach((elem) => {
        elem.style.display = "block";
      });
    } else if (whichBtn === "devices" && !isDevicesOpen) {
      isDevicesOpen = true;
      chevronDown.style.opacity = 0;
      chevronUp.style.opacity = 1;
      devicesFilter.forEach((elem) => {
        elem.style.display = "block";
      });
    } else if (whichBtn === "utensils" && !isUtensilsOpen) {
      isUtensilsOpen = true;
      chevronDown.style.opacity = 0;
      chevronUp.style.opacity = 1;
      utensilsFilter.forEach((elem) => {
        elem.style.display = "block";
      });
    }
  };
  function closeFilterMenu(whichBtn) {
    if (whichBtn === "ingredients" && isIngredientsOpen) {
      isIngredientsOpen = false;
      chevronDown.style.opacity = 1;
      chevronUp.style.opacity = 0;
      ingredientsFilter.forEach((elem) => {
        elem.style.display = "none";
      });
    } else if (whichBtn === "devices" && isDevicesOpen) {
      isDevicesOpen = false;
      chevronDown.style.opacity = 1;
      chevronUp.style.opacity = 0;
      devicesFilter.forEach((elem) => {
        elem.style.display = "none";
      });
    } else if (whichBtn === "utensils" && isUtensilsOpen) {
      isUtensilsOpen = false;
      chevronDown.style.opacity = 1;
      chevronUp.style.opacity = 0;
      utensilsFilter.forEach((elem) => {
        elem.style.display = "none";
      });
    }
  }
  function refreshBtnList() {
    const btnList = [
      ...document.querySelectorAll(".filter .filter-selected button"),
    ];
    btnList.forEach((btn) => {
      btn.removeEventListener("click", onBtnClick);
    });
    btnList.forEach((btn) => {
      btn.addEventListener("click", onBtnClick);
    });
  }
  function onBtnClick() {
    document.dispatchEvent(newEvent);
  }
  filterMenu.forEach((li) => {
    li.addEventListener("click", () => {
      document.dispatchEvent(newEvent);
      refreshBtnList()
    });
  });
  inputSearch.addEventListener("input", () => {
    document.dispatchEvent(newEvent);
  });
};
