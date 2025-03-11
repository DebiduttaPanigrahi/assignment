document.addEventListener('DOMContentLoaded', function () {
    const images = [
        'image_1.png',
        'image_2.png',
        'image_3.png',
        'image_4.png',
        'image_5.png',
    ];

    const imageContainer = document.querySelector('.image-container');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');
    const sliderContainer = document.querySelector('.slider-container');

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function initSlider() {
        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            img.classList.add('slide');

            if (index === 0) {
                img.classList.add('active');
            }

            imageContainer.appendChild(img);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active-dot');
            }

            dot.addEventListener('click', () => {
                goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        dots.forEach(dot => {
            dot.classList.remove('active-dot');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active-dot');

        currentIndex = index;
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % images.length;
        goToSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(newIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    imageContainer.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    imageContainer.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) >= minSwipeDistance) {
            if (swipeDistance < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    let slideInterval = setInterval(nextSlide, 5000);

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    sliderContainer.addEventListener('touchstart', () => {
        clearInterval(slideInterval);
    }, false);

    sliderContainer.addEventListener('touchend', () => {
        slideInterval = setInterval(nextSlide, 5000);
    }, false);

    initSlider();
});
