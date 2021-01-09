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

const request = fetch('https://restcountries.eu/rest/v2/name/usa');

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
    .then(data => renderCountry(data, 'neighbour'));
};
getCountryData('usa');
