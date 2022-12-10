
const slides = document.querySelectorAll('.slide')
const leftBtn = document.querySelector('.leftBtn')
const rightBtn = document.querySelector('.rightBtn')
const dots = document.querySelector('.dots-list')

let maxLength = slides.length -1

currentSlide = 1



const slider = (item) =>{
    slides.forEach((s , i) => s.style.transform = `translateX(${105 * (i - item)}%) scale(${0.9})`)
    slides[item].style.transform = `scale(${1.1})`
}

const leftHandle = ()=>{
    if (currentSlide == 0){
        currentSlide = maxLength -1
    }
    else{
       currentSlide--
    }
    slider(currentSlide)
    activeDots(currentSlide)
}

const rightHandle = ()=>{
    if (currentSlide == maxLength){
        currentSlide = 0
    }
    else{
        currentSlide++
    }
    slider(currentSlide)
    activeDots(currentSlide)
}

const createDots = () => {
    slides.forEach((_,i)=>{
        dots.insertAdjacentHTML('beforeend', `<div class="dot" data-id='${i}'><div>`)
    })
}

const activeDots = (id) =>{
    document.querySelectorAll('.dot').forEach((e)=>{
        e.classList.remove('active')
    })
    document.querySelector(`.dot[data-id='${id}'`).classList.add('active')
}

dots.addEventListener('click', function(e) {
    if(e.target.classList.contains('dot')){
        let element = e.target.dataset
        slider(element.id)
        activeDots(element.id)
    }
})


leftBtn.addEventListener('click', leftHandle)
rightBtn.addEventListener('click', rightHandle)
createDots()
activeDots(currentSlide)
slider(currentSlide)