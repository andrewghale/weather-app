jQuery(document).ready(function($) {

  const city = document.getElementById("cityInput")
  const searchInput = document.getElementById("searchInput")
  // const suggestions = document.querySelector(".suggestions")
  const iconPath = "http://openweathermap.org/img/wn/"

  const getData = async (input) => {
    const apiData = {
      url: 'http://api.openweathermap.org/data/2.5/weather?q=',
      city: `${input}`,
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
      city: `${input}`,
      units: '&units=metric',
      apiKey: '&appid=439e8e6881a90ec4a633579b93341e40'
    }
    const {url, city, units, apiKey} = apiData
    const apiUrl = `${url}${city}${units}${apiKey}`
    fetch(apiUrl)
      .then( (data) => data.json())
      .then( (data) => generateForecastHtml(data) )
  }

  // const getCoordinates = async (input) => {
  //   const apiData = {
  //     url: 'http://api.openweathermap.org/data/2.5/weather?q=',
  //     city: `${input}`,
  //     units: '&units=metric',
  //     apiKey: '&appid=439e8e6881a90ec4a633579b93341e40'
  //   }
  //   const {url, city, units, apiKey} = apiData
  //   const apiUrl = `${url}${city}${units}${apiKey}`
  //   await fetch(apiUrl)
  //     .then( (data) => data.json())
  //     .then( (data) => console.log(data) )
  // }

  // function initMap(lat, lon) {
  //   let city = {lat: lat, lng: lon};
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 7,
  //     center: city,
  //     disableDefaultUI: true,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   });
  //   const marker = new google.maps.Marker({
  //     position: city,
  //     map: map,
  //     title: 'bristol_location'
  //   });
  // }

  const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
  const dotw = (timestamp) => {
    const date = new Date( timestamp * 1000)
    let hours = date.getDay().toString()
    return hours
  }
  const numberToDay = (number) => {
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
    if (number == 5) {
      return "Fri"
    }
    if (number == 6) {
      return "Sat"
    }
  }
  const generateTempClass = (number) => {
    if (number < -9) {
      return "frigid"
    } else if (number >= -9 && number < 0) {
      return "freezing"
    } else if (number >= 0 && number < 7) {
      return "very cold"
    } else if (number >= 7 && number < 13) {
      return "cold"
    } else if (number >= 13 && number < 18) {
      return "cool"
    } else if (number >= 18 && number < 24) {
      return "comfortable"
    } else if (number >= 24 && number < 29) {
      return "warm"
    } else if (number >= 29 && number < 35) {
      return "hot"
    } else if (number > 35) {
      return "sweltering"
    }
  }

    // Idea is to get temperature as a number, convert to rgb number range which would make hot temperatures color = red and cold temperatures color = blue

  // const tempColorChange = (number) => {
  //   // number = -number
  //   const tempColor = document.getElementById("temp-color")
  //   tempColor.style.color=`rgb(255, ${number*8}, 0)`;
  // }

    // Mapbox

  function initMapBox(lng, lat) {
    mapboxgl.accessToken =
    "pk.eyJ1IjoiYWdoNDciLCJhIjoiY2s3YjEzMm93MTVtZzNnczRuNWR0NTlwMiJ9.0eKq69N2wsmdyJaImfSFgQ";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 8 // starting zoom
    });
  }

  const generateHtml = (data) => {
    const { coord, weather, main, sys, timezone, name } = data;
    // console.log(data)
    const html = `
    <div class="title">
      <div class="city">
        <h1>${name}, ${sys.country}</h1>
        <img src="https://www.countryflags.io/${sys.country}/shiny/64.png" alt="${sys.country}">
      </div>
      <div class="temp-container">
        <div class="temp-icon-container">
          <img src="../img/thermometer.svg">
        </div>
        <p id="temp-color" class="${generateTempClass(main.temp)}">${main.temp.toFixed(1)}&#176;C</p>
      </div>
      <p class="desc">${capitalizeFirst(weather[0].description)}</p>
      <div class="sun-container">
        <div class="icon-container">
          <img src="../img/dawn.svg">
        </div>
        <div class="sun-time">
          <p>${epochToUtc(sys.sunrise + timezone)}</p>
          <p>GMT${Math.sign(timezone) === 1 ? "+" : ""}${timezone/3600 === 0 ? "" : timezone/3600}</p>
        </div>
        <div class="icon-container">
          <img src="../img/sunset.svg">
        </div>
        <div class="sun-time">
          <p>${epochToUtc(sys.sunset + timezone)}</p>
          <p>GMT${Math.sign(timezone) === 1 ? "+" : ""}${timezone/3600 === 0 ? "" : timezone/3600}</p>
        </div>
      </div>
    </div>
    `
    const outputDiv = document.getElementById('output')
    outputDiv.innerHTML = html
    initMapBox(coord.lon, coord.lat)
    init()
  }

  const generateForecastHtml = (data) => {
    let temps = ''
    data.list.forEach((el) => {
      const { dt, main, rain, wind } = el
      let tempString =
      `<li class="three-hour ${epochToTime(dt) === 00 ? "indent rounded-left":""}
        ${epochToTime(dt)===21?"rounded-right":""}">
        <div class="card">
          <div class="time">
            <div class="day">${numberToDay(dotw(dt))}</div>
            <div class="24hr-time"><span class="bold">${JSON.stringify(epochToTime(dt)).padStart(2, '0')}</span>00</div>
          </div>
          <div class="temp">
            <div class="icon-container">
              <img src="${iconPath}${el.weather[0].icon}@2x.png">
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
            <div class="card-large-inner">
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

    // const findMatches = (wordToMatch, cities) => {
    //   return cities.filter(place => {
    //     const regex = new RegExp(wordToMatch, 'gi')
    //     return place.city.match(regex)
    //   })
    // }

    // function displayMatches(){
    //   const matchArray = findMatches(this.value, cities)
    //   if (matchArray.length == cities.length) {
    //     suggestions.innerHTML = ""
    //   } else {
    //     const html = matchArray.map(place => {
    //       const regex = new RegExp(this.value, 'gi')
    //       const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    //       return `
    //       <li>
    //       <span class="name">${cityName}</span>
    //       </li>
    //       `
    //     }).join('')
    //     suggestions.innerHTML = html
    //   }
    // }

    const init = () => {
      $('.three-hour').click(function() {
        let cardLarge = $('.card-large')
        let allCards = $('.card-large')
        allCards.removeClass('show-card-large')
        $(this)
        .find(cardLarge)
        .toggleClass('show-card-large')
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

  // city.addEventListener('change', displayMatches)
  // city.addEventListener('keyup', displayMatches)
});