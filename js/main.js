const city = document.getElementById("cityInput")
const search = document.getElementById("searchInput")

search.addEventListener('click', e => {
  e.preventDefault()
  getData(city.value)
})


const getData = async (input) => {
  const apiData = {
    url: 'http://api.openweathermap.org/data/2.5/weather?q=',
    city: input,
    units: '&units=metric',
    apiKey: '&appid=439e8e6881a90ec4a633579b93341e40'
  }
  const {url, city, units, apiKey} = apiData
  const apiUrl = `${url}${city}${units}${apiKey}`
  await fetch(apiUrl)
    .then( (data) => data.json())
    .then( (data) => generateHtml(data) )
}

const epochToUtc = (time) => {
  let myDate = new Date( time * 1000).toTimeString().slice(0, 8)
  return myDate
}

const displayTemp = (temp) => {

}

// var dateString = 'Mon Jan 12 00:00:00 GMT 2015';
// dateString = new Date(dateString).toUTCString();
// dateString = dateString.split(' ').slice(0, 4).join(' ');
// console.log(dateString);

const generateHtml = (data) => {
  const { weather, main, sys, name } = data;
  console.log(data)
  const html = `
  <div class="output-container">
    <h3>${name}</h3>
    <p>${weather[0].description}</p>
    <p>Temperature: ${main.temp.toFixed(1)}&#176;C</p>
    <p>Sunrise: ${epochToUtc(sys.sunrise)}</p>
    <p>Sunset: ${epochToUtc(sys.sunset)}</p>
  </div>
  `
  const outputDiv = document.getElementById('output')
  outputDiv.innerHTML = html
}