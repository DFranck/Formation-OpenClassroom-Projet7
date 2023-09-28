export function createFilterMenu(menu, listItems) {
  let btnFilter= document.querySelectorAll('.filter .filter-selected button')
  let menuToFill = document.querySelector(`.${menu} ul`);
  menuToFill.innerHTML = "";
  listItems.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", "../../assets/icons/li-cross.svg");
    li.innerHTML = item;
    li.appendChild(img);
    li.setAttribute('class', 'list-filter')
    li.setAttribute("tabindex", 0);
    menuToFill.appendChild(li);
  });
  btnFilter.forEach((btn)=>{
    if (listItems.includes(btn.id))
    menuToFill.querySelectorAll('li').forEach((li)=>{
      if(li.textContent.includes(btn.id)){
        li.classList.add('activeSearch')
      }
    })
  })
  console.log();
}
