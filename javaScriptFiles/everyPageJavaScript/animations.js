document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    let current = 0;
    let target = 0;
    let ease = 0.2;

    function setBodyHeight() {
        document.body.style.height = content.scrollHeight + "px";
    }

    setBodyHeight();
    window.addEventListener("resize", setBodyHeight);
    window.addEventListener("load", setBodyHeight);

    window.addEventListener("scroll", () => {
        target = window.scrollY;
    });

    function smoothScroll() {
        const maxScroll = content.scrollHeight - window.innerHeight;

        // Clamp target BEFORE easing
        target = Math.max(0, Math.min(target, maxScroll));

        // Lerp
        current += (target - current) * ease;

        // Soft clamp at the top
        if (current < 0.001) current = 0;

        // Soft clamp at the bottom
        if (current > maxScroll - 0.001) current = maxScroll;

        content.style.transform = `translateY(${-current}px)`;

        requestAnimationFrame(smoothScroll);
    }

    smoothScroll();
});
