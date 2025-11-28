const autocompleteResults = document.querySelector('#autocompleteResults');
const searchInput = document.querySelector('#searchInput');
const locationsList = autocompleteResults.querySelector('ul');

let debounceTimer;

async function showAutocompleteOptions() {
  searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();

    if (query.length === 0) {
      autocompleteResults.classList.remove('open');
      return;
    }

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      if (query.length > 0) {
        autocompleteResults.classList.add('open');

        try {
          const response = await fetch(
            `https://secure.geonames.org/searchJSON?name_startsWith=${query}&maxRows=5&username=deediaz13&featureClass=P&orderby=population`,
          );
          const data = await response.json();

          if (!data.geonames || data.geonames.length === 0) {
            autocompleteResults.classList.remove('open');
            return;
          }

          locationsList.innerHTML = '';

          data.geonames.forEach((city) => {
            const li = document.createElement('li');
            let location;
            if (city.adminName1 && city.adminName1 !== city.name) {
              location = `${city.name}, ${city.adminName1}, ${city.countryCode}`;
            } else {
              location = `${city.name}, ${city.countryCode}`;
            }

            li.textContent = location;
            locationsList.appendChild(li);
          });
        } catch (error) {
          console.error('Error fetching cities:', error);
          autocompleteResults.classList.remove('open');
        }
      }
    }, 300);
  });
}

export default showAutocompleteOptions;
