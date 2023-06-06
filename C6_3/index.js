const wsUrl = "ws://localhost:3000/";

function writeToMessageLog(message, type) {
    const  newDiv = document.createElement("div");
    newDiv.classList.add("message-div");
    let newElement

    switch (type) {
        case "in":
            newElement = document.createElement("span");
            newElement.classList.add("message-span");
            newElement.classList.add("message-in");
            break;
        case "out":
            newDiv.classList.add("message-div-right");
            newElement = document.createElement("span");
            newElement.classList.add("message-span");
            newElement.classList.add("message-out");
            break;
        case "href":
            newDiv.classList.add("message-div-right");
            newElement = document.createElement("a");
            newElement.href = message;
            newElement.classList.add("message-span");
            newElement.classList.add("message-href");
            break;
        case "info":
            newElement = document.createElement("span");
            newElement.classList.add("message-span");
            newElement.classList.add("message-info");
            break;
        case "alert":
            newElement = document.createElement("span");
            newElement.classList.add("message-span");
            newElement.classList.add("message-alert");
            break;
    }
    newElement.innerHTML = message;
    newDiv.appendChild(newElement);
    messageLog.appendChild(newDiv);
}

function getGeolocation() {
    if (!navigator.geolocation) {
        writeToMessageLog("Гео-локация не поддерживается Вашим браузером.", "info");
    } else {
        writeToMessageLog("Определение местоположения...", "info");
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

const success = (position) => {
    let message = `< service >;${position.coords.latitude};${position.coords.longitude}`;
    webSocket.send(message);

    writeToMessageLog("Гео-локация", 'out');
    message = `https://www.openstreetmap.org/#map=14/${position.coords.latitude}/${position.coords.longitude}`;
    writeToMessageLog(message, "href");
}

const error = () => writeToMessageLog("Невозможно определить Ваще местоположение.","info");

const messageLog = document.querySelector(".message-log");
const messageInput = document.querySelector(".message-input");
const sendBtn = document.querySelector(".send-btn");
const geoBtn = document.querySelector(".geo-btn");

const webSocket = new WebSocket(wsUrl);
webSocket.onopen = () => writeToMessageLog("< connected >", "info");
webSocket.onclose = () => writeToMessageLog("< disconnected >", "info");
webSocket.onerror = (evt) => writeToMessageLog(`< ERROR: ${evt.data}. >`, "alert");
webSocket.onmessage = (evt) => {
    if (evt.data.startsWith("< service >")) {
        ;
    } else {
        writeToMessageLog(evt.data, "in");
    }
}

sendBtn.addEventListener("click", () => {
    if (messageInput.value) {
        webSocket.send(messageInput.value);
        writeToMessageLog(messageInput.value, "out");
        messageInput.value="";
    }
})

geoBtn.addEventListener("click", () => getGeolocation());
