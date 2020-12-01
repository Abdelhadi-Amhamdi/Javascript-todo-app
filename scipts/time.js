
function getTime(){
    const datePart = document.querySelector('.time')
    let date = new Date();
    
    datePart.textContent = date.toUTCString() ;
}

setInterval(getTime , 1000);
