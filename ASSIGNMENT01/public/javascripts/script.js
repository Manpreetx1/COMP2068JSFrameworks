document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-dark-mode");
    const body = document.body;

    // Check local storage for user's preference
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.innerText = "☀️ Light Mode";
    }

    // Toggle dark mode
    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.innerText = "🌙 Dark Mode";
        }
    });

    // Smooth Scroll Animations
    const fadeElements = document.querySelectorAll(".fade-in");

    function handleScroll() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on page load
});
