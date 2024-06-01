let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        running = true;
        document.getElementById("start-stop").innerHTML = "Stop";
        changeBackground('start');
    } else {
        clearInterval(timerInterval);
        running = false;
        document.getElementById("start-stop").innerHTML = "Start";
        changeBackground('stop');
    }
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    running = false;
    document.getElementById("start-stop").innerHTML = "Start";
    document.getElementById("laps").innerHTML = "";
    changeBackground('reset');
}

function recordLap() {
    if (running) {
        let lapTime = timeToString(elapsedTime);
        let lapElement = document.createElement("div");
        lapElement.innerText = lapTime;
        document.getElementById("laps").appendChild(lapElement);
    }
}

function changeBackground(state) {
    const backgroundBlur = document.getElementById('background-blur');
    const heading = document.querySelector('.heading');
    if (state === 'start') {
        backgroundBlur.style.filter = 'blur(20px)';
        heading.style.color = '#00ff00';
    } else if (state === 'stop') {
        backgroundBlur.style.filter = 'blur(50px)';
        heading.style.color = '#ff0000';
    } else {
        backgroundBlur.style.filter = 'blur(50px)';
        heading.style.color = '#ffffff';
    }
}
