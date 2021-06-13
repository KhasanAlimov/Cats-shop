import { HeaderCetsLength, openMenuList } from "./header.js";
import Content from "./content.js";

openMenuList();

// Получение данных json
const dataPath = "static/data.json";

fetch(dataPath)
  .then((res) => res.json())
  .then((data) => {
    HeaderCetsLength(data);

    Content(data);

  })
  .catch((e) => {
    console.log(e);
  });

// Кнопка на верх
const toTop = document.querySelector("#to-top");

window.onscroll = () => {
  if (window.scrollY > 500) {
    toTop.classList.add("show-scroll-top");
  } else {
    toTop.classList.remove("show-scroll-top");
  }
};

toTop.addEventListener("click", () => {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    window.scrollTo(0, 0);
  }
});
