const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const mainPage = document.getElementById('mainPage');

        function openMenu() {
            hamburgerBtn.classList.add('active');
            menuOverlay.classList.add('active');
            
            mainPage.style.filter = 'blur(2px)';
        }

        function closeMenu() {
            hamburgerBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
        
            mainPage.style.filter = 'none';
        }



document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const sliderList = document.getElementById('sliderList');
    const slides = document.querySelectorAll('.slider-list li');
    const totalSlides = slides.length;
    const GAP_SIZE = 16; 

    function getSlidesPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 768 && screenWidth < 1024) {
            return 2;
        } else if (screenWidth >= 1024) {
            return 3;
        }
        return 1;
    }

    function getCalculatedSlideWidth() {
        const slidesPerView = getSlidesPerView();
        const containerWidth = sliderList.parentElement.offsetWidth;
        const totalGapWidth = GAP_SIZE * (slidesPerView - 1);
        
        return (containerWidth - totalGapWidth) / slidesPerView;
    }

    function updateSlider() {
        const slidesPerView = getSlidesPerView();
        const calculatedSlideWidth = getCalculatedSlideWidth();
        
        slides.forEach(slide => {
            slide.style.width = calculatedSlideWidth + 'px';
        });
        
        let moveDistance;
    if (slidesPerView > 1) { 
        moveDistance = currentIndex * (calculatedSlideWidth + GAP_SIZE);
    } else { 
        moveDistance = currentIndex * calculatedSlideWidth;
    }
        sliderList.style.transform = `translateX(-${moveDistance}px)`;
        sliderList.style.transition = 'transform 0.5s ease-out';
    }

    function getMaxIndex() {
        const slidesPerView = getSlidesPerView();
        return Math.max(0, totalSlides - slidesPerView);
    }

    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
            updateButtonStates();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
            updateButtonStates();
        });
    }

    function updateButtonStates() {
        const maxIndex = getMaxIndex();
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
        }
    }

    window.addEventListener('resize', () => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateSlider();
        updateButtonStates();
    });

    updateSlider();
    updateButtonStates();
});
