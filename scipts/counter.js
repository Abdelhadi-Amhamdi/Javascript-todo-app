
const counter = document.querySelector('.zero');
const startBTN = document.querySelector('.start');
const stopBTN = document.querySelector('.stop');
const delayInput = document.querySelector('.delay-inp');
const rining = document.querySelector('.audio');
const stopsec = document.querySelector('.songOff');

startBTN.addEventListener('click' , start );
stopBTN.addEventListener('click' , stop )
stopsec.addEventListener('click' , stopRinging);

var ddd  ;

function start(event) {
    event.preventDefault();
    delay = delayInput.value ;
    if(delay === ''){
        alert('add delay first!');
    }else {
        ddd =  setInterval(startCount , 1000);
    }
}
function stop() {
    clearInterval(ddd);
}
function startCount() {
    delay = delayInput.value ;
    num = parseInt(counter.innerHTML)
    counter.innerHTML = num + 1
    if(num == delay ){
        clearInterval(ddd);
        rining.play();
        stopsec.style.display = 'block';
    }
}
function stopRinging(e) {
    item = e.target;
    item.addEventListener(
        'click' , 
        rining.remove() , 
        stopsec.style.display = 'none'
    );
}





var startTime = 0
var start = 0
var end = 0
var dif = 0
var timerID = 0
function chrono(){
    end = new Date()
    dif = end - start
    dif = new Date(dif)
    var msec = dif.getMilliseconds()
    var sec = dif.getSeconds()
    var min = dif.getMinutes()
    var hr = dif.getHours()-1
    if (min < 10){
		min = "0" + min
    }
    if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
    }
    else if(msec < 100){
		msec = "0" +msec
    }
    document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}

function chronoStart(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()
	chrono()
}
function chronoContinue(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()-dif
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("chronotime").innerHTML = "0:00:00:000"
	start = new Date()
}
function chronoStopReset(){
	document.getElementById("chronotime").innerHTML = "0:00:00:000"
	document.chronoForm.startstop.onclick = chronoStart
}
function chronoStop(){
	document.chronoForm.startstop.value = "start!"
	document.chronoForm.startstop.onclick = chronoContinue
	document.chronoForm.reset.onclick = chronoStopReset
	clearTimeout(timerID)
}