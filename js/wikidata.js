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
