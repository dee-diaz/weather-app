import './style.css';
import initToggleBtn from './components/toggleButton';
import {
  showAutocompleteOptions,
  initAutocompleteValSelection,
} from './components/autocomplete';
import fetchData from './components/dataFetching';
import {
  renderWeatherDetailsData,
  renderHourlyForecastData,
} from './components/renderFetchedData';

function initApp() {
  const DEFAULT_LOCATION = 'Moscow, RU';
  initToggleBtn();
  showAutocompleteOptions();
  initAutocompleteValSelection();
  let data = fetchData(DEFAULT_LOCATION);
  data.then((result) => {
    renderWeatherDetailsData(result);
    renderHourlyForecastData(result);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
