var defaultMinutes = 35;
var MaximumTime = defaultMinutes * 60;

var totalRemainingSeconds = 0;

var isRunning = false;

document.getElementById("totaltime").innerText = `${defaultMinutes}:00`;

function UpdateTime(_time) {
    let _newTime = MaximumTime + (_time * 60);
    if (_newTime > 0 && _newTime <= 7200) {
        MaximumTime = _newTime;
        document.getElementById("totaltime").innerText = ((MaximumTime / 60)) + ":" + "00";
    }
}

function PomodoroStart(){
    document.getElementById("app").style.backgroundColor = "#f4425c";
    document.getElementsByClassName("buttons")[0].classList.add("hidden");
    document.getElementsByClassName("start-button")[0].classList.add("hidden");
    document.getElementsByClassName("stop-button")[0].classList.remove("hidden");

    totalRemainingSeconds = MaximumTime;
    isRunning = true;
    Decrement();
}

function PomodoroStop(){
    document.getElementById("app").style.backgroundColor = "#23f3a3";
    document.getElementsByClassName("buttons")[0].classList.remove("hidden");
    document.getElementsByClassName("start-button")[0].classList.remove("hidden");
    document.getElementsByClassName("stop-button")[0].classList.add("hidden");

    isRunning = false;
    // Reset time to default value
    document.getElementById("totaltime").innerText = `${defaultMinutes}:00`;
}

function Decrement(){
    if (totalRemainingSeconds != 0 && isRunning){
        totalRemainingSeconds--;
        setTimeout(Decrement, 1000);
        document.getElementById("totaltime").innerText = SecondsToTimeConverter(totalRemainingSeconds);
        document.getElementById("progressbar").style.width = `${(totalRemainingSeconds*100)/MaximumTime}%`;
    }
    else{
        PomodoroStop();
        var audio = new Audio('./assets/alert.mp3');
        audio.play();
    }
}

function SecondsToTimeConverter(_seconds){
    let mins = Math.floor(_seconds/60);
    let secs = _seconds % 60;
    if (mins < 10){
        mins = "0" + mins;
    }
    if (secs < 10){
        secs = "0" + secs;
    }
    return `${mins}:${secs}`;
}