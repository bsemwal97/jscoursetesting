function showweatherDetails(event) {
    event.preventDefault();
  
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const apiKey = 'c7e6b5bb4c7154fe5be7e8707bcf3729';
    const weatherInfo = document.getElementById('weatherInfo');
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Weather request failed: ${response.status}`);
        }
  
        return response.json();
      })
      .then(data => {
        weatherInfo.innerHTML = `
          <h2>Weather in ${data.name || 'Selected location'}</h2>
          <p>Latitude: ${data.coord.lat}</p>
          <p>Longitude: ${data.coord.lon}</p>
          <p>Temperature: ${data.main.temp} &#8451;</p>
          <p>Weather: ${data.weather[0].description}</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        weatherInfo.textContent =
          'Failed to fetch weather. Check the coordinates and API key.';
      });
  }
  
  document
    .getElementById('weatherForm')
    .addEventListener('submit', showweatherDetails);