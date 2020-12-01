
const animationSection = document.querySelector('.stars')


function createStars() {
    const star = document.createElement('i');
    star.setAttribute('class' , 'fa fa-star')

    var size = Math.random() * 10 ;

    star.style.fontSize = size + 20 + 'px';


    star.style.top =  Math.random() * innerHeight +'px' ;
    star.style.left = Math.random() * innerWidth + 'px';

    animationSection.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 5000);
   
    
}

setInterval(createStars , 150);