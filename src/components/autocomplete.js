import cities from 'cities.json';

const autocompleteResults = document.querySelector('#autocompleteResults');
const searchInput = document.querySelector('#searchInput');
const locationsList = autocompleteResults.querySelector('ul');

export function showAutocompleteOptions() {
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length === 0)
      autocompleteResults.classList.remove('open');
    if (searchInput.value.length > 0) {
      const val = searchInput.value.toLowerCase();
      autocompleteResults.classList.add('open');

      const filtered = cities.filter((city) => {
        if (city.name.toLowerCase().startsWith(val)) {
          return city;
        }
      });

      locationsList.innerHTML = '';

      for (let i = 0; i < filtered.length; i++) {
        if (i === 5) break;

        const li = document.createElement('li');
        li.textContent = `${filtered[i].name}, ${filtered[i].country}`;

        locationsList.appendChild(li);
      }
    }
  });
}

export function initAutocompleteValSelection() {
  autocompleteResults.addEventListener('click', (e) => {
    const selectedLi = e.target.closest('li');

    searchInput.value = selectedLi.textContent;
    autocompleteResults.classList.remove('open');
  });
}
