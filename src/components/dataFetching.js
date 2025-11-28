const API_KEY = 'S8HGEAJV4Q7Y5J5FBEGYFK3KV';

async function fetchData(location) {
  if (!location) throw new Error('Provide the location');

  const encodedLocation = encodeURIComponent(location);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=metric&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default fetchData;
