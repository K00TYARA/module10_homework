// Записываем в переменные кнопку и svg иконки
const btn = document.querySelector("button");
const ic1 = document.querySelector(".icon1");
const ic2 = document.querySelector(".icon2");

// Задаем обработчик для смены иконок
btn.addEventListener("click", () => {
    ic1.classList.toggle("display");
    ic2.classList.toggle("display");
})