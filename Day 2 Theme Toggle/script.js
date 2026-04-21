const H = { h: 0, m: 180 },
V = { h: 270, m: 90 },
TL = { h: 180, m: 270 },
TR = { h: 0, m: 270 },
BL = { h: 180, m: 90 },
BR = { h: 0, m: 90 },
E = { h: 135, m: 135 };

const digits = [
[
BR, H, H, BL,
V, BR, BL, V,
V, V, V, V,
V, V, V, V,
V, TR, TL, V,
TR, H, H, TL],

[
BR, H, BL, E,
TR, BL, V, E,
E, V, V, E,
E, V, V, E,
BR, TL, TR, BL,
TR, H, H, TL],

[
BR, H, H, BL,
TR, H, BL, V,
BR, H, TL, V,
V, BR, H, TL,
V, TR, H, BL,
TR, H, H, TL],

[
BR, H, H, BL,
TR, H, BL, V,
E, BR, TL, V,
E, TR, BL, V,
BR, H, TL, V,
TR, H, H, TL],

[
BR, BL, BR, BL,
V, V, V, V,
V, TR, TL, V,
TR, H, BL, V,
E, E, V, V,
E, E, TR, TL],

[
BR, H, H, BL,
V, BR, H, TL,
V, TR, H, BL,
TR, H, BL, V,
BR, H, TL, V,
TR, H, H, TL],

[
BR, H, H, BL,
V, BR, H, TL,
V, TR, H, BL,
V, BR, BL, V,
V, TR, TL, V,
TR, H, H, TL],

[
BR, H, H, BL,
TR, H, BL, V,
E, E, V, V,
E, E, V, V,
E, E, V, V,
E, E, TR, TL],

[
BR, H, H, BL,
V, BR, BL, V,
V, TR, TL, V,
V, BR, BL, V,
V, TR, TL, V,
TR, H, H, TL],

[
BR, H, H, BL,
V, BR, BL, V,
V, TR, TL, V,
TR, H, BL, V,
BR, H, TL, V,
TR, H, H, TL]
];

const getTimeDigits = () => {
  const now = new Date();
  return [
  now.getHours(),
  now.getMinutes(),
  now.getSeconds()]
  .flatMap(val => String(val).padStart(2, "0").split("").map(Number));
};

const root = document.getElementById('root');
const app = document.createElement('div');
app.className = 'app';
root.appendChild(app);

const toggleBtn = document.createElement('button');
toggleBtn.innerText = "Dark";
toggleBtn.style.position = "fixed";
toggleBtn.style.top = "20px";
toggleBtn.style.right = "20px";
toggleBtn.style.padding = "8px 12px";
toggleBtn.style.cursor = "pointer";

document.body.appendChild(toggleBtn);

// ✅ LOAD SAVED THEME (NEW)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  app.classList.add("dark");
  toggleBtn.innerText = "Light";
} else {
  toggleBtn.innerText = "Dark";
}

// ✅ TOGGLE + SAVE (UPDATED)
toggleBtn.addEventListener('click', () => {
  app.classList.toggle('dark');

  if (app.classList.contains('dark')) {
    toggleBtn.innerText = "Light";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.innerText = "Dark";
    localStorage.setItem("theme", "light");
  }
});

const digitContainers = [];
for(let i = 0; i < 6; i++){
  const digitDiv = document.createElement('div');
  app.appendChild(digitDiv);
  digitContainers.push(digitDiv);

  const clocks = [];
  for(let j = 0; j < 24; j++){
    const clock = document.createElement('div');
    clock.className = 'clock';

    const hourHand = document.createElement('div');
    hourHand.className = 'hour-hand';

    const minuteHand = document.createElement('div');
    minuteHand.className = 'minute-hand';

    clock.appendChild(hourHand);
    clock.appendChild(minuteHand);
    digitDiv.appendChild(clock);

    clocks.push({hourHand, minuteHand});
  }
  digitContainers[i].clocks = clocks;
}

updateTime();
setInterval(updateTime, 1000);

function updateTime(){
  const timeDigits = getTimeDigits();

  timeDigits.forEach((d, i) => {
    const config = digits[d];

    config.forEach(({h, m}, j) => {
      const {hourHand, minuteHand} = digitContainers[i].clocks[j];
      hourHand.style.transform = `rotate(${h}deg)`;
      minuteHand.style.transform = `rotate(${m}deg)`;
    });
  });
}