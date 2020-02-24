const city = document.getElementById("cityInput")
const searchInput = document.getElementById("searchInput")
const suggestions = document.querySelector(".suggestions")


searchInput.addEventListener('click', e => {
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


// const getCities = () => {
//   const citiesUrl = "https://gist.githubusercontent.com/andrewghale/e2dad9afd1aaf95bd16dec88c7b8a1bb/raw/5aa8b1e321458f1775329cc6adb6e2ad0fc39d4a/citiesUK"

//   fetch(citiesUrl)
//     .then( (data) => data.json())
//     .then( (data) => console.log(data))
// }



// const displayTemp = (temp) => {

// }

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


///////////////////
////////////////////
//////////////////

// use below function on this url
// https://en.wikipedia.org/wiki/List_of_cities_in_the_United_Kingdom#List_of_cities

const mainArr = () => {
  let cities = []
  const category = document.querySelector(".wikitable")
  const body = Array.from(category.querySelectorAll("tbody tr"))
  body.forEach((element) => {
    const link = Array.from(element.querySelectorAll("a"))
    const city = link[0].text
    cities.push({"city":city})
  })
  console.log(JSON.stringify(cities))
}

// console.log(JSON.stringify(uniqueNames))

////////////////////
/////////////////////
//////////////////

// const cities = []
// const fetchTest = () => {
//   const url = "https://gist.githubusercontent.com/andrewghale/c972506d41833c4dd8db51d761e1b3f6/raw/838d146ef12c96ae534ce6fff7b0892667e67f60/citiesUK.json"
//   fetch(url)
//     .then( blob => blob.json() )
//     .then( data => cities.push(...data))
//   return cities
//   }
//   console.log(cities)

const cities = [{"city":"Aberdeen"},{"city":"Armagh"},{"city":"Bangor"},{"city":"Bath"},{"city":"Belfast"},{"city":"Birmingham"},{"city":"Bradford"},{"city":"Brighton & Hove"},{"city":"Bristol"},{"city":"Cambridge"},{"city":"Canterbury"},{"city":"Cardiff"},{"city":"Carlisle"},{"city":"Chelmsford"},{"city":"Chester"},{"city":"Chichester"},{"city":"Coventry"},{"city":"Derby"},{"city":"Derry"},{"city":"Dundee"},{"city":"Durham"},{"city":"Edinburgh"},{"city":"Ely"},{"city":"Exeter"},{"city":"Glasgow"},{"city":"Gloucester"},{"city":"Hereford"},{"city":"Inverness"},{"city":"Kingston upon Hull"},{"city":"Lancaster"},{"city":"Leeds"},{"city":"Leicester"},{"city":"Lichfield"},{"city":"Lincoln"},{"city":"Lisburn"},{"city":"Liverpool"},{"city":"London"},{"city":"Manchester"},{"city":"Newcastle upon Tyne"},{"city":"Newport"},{"city":"Newry"},{"city":"Norwich"},{"city":"Nottingham"},{"city":"Oxford"},{"city":"Perth"},{"city":"Peterborough"},{"city":"Plymouth"},{"city":"Portsmouth"},{"city":"Preston"},{"city":"Ripon"},{"city":"St Albans"},{"city":"St Asaph"},{"city":"St Davids"},{"city":"Salford"},{"city":"Salisbury"},{"city":"Sheffield"},{"city":"Southampton"},{"city":"Stirling"},{"city":"Stoke-on-Trent"},{"city":"Sunderland"},{"city":"Swansea"},{"city":"Truro"},{"city":"Wakefield"},{"city":"Wells"},{"city":"Westminster"},{"city":"Winchester"},{"city":"Wolverhampton"},{"city":"Worcester"},{"city":"York"}]

const findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex)
  })
}

function displayMatches(){
  // console.log(this.value)
  const matchArray = findMatches(this.value, cities)
  console.log(matchArray)
}

city.addEventListener('change', displayMatches)
city.addEventListener('keyup', displayMatches)