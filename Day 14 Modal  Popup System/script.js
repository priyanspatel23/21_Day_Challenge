const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
const actionBtn = document.querySelector(".action"); 

openBtn.onclick = () => {
  overlay.classList.add("show");
};

closeBtn.onclick = () => {
  overlay.classList.remove("show");
};

actionBtn.onclick = () => {
  overlay.classList.remove("show");
};

overlay.onclick = (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("show");
  }
};
