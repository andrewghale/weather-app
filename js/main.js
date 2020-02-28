jQuery(document).ready(function($) {

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
    return hours
  }

  const generateHtml = (data) => {
    const { weather, main, sys, name } = data;
    const html = `
    <div class="output-container">
      <h1>${name}</h1>
      <p>${capitalizeFirst(weather[0].description)}</p>
      <p>${main.temp.toFixed(1)}&#176;C</p>
      <p>Sunrise: ${epochToUtc(sys.sunrise)}</p>
      <p>Sunset: ${epochToUtc(sys.sunset)}</p>
    </div>
    `
    const outputDiv = document.getElementById('output')
    outputDiv.innerHTML = html
    init()
  }

  const dotw = (timestamp) => {
    const date = new Date( timestamp * 1000)
    let hours = date.getDay().toString()
    return hours
  }

  const numberToDay = (number) => {
    if (number == 5) {
      return "Fri"
    }
    if (number == 6) {
      return "Sat"
    }
    if (number == 0) {
      return "Sun"
    }
    if (number == 1) {
      return "Mon"
    }
    if (number == 2) {
      return "Tue"
    }
    if (number == 3) {
      return "Wed"
    }
    if (number == 4) {
      return "Thu"
    }
  }

  const generateForecastHtml = (data) => {
    let temps = ''
    // console.log(data.list)
    data.list.forEach((el) => {
      const { dt, main, rain, wind } = el
      let tempString =
      `<li
        class="three-hour
          ${epochToTime(dt) === 00 ? "indent rounded-left" : "none"}
          ${epochToTime(dt) === 21 ? "rounded-right" : "none"}
        "
        id="${dt}">
        <div class="card">
        <div class="time">
          <div class="day">${numberToDay(dotw(dt))}</div>
          <div class="24hr-time">
            <span class="bold">${
              JSON.stringify(epochToTime(dt)).padStart(2, '0')}
            </span>00
          </div>
          </div>
          <div class="temp">
          <div class="icon-container">
            <img src="http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png">
          </div>
          <div class="temp-number">
            ${JSON.stringify(Math.round(main["temp"]))}&#176;
          </div>
          </div>
          <div class="wind">
            <img src="../img/wind.svg" alt="wind">
            ${JSON.stringify(Math.round(wind["speed"]))}
          </div>
        </div>
        <div class="card-large">
          <h3>${capitalizeFirst(el.weather[0].description)}</h3>
          <dl>
            <dt>Humidity</dt>
            <dd>${main.humidity}<span class="mm">%</span></dd>
            <dt>Pressure</dt>
            <dd>${main.pressure}<span class="mm">hPa</span></dd>
          </dl>
          <dl>
            <dt>Feels Like</dt>
            <dd>${main.feels_like}&#176;</dd>
          </dl>
          <dl>
            <dt>Rain</dt>
            <dd>${ rain ? rain["3h"] : "n/a" }<span class="mm">mm</span></dd>
          </dl>
        </div>
      </li>`
      temps = temps.concat(tempString)
    })
    const html = `
      ${temps}
    `
    const outputForecastDiv = document.getElementById('output-forecast')
    outputForecastDiv.innerHTML = html
    init()
  }

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

  const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  const init = () => {
    let allPanels = $('.card-large').hide();
    $('.three-hour').click(function() {
      let cardLarge = document.querySelector(".card-large")
      allPanels.hide()
      $(this)
        .children(cardLarge)
        .show()
    });
  }

  init()

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

});