const city = document.getElementById("cityInput")
const searchInput = document.getElementById("searchInput")
const suggestions = document.querySelector(".suggestions")


const getData = async (input) => {
  const apiData = {
    url: 'http://api.openweathermap.org/data/2.5/weather?q=',
    city: `${input},UK`,
    units: '&units=metric',
    apiKey: '&appid=439e8e6881a90ec4a633579b93341e40'
  }
  const {url, city, units, apiKey} = apiData
  const apiUrl = `${url}${city}${units}${apiKey}`
  await fetch(apiUrl)
    .then( (data) => data.json())
    .then( (data) => generateHtml(data) )
}

const getForecastData = (input) => {
  const apiData = {
    url: 'http://api.openweathermap.org/data/2.5/forecast?q=',
    city: `${input},UK`,
    units: '&units=metric',
    apiKey: '&appid=439e8e6881a90ec4a633579b93341e40'
  }
  const {url, city, units, apiKey} = apiData
  const apiUrl = `${url}${city}${units}${apiKey}`
  fetch(apiUrl)
    .then( (data) => data.json())
    .then( (data) => generateForecastHtml(data) )
}

const epochToUtc = (time) => {
  let myDate = new Date( time * 1000).toTimeString().slice(0, 8)
  return myDate
}

const epochToTime = (time) => {
  const date = new Date( time * 1000)
  let hours = date.getHours()
  console.log(hours)
  return hours
}

const generateHtml = (data) => {
  const { weather, main, sys, name } = data;
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

const generateForecastHtml = (data) => {
  let temps = ''
  console.log(data.list)
  data.list.forEach((el) => {
    let tempString =
    `<div class="three-hour">
    <div class="time">
      <img src="../img/clock.svg" alt="time">
      <div class="the-time">
        <span class="bold">${
          JSON.stringify(epochToTime(el.dt)).padStart(2, '0')}
        </span>00
      </div>
      </div>
      <div class="temp">
      <img src="../img/thermometer.svg" alt="temperature">
        ${JSON.stringify(Math.round(el.main["temp"]))}&#176;
      </div>
      <div class="wind">
        <img src="../img/wind.svg" alt="wind">
        ${JSON.stringify(Math.round(el.wind["speed"]))}
      </div>
    </div>`
    temps = temps.concat(tempString)
  })
  const html = `
    ${temps}
  `
  const outputForecastDiv = document.getElementById('output-forecast')
  outputForecastDiv.innerHTML = html
}

const cities = [{"city":"Aberdeen"},{"city":"Armagh"},{"city":"Bangor"},{"city":"Bath"},{"city":"Belfast"},{"city":"Birmingham"},{"city":"Bradford"},{"city":"Brighton & Hove"},{"city":"Bristol"},{"city":"Cambridge"},{"city":"Canterbury"},{"city":"Cardiff"},{"city":"Carlisle"},{"city":"Chelmsford"},{"city":"Chester"},{"city":"Chichester"},{"city":"Coventry"},{"city":"Derby"},{"city":"Derry"},{"city":"Dundee"},{"city":"Durham"},{"city":"Edinburgh"},{"city":"Ely"},{"city":"Exeter"},{"city":"Glasgow"},{"city":"Gloucester"},{"city":"Hereford"},{"city":"Inverness"},{"city":"Kingston upon Hull"},{"city":"Lancaster"},{"city":"Leeds"},{"city":"Leicester"},{"city":"Lichfield"},{"city":"Lincoln"},{"city":"Lisburn"},{"city":"Liverpool"},{"city":"London"},{"city":"Manchester"},{"city":"Newcastle upon Tyne"},{"city":"Newport"},{"city":"Newry"},{"city":"Norwich"},{"city":"Nottingham"},{"city":"Oxford"},{"city":"Perth"},{"city":"Peterborough"},{"city":"Plymouth"},{"city":"Portsmouth"},{"city":"Preston"},{"city":"Ripon"},{"city":"St Albans"},{"city":"St Asaph"},{"city":"St Davids"},{"city":"Salford"},{"city":"Salisbury"},{"city":"Sheffield"},{"city":"Southampton"},{"city":"Stirling"},{"city":"Stoke-on-Trent"},{"city":"Sunderland"},{"city":"Swansea"},{"city":"Truro"},{"city":"Wakefield"},{"city":"Wells"},{"city":"Westminster"},{"city":"Winchester"},{"city":"Wolverhampton"},{"city":"Worcester"},{"city":"York"}]

const findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex)
  })
}

function displayMatches(){
  const matchArray = findMatches(this.value, cities)
  if (matchArray.length == cities.length) {
    suggestions.innerHTML = ""
  } else {
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi')
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
      return `
        <li>
          <span class="name">${cityName}</span>
        </li>
      `
    }).join('')
    suggestions.innerHTML = html
  }
}



//
// Event Listeners
//

searchInput.addEventListener('click', e => {
  e.preventDefault()
  getData(city.value)
  getForecastData(city.value)
  city.value = ''
})

city.addEventListener('change', displayMatches)
city.addEventListener('keyup', displayMatches)