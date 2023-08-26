import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

initForm();

formEl.addEventListener('submit', formSubmitHendler);
formEl.addEventListener('input', throttle(formInputHendler, 500));

function formSubmitHendler(evt) {
  evt.preventDefault();
  const formData = new FormData(formEl);
  formData.forEach((name, value) => console.log(name, value));
  localStorage.removeItem(STORAGE_KEY);
}

function formInputHendler(evt) {
  let savedFilters = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  savedFilters[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFilters));
}

function initForm() {
  let savedFilters = localStorage.getItem(STORAGE_KEY);
  if (savedFilters) {
    savedFilters = JSON.parse(savedFilters);
    Object.entries(savedFilters).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}
