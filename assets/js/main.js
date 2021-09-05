let themeVersion = 'light'
/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validar si existe constante */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        document.getElementById('nav-menu').style.bottom = '0'
    })
}

/*===== MENU HIDDEN =====*/
/* Validar si existe constante */
if(navClose){
    navClose.addEventListener('click', () =>{
        document.getElementById('nav-menu').style.bottom = '-100%'
    })
}


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    document.getElementById('nav-menu').style.bottom = '-100%'
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i=0; i <skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }

    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click',toggleSkills)
})


/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContents =>{
            tabContents.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn,i) =>{
    modalBtn.addEventListener('click', () =>{
        modal(i) 
    })
})

modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})


/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== EVENTS AFTER HEADER - ANIMATIONS ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    const mainBlock = document.getElementById('main')
    const scrollUp = document.getElementById('scroll-up');
    let elementAboutMe = document.getElementById("about");
    let socialContent = document.createElement("div");

    if (this.scrollY >= 600){  
        console.log(themeVersion)
        if(themeVersion === 'dark'){
            nav.classList.add('scroll-headerD');
            scrollUp.classList.add('show-scrollD');
            if(document.getElementsByClassName('social__contentD').length == 0){
                mainBlock.appendChild(socialContent).classList.add("social__contentD")
                document.getElementsByClassName(".social__contentL").remove;
            }
        }else{
            nav.classList.add('scroll-headerL');
            scrollUp.classList.add('show-scrollL');
            if(document.getElementsByClassName('social__contentL').length == 0){
                mainBlock.appendChild(socialContent).classList.add("social__contentL")
                document.getElementsByClassName(".social__contentD").remove;
            }
        }
    }else{
        if(themeVersion === 'dark'){
            nav.classList.remove('scroll-headerD');
            scrollUp.classList.remove('show-scrollD');
            document.getElementsByClassName(".social__contentD").remove
        }else{
            nav.classList.remove('scroll-headerL');
            scrollUp.classList.remove('show-scrollL');
            document.getElementsByClassName(".social__contentL").remove
        }
    }
}
window.addEventListener('scroll', scrollHeader)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Theme seleccionado previamente (si esta seleccionado)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtenemos el tema actual que tiene la interfaz validando la clase dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// Validamos si el usuario eligió previamente un tema
if (selectedTheme) {
  // Si se cumple la validación, preguntamos cuál es el theme para saber si activamos o desactivamos el oscuro
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activar o desactivar el tema manualmente con un click
themeButton.addEventListener('click', () => {
    // Agrega o remueve iconos del tema
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Guardamos el tema y el icono actual que eligió el usuario
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

    //cambio el background
    themeVersion = localStorage.getItem("selected-theme");

    if(themeVersion === 'dark'){
        let header = this.document.querySelector("header");
        header.classList.toggle("scroll-headerD");
        header.classList.remove("scroll-headerL");

        window.addEventListener("scroll", function(){
            let nav = document.querySelector("nav");
            nav.classList.toggle("stickyM", window.scrollY > 600);
            nav.classList.remove("stickyS")
        })
    }else{
        let header = this.document.querySelector("header");
        header.classList.toggle("scroll-headerL");
        header.classList.remove("scroll-headerD");
        window.addEventListener("scroll", function(){
            let nav = document.querySelector("nav");
            nav.classList.toggle("stickyS", window.scrollY > 600);
            nav.classList.remove("stickyM")
        })
    }

})