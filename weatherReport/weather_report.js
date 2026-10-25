function showweatherDetails(event) {
    event.preventDefault();
  
    const city = document.getElementById('city').value.trim();
    const apiKey = 'c7e6b5bb4c7154fe5be7e8707bcf3729';
    const weatherInfo = document.getElementById('weatherInfo');
  
    if (!city) {
      weatherInfo.textContent = 'Please enter a city name.';
      return;
    }
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Weather request failed: ${response.status}`);
        }
  
        return response.json();
      })
      .then(data => {
        weatherInfo.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${data.main.temp} &#8451;</p>
          <p>Weather: ${data.weather[0].description}</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        weatherInfo.textContent =
          'Failed to fetch weather. Check the city name and API key.';
      });
  }
  
  document
    .getElementById('weatherForm')
    .addEventListener('submit', showweatherDetails);