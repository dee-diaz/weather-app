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
  renderWeeklyForecastData,
} from './components/renderFetchedData';

function initApp() {
  const DEFAULT_LOCATION = 'Kiribati';
  initToggleBtn();
  showAutocompleteOptions();
  initAutocompleteValSelection();
  let data = fetchData(DEFAULT_LOCATION);
  data.then((result) => {
    renderWeatherDetailsData(
      result.address,
      result.currentConditions,
      result.days,
      result.timezone,
    );
    renderHourlyForecastData(result.days[0], result.timezone);
    renderWeeklyForecastData(result.days);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
