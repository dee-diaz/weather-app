import './style.css';
import initToggleScales from './components/toggleButton';
import showAutocompleteOptions from './components/autocomplete';
import fetchData from './components/dataFetching';
import {
  renderWeatherDetailsData,
  renderHourlyForecastData,
  renderWeeklyForecastData,
  rerenderWeatherDetails,
  UNITS,
} from './components/renderFetchedData';

function initApp() {
  const DEFAULT_LOCATION = 'Buenos Aires, AR';
  let activeScale = UNITS.CELCIUS;
  let lastData;
  const autocompleteResults = document.querySelector('#autocompleteResults');
  const searchInput = document.querySelector('#searchInput');
  const locationsList = autocompleteResults.querySelector('ul');

  initToggleScales(changeScale);
  showAutocompleteOptions();
  let data = fetchData(DEFAULT_LOCATION);
  data.then((result) => {
    lastData = result;
    renderWeatherDetailsData(
      result.address,
      result.currentConditions,
      result.days,
      result.timezone,
    );
    renderHourlyForecastData(result.days[0], result.timezone, activeScale);
    renderWeeklyForecastData(result.days, activeScale);
  });

  autocompleteResults.addEventListener('click', (e) => {
    const selectedLi = e.target.closest('li');

    searchInput.value = selectedLi.textContent;
    let data = fetchData(searchInput.value);
    data.then((result) => {
      lastData = result;
      renderWeatherDetailsData(
        result.address,
        result.currentConditions,
        result.days,
        result.timezone,
      );
      renderHourlyForecastData(result.days[0], result.timezone, activeScale);
      renderWeeklyForecastData(result.days, activeScale);
    });
    autocompleteResults.classList.remove('open');
    locationsList.innerHTML = '';
  });

  function changeScale() {
    activeScale === UNITS.CELCIUS
      ? (activeScale = UNITS.FAHRENHEIT)
      : (activeScale = UNITS.CELCIUS);
    rerenderWeatherDetails(
      activeScale,
      lastData.currentConditions,
      lastData.days,
    );
    renderHourlyForecastData(lastData.days[0], lastData.timezone, activeScale);
    renderWeeklyForecastData(lastData.days, activeScale);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
