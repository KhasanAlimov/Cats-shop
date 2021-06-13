// Добавить элемент
const appendElement = (parent, child, array) => {
    const result = parent.appendChild(document.createElement(child));
  
    array.forEach((element) => {

      eval(`result.${element[0]} = element[1]`)
    });
  
    return result;
  };

  // Уведомление
const alerts = (message, type) => {
  let body = document.body,
      AlertBlock = appendElement(body, "div", [
    ["className", type],
    ["innerText", message],
  ]);
  setTimeout(() => {
    AlertBlock.classList.add("swipe-down");
  }, 0.1);
  setTimeout(() => {
    AlertBlock.classList.remove("swipe-down");
  }, 2000);

  setTimeout(() => {
    body.removeChild(AlertBlock);
  }, 2500);
};

  export { appendElement, alerts };