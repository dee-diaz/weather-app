import { formatTime, getValueOrDefault, formatDate } from './utils';
import { formatInTimeZone } from 'date-fns-tz';
import { fromUnixTime } from 'date-fns';
import { convertCtoF } from './utils';

const todaysTempEl = document.querySelector('#todaysTemp');
const maxTempEl = document.querySelector('#maxTemp');
const minTempEl = document.querySelector('#minTemp');
const feelsLikeEl = document.querySelector('#feelsLike');

export const UNITS = {
  KMH: 'km/h',
  MPH: 'mph',
  CELCIUS: '°C',
  FAHRENHEIT: '°F',
  PERCENT: '%',
};

const ICONS = {
  CLEAR_DAY: 'clear-day',
  CLEAR_NIGHT: 'clear-night',
  CLOUDY: 'cloudy',
  PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
  PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night',
  RAIN: 'rain',
  SNOW: 'snow',
  WIND: 'wind',
  FOG: 'fog',
  SLEET: 'sleet',
  HAIL: 'hail',
  THUNDER_RAIN: 'thunder-rain',
  SHOWERS_DAY: 'showers-day',
  SHOWERS_NIGHT: 'showers-night',
  SNOW_SHOWERS_DAY: 'snow-showers-day',
  SNOW_SHOWERS_NIGHT: 'snow-showers-night',
  THUNDER_SHOWERS_DAY: 'thunder-showers-day',
  THUNDER_SHOWERS_NIGHT: 'thunder-showers-night',
};

export function renderWeatherDetailsData(address, conditions, days, timezone) {
  const locationEl = document.querySelector('#location');
  const dateTimeEl = document.querySelector('#dateTime');
  const todaysTempIcon = document.querySelector('#todaysTempIcon');
  const descriptionEl = document.querySelector('#description');
  const windSpeedEl = document.querySelector('#wind-speed');
  const gustsEl = document.querySelector('#gusts');
  const uvEl = document.querySelector('#uvIndex');
  const humidityEl = document.querySelector('#humidity');
  const rainChanceEl = document.querySelector('#rainChance');
  const sunriseEl = document.querySelector('#sunrise');
  const sunsetEl = document.querySelector('#sunset');

  locationEl.textContent = address;
  dateTimeEl.textContent = formatInTimeZone(new Date(), timezone, 'MMMM d');
  todaysTempEl.textContent = Math.round(conditions.temp) + ' ' + UNITS.CELCIUS;

  loadIcon(todaysTempIcon, conditions.icon);

  maxTempEl.textContent = Math.round(days[0].tempmax) + ' ' + UNITS.CELCIUS;
  minTempEl.textContent = Math.round(days[0].tempmin) + ' ' + UNITS.CELCIUS;
  feelsLikeEl.textContent =
    Math.round(conditions.feelslike) + ' ' + UNITS.CELCIUS;
  descriptionEl.textContent = conditions.conditions;

  windSpeedEl.textContent = getValueOrDefault(
    Math.round(conditions.windspeed),
    UNITS.KMH,
  );
  gustsEl.textContent = getValueOrDefault(
    Math.round(conditions.windgust),
    UNITS.KMH,
  );

  uvEl.textContent = conditions.uvindex;
  humidityEl.textContent = getValueOrDefault(
    Math.round(conditions.humidity),
    UNITS.PERCENT,
  );
  rainChanceEl.textContent = conditions.precipprob + UNITS.PERCENT;

  const sunrise = fromUnixTime(days[0].sunriseEpoch);
  const sunset = fromUnixTime(days[0].sunsetEpoch);
  sunriseEl.textContent = formatInTimeZone(sunrise, timezone, 'HH:mm');
  sunsetEl.textContent = formatInTimeZone(sunset, timezone, 'HH:mm');
}

