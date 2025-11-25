import './style.css';
import initToggleBtn from './components/toggleButton';
import {
  showAutocompleteOptions,
  initAutocompleteValSelection,
} from './components/autocomplete';
import fetchData from './components/dataFetching';
import { format, parse } from 'date-fns';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const DEFAULT_LOCATION = 'Saint Petersburg, RU';
  initToggleBtn();
  showAutocompleteOptions();
  initAutocompleteValSelection();
  let data = fetchData(DEFAULT_LOCATION);
  data.then((result) => {
    renderFetchedData(result);
  });
}

function renderFetchedData(data) {
  const UNITS = {
    KMH: 'km/h',
    MPH: 'mph',
    CELCIUS: '°C',
    FAHRENHEIT: '°F',
    PERCENT: '%',
  };
  const locationEl = document.querySelector('#location');
  const dateTimeEl = document.querySelector('#dateTime');
  const todaysTempEl = document.querySelector('#todaysTemp');
  // const todaysTempIcon = document.querySelector('#todaysTempIcon');
  const maxTempEl = document.querySelector('#maxTemp');
  const minTempEl = document.querySelector('#minTemp');
  const feelsLikeEl = document.querySelector('#feelsLike');
  const descriptionEl = document.querySelector('#description');
  const windSpeedEl = document.querySelector('#wind-speed');
  const gustsEl = document.querySelector('#gusts');
  const uvEl = document.querySelector('#uvIndex');
  const humidityEl = document.querySelector('#humidity');
  const rainChanceEl = document.querySelector('#rainChance');
  const sunriseEl = document.querySelector('#sunrise');
  const sunsetEl = document.querySelector('#sunset');

  locationEl.textContent = data.address;
  dateTimeEl.textContent = getCurrentDate();
  todaysTempEl.textContent =
    Math.round(data.currentConditions.temp) + ' ' + UNITS.CELCIUS;
  maxTempEl.textContent =
    Math.round(data.days[0].tempmax) + ' ' + UNITS.CELCIUS;
  minTempEl.textContent =
    Math.round(data.days[0].tempmin) + ' ' + UNITS.CELCIUS;
  feelsLikeEl.textContent =
    Math.round(data.currentConditions.feelslike) + ' ' + UNITS.CELCIUS;
  descriptionEl.textContent = data.currentConditions.conditions;
  windSpeedEl.textContent = getValueOrDefault(
    data.currentConditions.windspeed,
    UNITS.KMH,
  );
  gustsEl.textContent = getValueOrDefault(
    data.currentConditions.windgust,
    UNITS.KMH,
  );
  uvEl.textContent = data.currentConditions.uvindex;
  humidityEl.textContent = getValueOrDefault(
    Math.round(data.currentConditions.humidity),
    UNITS.PERCENT,
  );
  rainChanceEl.textContent = data.currentConditions.precipprob + UNITS.PERCENT;

  sunriseEl.textContent = formatTime(data.currentConditions.sunrise);
  sunsetEl.textContent = formatTime(data.currentConditions.sunset);
}

// Utility functions
function getCurrentDate() {
  const date = new Date();
  const formatted = format(date, 'MMMM d');
  return formatted;
}

function formatTime(timeStr) {
  return format(parse(timeStr, 'HH:mm:ss', new Date()), 'HH:mm');
}

function getValueOrDefault(value, unit) {
  return !value ? 'N/A' : `${value} ${unit}`;
}
