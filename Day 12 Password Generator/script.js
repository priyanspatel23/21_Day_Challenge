const lenSlider = document.getElementById("length");
const lenVal = document.getElementById("lenVal");

lenSlider.oninput = () => {
    lenVal.textContent = lenSlider.value;
};

function generatePassword() {
    const length = lenSlider.value;
    const upper = document.getElementById("uppercase").checked;
    const num = document.getElementById("numbers").checked;
    const sym = document.getElementById("symbols").checked;

    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (num) chars += "0123456789";
    if (sym) chars += "!@#$%^&*";

    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("password").value = pass;
}