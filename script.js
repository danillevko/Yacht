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


//  const form = document.getElementById('bookingForm');
//         const modal = document.getElementById('thanksModal');
//         const loading = document.querySelector('.loading');
//         const btnText = document.querySelector('.btn-text');
//         const arrow = document.querySelector('.arrow');

//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const inputs = form.querySelectorAll('input[required]');
//             let isValid = true;
            
//             inputs.forEach(input => {
//                 const group = input.closest('.form-group');
//                 if (!input.value.trim()) {
//                     group.classList.add('error');
//                     isValid = false;
//                 } else {
//                     group.classList.remove('error');
//                 }
//             });
            
            
//             if (isValid) {
//                 loading.classList.add('show');
//                 btnText.style.opacity = '0';
//                 arrow.style.opacity = '0';
//                 setTimeout(() => {
//                     loading.classList.remove('show');
//                     btnText.style.opacity = '1';
//                     arrow.style.opacity = '1';
//                     showModal();
//                     form.reset();
//                 }, 2000);
//             }
//         });

//         function showModal() {
//             const modal = document.getElementById('successModal');
//             if (modal) {
//                 modal.classList.add('show');
//                 document.body.style.overflow = 'hidden';
//             }
//         }

//         function closeModal() {
//             const modal = document.getElementById('successModal');
//             if (modal) {
//                 modal.classList.remove('show');
//                 document.body.style.overflow = 'auto';
//             }
//         }

//         modal.addEventListener('click', function(e) {
//             if (e.target === modal) {
//                 closeModal();
//             }
//         });

//         document.addEventListener('keydown', function(e) {
//             if (e.key === 'Escape' && modal.classList.contains('show')) {
//                 closeModal();
//             }
//         });
//         document.querySelectorAll('input, textarea').forEach(input => {
//             input.addEventListener('input', function() {
//                 this.closest('.form-group').classList.remove('error');
//             });
//         });

       
const form = document.getElementById('bookingForm');
        const modal = document.getElementById('thanksModal');
        const loading = document.querySelector('.loading');
        const btnText = document.querySelector('.btn-text');
        const arrow = document.querySelector('.arrow');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                const group = input.closest('.form-group');
                if (!input.value.trim()) {
                    group.classList.add('error');
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            });
           
            
            if (isValid) {
                loading.classList.add('show');
                btnText.style.opacity = '0';
                arrow.style.opacity = '0';
                setTimeout(() => {
                    loading.classList.remove('show');
                    btnText.style.opacity = '1';
                    arrow.style.opacity = '1';
                    showModal();
                    form.reset();
                }, 2000);
            }
        });

        function showModal() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });





    class TestimonialSlider {
        constructor() {
        this.container = document.getElementById('sliderContainer');
        this.dots = document.querySelectorAll('.nav-dot');
        this.progressBars = document.querySelectorAll('.progress-bar');
        
        this.currentSlide = 0;
        this.totalSlides = this.dots.length;
        this.autoSlideInterval = null;
        this.slideInterval = 5000; 
        
        this.init();
        this.visibleSlides = this.getVisibleSlides();
window.addEventListener('resize', () => {
    this.visibleSlides = this.getVisibleSlides();
    this.updateSlider1();
});
    }
getVisibleSlides() {
    const width = window.innerWidth;
    if (width >= 768 && width <= 1024) {
        return 2;
    }
    return 1; 
}

    
    init() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        this.addTouchSupport();
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider1();
        this.updateDots();
        this.restartAutoSlide();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider1();
        this.updateDots();
        this.restartAutoSlide();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider1();
        this.updateDots();
        this.restartAutoSlide();
    }
    
 updateSlider1() {
    const items = this.container.querySelectorAll('.recalls-slider-item');
    const gap = 14;
    const itemWidth = items[0].offsetWidth;

    items.forEach(item => item.classList.remove('no-gap'));

    items[items.length - 1].classList.add('no-gap');

    const translateX = -(this.currentSlide * (itemWidth + gap));
    this.container.style.transform = `translateX(${translateX}px)`;
}

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
   
    
    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoSlide();
        });
        
        this.container.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', () => {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            this.startAutoSlide();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});
