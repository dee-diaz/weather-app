import { getCurrentDate, formatTime, getValueOrDefault } from './utils';

const UNITS = {
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

export function renderWeatherDetailsData(address, conditions, days) {
  const locationEl = document.querySelector('#location');
  const dateTimeEl = document.querySelector('#dateTime');
  const todaysTempEl = document.querySelector('#todaysTemp');
  const todaysTempIcon = document.querySelector('#todaysTempIcon');
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

  locationEl.textContent = address;
  dateTimeEl.textContent = getCurrentDate();
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

  sunriseEl.textContent = formatTime(conditions.sunrise);
  sunsetEl.textContent = formatTime(conditions.sunset);
}

export function renderHourlyForecastData(day) {
  const todayHours = day.hours;
  const currentHour = new Date().getHours();

  const filteredHours = todayHours.slice(currentHour);

  filteredHours.forEach((hour, index) => {
    const container = document.querySelector('.hourly-forecast');
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
    span.textContent = Math.round(hour.temp) + ' ' + UNITS.CELCIUS;

    iconDiv.appendChild(iconImg);
    div.appendChild(para);
    div.appendChild(iconDiv);
    div.appendChild(span);
    container.appendChild(div);
  });
}

export function renderWeeklyForecastData(days) {
  console.log(days);
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
