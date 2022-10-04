// Заносим в переменную элемент кнопки
const btn = document.querySelector("button");

// После клика выводим размеры экрана
btn.addEventListener("click", () => {
    alert(`Ширина: ${document.documentElement.clientWidth} \nВысота: ${document.documentElement.clientHeight}`);
})