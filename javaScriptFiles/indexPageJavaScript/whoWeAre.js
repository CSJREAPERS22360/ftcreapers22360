const section = document.querySelector(".whoWeAre");
const text = document.querySelector(".whoWeAre h2");

let lastScroll = 0;
let snapped = false;

window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Determine scroll direction
    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScroll;
    lastScroll = currentScroll;

    // Scroll progress for animation (0 → 1)
    let progress = 1 - (rect.top / windowHeight);
    progress = Math.min(Math.max(progress, 0), 1);

    // Smooth animation
    text.style.width = (50 + 30 * progress) + "%";
    text.style.opacity = progress;
    text.style.transform = `translateY(${20 - 20 * progress}px)`;

    // Snap thresholds
    const downThreshold = windowHeight * 0.8;
    const upThreshold = windowHeight * 0;

    // Snap when scrolling DOWN into the section
    if (scrollingDown && !snapped && rect.top < downThreshold && rect.top > -windowHeight * 0.5) {
        snapped = true;
        window.scrollTo({
            top: window.scrollY + rect.top - windowHeight * 0.1,
            behavior: "smooth"
        });
        setTimeout(() => snapped = false, 800);
    }
});