export function renderHourlyForecastData(day, timezone, scale) {
  const container = document.querySelector('.hourly-forecast');
  container.innerHTML = '';
  const todayHours = day.hours;
  const localTime = formatInTimeZone(new Date(), timezone, 'HH');
  const filteredHours = todayHours.slice(localTime);

  filteredHours.forEach((hour, index) => {
    const div = document.createElement('div');
    div.className = 'hour';
    const para = document.createElement('p');
    para.setAttribute('data-hourly-hour', '');
    index === 0
      ? (para.textContent = 'Now')
      : (para.textContent = formatTime(hour.datetime));

    const iconDiv = document.createElement('div');
    iconDiv.setAttribute('data-hourly-icon', '');
    const iconImg = document.createElement('img');
    loadIcon(iconImg, hour.icon);

    const span = document.createElement('span');
    span.setAttribute('data-hourly-temp', '');
    if (scale === UNITS.CELCIUS) {
      span.textContent = Math.round(hour.temp) + ` ${UNITS.CELCIUS}`;
    } else {
      span.textContent = convertCtoF(hour.temp) + ` ${UNITS.FAHRENHEIT}`;
    }

    iconDiv.appendChild(iconImg);
    div.appendChild(para);
    div.appendChild(iconDiv);
    div.appendChild(span);
    container.appendChild(div);
  });
}

export function renderWeeklyForecastData(days, scale) {
  const container = document.querySelector('.weekly-forecast');
  container.innerHTML = '';
  const eightDays = days.slice(1, 9);

  eightDays.forEach((day) => {
    const li = document.createElement('li');
    const dayName = document.createElement('p');
    dayName.className = 'day';
    dayName.textContent = formatDate(day.datetime);
    const divIcon = document.createElement('div');
    divIcon.className = 'icon';
    const iconImg = document.createElement('img');
    loadIcon(iconImg, day.icon);
    const minMax = document.createElement('p');
    const min = document.createElement('span');
    min.className = 'min';
    const max = document.createElement('span');
    max.className = 'max';
    if (scale === UNITS.CELCIUS) {
      max.textContent = Math.round(day.tempmax) + ` ${UNITS.CELCIUS}`;
      min.textContent = Math.round(day.tempmin) + ` ${UNITS.CELCIUS}`;
    } else {
      max.textContent = convertCtoF(day.tempmax) + ` ${UNITS.FAHRENHEIT}`;
      min.textContent = convertCtoF(day.tempmin) + ` ${UNITS.FAHRENHEIT}`;
    }

    const hyphen = document.createElement('span');
    hyphen.textContent = ' - ';

    divIcon.appendChild(iconImg);
    minMax.appendChild(min);
    minMax.appendChild(hyphen);
    minMax.appendChild(max);

    li.appendChild(dayName);
    li.appendChild(divIcon);
    li.appendChild(minMax);

    container.appendChild(li);
  });
}

export function rerenderWeatherDetails(activeScale, conditions, days) {
  if (activeScale === UNITS.FAHRENHEIT) {
    todaysTempEl.textContent =
      convertCtoF(conditions.temp) + ` ${UNITS.FAHRENHEIT}`;
    maxTempEl.textContent =
      convertCtoF(days[0].tempmax) + ` ${UNITS.FAHRENHEIT}`;
    minTempEl.textContent =
      convertCtoF(days[0].tempmin) + ` ${UNITS.FAHRENHEIT}`;
    feelsLikeEl.textContent =
      convertCtoF(conditions.feelslike) + ` ${activeScale}`;
  } else if (activeScale === UNITS.CELCIUS) {
    todaysTempEl.textContent =
      Math.round(conditions.temp) + ` ${UNITS.CELCIUS}`;
    maxTempEl.textContent = Math.round(days[0].tempmax) + ` ${UNITS.CELCIUS}`;
    minTempEl.textContent = Math.round(days[0].tempmin) + ` ${UNITS.CELCIUS}`;
    feelsLikeEl.textContent =
      Math.round(conditions.feelslike) + ` ${UNITS.CELCIUS}`;
  }
}

function loadIcon(element, icon) {
  if (icon === ICONS.SNOW_SHOWERS_DAY || icon === ICONS.SNOW_SHOWERS_NIGHT) {
    import('../assets/img/hail.svg').then(
      (module) => (element.src = module.default),
    );
  } else if (
    icon === ICONS.THUNDER_SHOWERS_DAY ||
    icon === ICONS.THUNDER_SHOWERS_NIGHT
  ) {
    import('../assets/img/thunder-rain.svg').then(
      (module) => (element.src = module.default),
    );
  } else {
    import(`../assets/img/${icon}.svg`).then(
      (module) => (element.src = module.default),
    );
  }
}
