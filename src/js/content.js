import { alerts, appendElement } from "./common.js";

const Content = (data) => {
  const productsBlock = document.querySelector("#products");

  const sortingData = (sortableData) => {
    sortableData.forEach((cats) => {
      const card = appendElement(productsBlock, "div", [
        ["className", "card"],
        [
          "innerHTML",
          `<img src="assets/img/${cats.img}" class="top-card-img" alt="Коричневая полосата кошка">`,
        ],
      ]);

      const cardTop = appendElement(card, "div", [["className", "card-top"]]);

      // Добавление акций на продукты
      const stock = cats.stock !== "" ? `<span>-${cats.stock}%</span>` : "";

      cardTop.innerHTML = `
          <div class="stock">
            ${stock}
          </div>
        `;

      // Добавление кнопки нравится
      const likeBlock = appendElement(cardTop, "div", [["className", "like"]]),
        like = appendElement(likeBlock, "i", [
          ["className", "bi bi-heart-fill"],
        ]);
      like.style.opacity = "0.6";

      // Событие при клике на серце
      like.addEventListener("click", () => {
        if (like.style.opacity === "0.6") {
          like.style.opacity = "1";
          alerts("Добавлено в избранные", "alert success-alert");
        } else {
          like.style.opacity = "0.6";
          alerts("Удалено из избранных", "alert warning-alert");
        }
      });

      const cardBody = appendElement(card, "div", [["className", "card-body"]]);

      cardBody.innerHTML = `
            <h2 class="card-title">Кот ${cats.typeOfCat}</h2>
            <div class="properties">
              <span>
                <p>${cats.color}</p>
                <p>окрас</p>
              </span>
              <span>
                <p>${cats.age} мес</p>
                <p>Возраст</p>
              </span>
              <span>
                <p>${cats.numberOfLegs}</p>
                <p>Кол-во лап</p>
              </span>
            </div>
            <h2 class="price">${cats.price} руб.</h2>
        `;

      // Кнопка купить
      const buyButton = appendElement(card, "button", [
        ["className", "btn"],
        ["innerText", "Купить"],
      ]);

      buyButton.addEventListener("click", () => {
        if (buyButton.innerText === "Купить") {
          buyButton.style.background = "#1F2021";
          buyButton.innerText = "Продан";
        } else {
          buyButton.style.background = "#6EBBD3";
          buyButton.innerText = "Купить";
        }
      });
    });
  };

  // Сортировка
  const sortByPrice = document.querySelector("#sort_by_price"),
    sortByAge = document.querySelector("#sort_by_age");

  const sort = (mainData, select, byItem) => {
    const Ascending = [...mainData].sort((a, b) =>
        eval(`a.${byItem} - b.${byItem}`)
      ),
      Descending = [...mainData].sort((a, b) =>
        eval(`b.${byItem} - a.${byItem}`)
      );

    select.addEventListener("change", () => {
      switch (select.value) {
        case `${byItem}_ascending`:
          productsBlock.innerHTML = "";
          sortingData(Ascending);
          break;

        case `${byItem}_descending`:
          productsBlock.innerHTML = "";
          sortingData(Descending);
          break;

        default:
          sortingData(mainData);
          break;
      }
    });
  };

  // Показать ещё
  let amountData = 0,
    pieceOfData;

  let showMoreBLock, showMoreButton;

  if (data.length > amountData) {
    showMoreBLock = appendElement(productsBlock.parentElement, "div", [
      ["className", "show_more_block"],
    ]);

    showMoreButton = appendElement(showMoreBLock, "button", [
      ["className", "show_more_button"],
      ["innerText", `Показать ещё ${data.length - amountData}`],
    ]);
  }

  const showMore = () => {
    let prevAmount = amountData;
    amountData += 6;

    let addedData = data.slice(prevAmount, amountData);
    sortingData(addedData);

    pieceOfData = data.slice(0, amountData);
    
    showMoreButton.innerText = `Показать ещё ${data.length - amountData}`;

    if (pieceOfData.length >= data.length) {
      productsBlock.parentElement.removeChild(showMoreBLock);
    }

    sort(pieceOfData, sortByPrice, "price");
    sort(pieceOfData, sortByAge, "age");
  };

  showMore();

  showMoreButton.addEventListener("click", showMore);
};

export default Content;
