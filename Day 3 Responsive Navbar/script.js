const btn = document.querySelector(".toggle-btn");
const menu = document.querySelector(".menu");

btn.onclick = () => {
    btn.classList.toggle("open");
    menu.classList.toggle("show");
};

menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        btn.classList.remove("open");
        menu.classList.remove("show");
    }
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
        btn.classList.remove("open");
        menu.classList.remove("show");
    }
});