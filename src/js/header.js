import { appendElement } from "./common.js";

// Всплывающее меню при клике на иконку
const openMenuList = () => {
  const burgerMenuIcon = document.querySelector("#burger-menu-icon");
  const navCollapse = document.querySelector("#nav-collapse");

  // Открыть меню
  burgerMenuIcon.addEventListener("click", () => {
    navCollapse.classList.contains("openMenu")
      ? navCollapse.classList.remove("openMenu")
      : (navCollapse.className = "openMenu");
  });

  // Закрыть меню
  const XIcon = document.querySelector("#x-icon");

  XIcon.addEventListener("click", () => {
    navCollapse.classList.remove("openMenu");
  });
};

// Количество найденных котов
const HeaderCetsLength = (data) => {
  const foundCats = document.querySelector("#found-cats");

  const catsLength =
    data.length === 1
      ? `Найден ${data.length} кот`
      : data.length > 1
      ? `Найдено ${data.length} котов`
      : "Ничего не найдено";

  appendElement(foundCats, "h2", [
    ["className", "weight-700"],
    ["innerText", catsLength],
  ]);
};

export { HeaderCetsLength, openMenuList };
