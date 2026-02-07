const slider = document.querySelector(".sliderContainer");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");

let index = 0;
let autoSlideInterval;
let isDragging = false;
let startX = 0;

// Update slider position
function updateSlider() {
    slider.style.transform = `translateX(${-index * 100}%)`;
}

// Auto-slide every 4 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Arrow controls
nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    index = (index + 1) % slides.length;
    updateSlider();
    startAutoSlide();
});

prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
    startAutoSlide();
});

// Drag / Swipe
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

slider.addEventListener("mousemove", drag);
slider.addEventListener("touchmove", drag);

slider.addEventListener("mouseup", endDrag);
slider.addEventListener("mouseleave", endDrag);
slider.addEventListener("touchend", endDrag);

function startDrag(e) {
    stopAutoSlide();
    isDragging = true;
    startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    slider.style.transition = "none";
}

function drag(e) {
    if (!isDragging) return;
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    const delta = x - startX;
    slider.style.transform = `translateX(${delta - index * window.innerWidth}px)`;
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    const x = e.type.includes("mouse") ? e.pageX : e.changedTouches[0].clientX;
    const delta = x - startX;

    slider.style.transition = "transform 0.4s ease";

    if (delta < -100) index = (index + 1) % slides.length;
    if (delta > 100) index = (index - 1 + slides.length) % slides.length;

    updateSlider();
    startAutoSlide();
}

// Start auto-slide on load
startAutoSlide();
