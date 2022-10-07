// Создание переменных инпутов, кнопок и дивов
const btnSend = document.querySelector(".send");
const btnGeo = document.querySelector(".geo");
const inp = document.querySelector("input");
const messages = document.querySelector(".messages");
const typ = document.querySelector(".typing");

// URL для эхо-сервера и переменная для хранения объекта WebSocket
const wsUrl = "wss://echo-ws-service.herokuapp.com/";
let websocket;

// Переменная для точек, при печатании компьютера
let k;


// Функция для вывода ответа от сервера
function serverResponse(text) {
    inp.value = "";
    websocket = new WebSocket(wsUrl);

    // Добавляет строку Typing..., будто компьютер печатает
    k = 1;
    let intervalId = setInterval(() => {
        if (k >= 4) k = 1;
        typ.textContent = "Typing" + ".".repeat(k);
        k++;
    }, 500)

    // Делает вид, будто компьютер печатает. При выполнении удаляет строку Typing...
    setTimeout(() => {
        typ.textContent = "";
        clearInterval(intervalId);
        messages.innerHTML += `<p class="server message"><span>${text}</span></p>`;
        websocket.send(text);
    }, text.length * 200);
}

// Добавляет обработчик на отправку при клике
btnSend.addEventListener("click", () => {
    messages.innerHTML += `<p class="client message"><span>${inp.value}</span></p>`;
    serverResponse(inp.value);

});

// Добавлят обработчик на отправку при нажатии Enter
inp.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        messages.innerHTML += `<p class="client message"><span>${inp.value}</span></p>`;
        serverResponse(inp.value);
    }
})

// Выполняется при ошибке получения местоположения по гео-локации
const error = () => {
    messages.innerHTML = 'Невозможно получить ваше местоположение';
}

// Выполняется при успешном выполнении запроса гео-локации. Выводит сообщение клиента с ссылкой на ваше местоположение на карте.
const success = position => {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    messages.innerHTML += `<p class="client message"><span><a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Гео-локация</a></span></p>`;
}

// Добавляет обработчик событий на кнопку "Гео-локация".
btnGeo.addEventListener("click", () => {
    if (!navigator.geolocation) {
        messages.innerHTML = 'Гео-локация не поддерживается вашим браузером';
    } else {
        // Производит поиск по гео-локации
        navigator.geolocation.getCurrentPosition(success, error);
    }
})


