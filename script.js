'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //   console.log(request.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${data.population} people</p>
//                 <p class="country__row"><span>🗣️</span> ${data.languages[0].name} </p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//     </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('usa');
// getCountryData('ireland');

const renderCountry = function (data, classname = '') {
  const html = `
    <article class="country ${classname}" >
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${data.population} people</p>
                <p class="country__row"><span>🗣️</span> ${data.languages[0].name} </p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
 }; // -------- end renderCountry --------

const getCountryAndNeighbor = function (country) {
  // Ajax call country 1
  const request = new XMLHttpRequest();
  // sets the requested URL
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // sends the request to the set URL
  request.send();

  request.addEventListener('load', function () {
    // turns recieved array of objects to one object
    const [data] = JSON.parse(this.responseText);

    // show the recieved object
    console.log(data);

    // render country 1
    renderCountry(data);

    // get neighbor country
    const [neighbors] = data.borders;
    // ^ destructored because it returns an array

    if (!neighbors) return; // if no neighbors

    // Ajax call country 2
    const requestneighbor = new XMLHttpRequest();
    // sets the requested URL
    requestneighbor.open(
      'GET',
      `https://restcountries.eu/rest/v2/alpha/${neighbors}`
      // slightly different webURL from before--
      // -- searching with 'code' and not name
    );
    // sends the request to the set URL
    requestneighbor.send();

    requestneighbor.addEventListener('load', function () {
      // console.log(this.responseText);

      // response from web URL is not an array
      const neighborData = JSON.parse(this.responseText);

      renderCountry(neighborData, 'neighbour');

      console.log(neighborData);
    });
  });
};

getCountryAndNeighbor('usa');
*/

const renderCountry = function (data, classname = '') {
  const html = `
    <article class="country ${classname}" >
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${data.population} people</p>
                <p class="country__row"><span>🗣️</span> ${data.languages[0].name} </p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}; // -------- end renderCountry --------

// const request = fetch('https://restcountries.eu/rest/v2/name/usa');

// console.log(request);

const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    // ^ returns a promise
    .then(response => response.json())
    // ^ json also returns a promise
    .then(data => {
      renderCountry(data[0]);
      // country 2
      const neighbor = data[0].borders[0];
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`); // get the returnes promise
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => alert(err));
};
btn.addEventListener('click', function () {
  getCountryData('usa');
});
// getCountryData('germany');
// -------- Coding Challenge 1 --------
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀



let thePlace;

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) throw new Error('Sorry, not sorry. Not allowed here. ');
      return response.json();
    })
    .then(data => {
      console.log(data);
      thePlace = data.country;
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${thePlace}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Sorry for party rocking ${err.message}`));
};

whereAmI(52.508, 13.381);
// console.log(thePlace);
// getCountryData(thePlace);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

*/

/*

// -------- Making a promise --------

const lotteryTicket = new Promise(function (resolve, reject) {
  setTimeout(function () {
    Math.random() >= 0.5
      ? resolve('💵 💵 YOU WIN??? 💵 💵')
      : reject(new Error('You Loose 💸 '));
  }, 2000);
});

lotteryTicket.then(res => console.log(res)).catch(err => console.error(err));

// promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3)
  .then(() => {
    console.log('Waited 3 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited another second'));

  */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   pos => resolve(pos),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok) throw new Error('Sorry, not sorry. Not allowed here. ');
      return response.json();
    })
    .then(data => {
      console.log(data);
      // thePlace = data.country;
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Sorry for party rocking ${err.message}`));
};

whereAmI();
