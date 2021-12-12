import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryCardTpl from './templates/country-cards.hbs';
const DEBOUNCE_DELAY = 300;
const countryCard = document.querySelector('.country-info');
countryCard.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));
let countryName = '';

function fetchCountries() {
  fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,name.official,capital,population,flags,languages`,
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      const markup = countryCardTpl(country);
      countryCard.innerHTML = markup;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
