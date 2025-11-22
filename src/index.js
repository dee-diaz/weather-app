import './style.css';

const toggleBtn = document.getElementById('tempToggle');
const tempLabels = document.querySelectorAll('.temp-label');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');

  tempLabels.forEach((label) => {
    label.classList.toggle('active');
  });
});
