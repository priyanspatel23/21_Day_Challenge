async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  try {
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geo.json();
    if (!geoData.results) {
      alert("City not found");
      return;
    }
    const { latitude, longitude, name, country } = geoData.results[0];
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`
    );
    const data = await res.json();
    const weather = data.current_weather;
    document.getElementById("cityName").innerText = name;
    document.getElementById("country").innerText = country;
    document.getElementById("temp").innerText = weather.temperature + "°C";
    document.getElementById("wind").innerText = weather.windspeed;
    let html = "";
    for (let i = 0; i < 6; i++) {
      html += `
        <div>
          <p>${data.hourly.temperature_2m[i]}°C</p>
        </div>
      `;
    }
    document.getElementById("hourly").innerHTML = html;
  } catch (err) {
    console.error(err);
    alert("Error loading weather");
  }
}
window.onload = () => {
  document.getElementById("cityInput").value = "Surat";
  getWeather();
};