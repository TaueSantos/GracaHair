document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MENU E ABAS ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a'); 
    const abas = document.querySelectorAll('.aba');

    // Toggle Menu Mobile
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Função de Troca de Abas
    function switchTab(event) {
        event.preventDefault(); 
        abas.forEach(aba => { aba.classList.remove('active'); });
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId);
        if (targetSection) { targetSection.classList.add('active'); }
        navMenu.classList.remove('active');
    }

    navLinks.forEach(link => { link.addEventListener('click', switchTab); });


    // --- LÓGICA DO CARROSSEL BOOTSTRAP ---
    const track = document.querySelector('.carousel-track');
    if (!track) return; 

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const updateSlide = (currentSlide, targetSlide) => {
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    // Clique na Seta Direita
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;

        // Loop infinito: se não houver próximo, volta pro primeiro
        if (!nextSlide) {
            nextSlide = slides[0];
            nextDot = dots[0];
        }

        updateSlide(currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });

    // Clique na Seta Esquerda
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let prevDot = currentDot.previousElementSibling;

        // Loop infinito: se não houver anterior, vai pro último
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
            prevDot = dots[dots.length - 1];
        }

        updateSlide(currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

    // Clique nas Bolinhas
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        updateSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });
});