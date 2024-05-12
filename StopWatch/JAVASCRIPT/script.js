let startTime, currentTime, elapsedTime = 0;
let timerInterval;
let running = false;

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        document.getElementById("startPause").textContent = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        document.getElementById("startPause").textContent = "Start";
        running = false;
    }
}

function lapReset() {
    if (running) {
        let lapTime = currentTime - startTime;
        elapsedTime += lapTime;
        displayLapTime(lapTime);
    } else {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        document.getElementById("laps").innerHTML = "";
        document.getElementById("startPause").textContent = "Start";
    }
}

function restart() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startPause").textContent = "Start";
    running = false;
}

function updateDisplay() {
    currentTime = Date.now();
    let elapsedTime = currentTime - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor(time % 1000 / 10);

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

function displayLapTime(lapTime) {
    let lapList = document.getElementById("laps");
    let lapItem = document.createElement("li");
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
}

document.getElementById("startPause").addEventListener("click", startPause);
document.getElementById("lapReset").addEventListener("click", lapReset);
document.getElementById("restart").addEventListener("click", restart);
