import './style.css';
import initToggleBtn from './components/toggleButton';
import { showAutocompleteOptions, initAutocompleteValSelection } from './components/autocomplete';


document.addEventListener("DOMContentLoaded", () => {
  initToggleBtn();
  showAutocompleteOptions();
  initAutocompleteValSelection();
})
