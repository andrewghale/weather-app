const city = document.getElementById("cityInput")
const search = document.getElementById("searchInput")

search.addEventListener('click', e => {
  e.preventDefault()
  getData(city.value)
})


const getData = (input) => {
  const apiData = {
    url: 'http://api.openweathermap.org/data/2.5/weather?q=',
    city: input,
    apiKey: '&units=metric&appid=439e8e6881a90ec4a633579b93341e40'
  }
  const {url, city,apiKey} = apiData
  const apiUrl = `${url}${city}${apiKey}`
  fetch(apiUrl)
    .then( (data) => data.json())
    .then( (data) => generateHtml(data) )
}

const generateHtml = (data) => {
  const { main, name } = data;
  console.log(data)
  const html = `
  <div class="output-container">
    <h3>City: ${name}</h3>
    <p>Temperature: ${main.temp}&#176;C</p>
  </div>
  `
  const outputDiv = document.getElementById('output')
  outputDiv.innerHTML = html
}