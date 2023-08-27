import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

initForm();

formEl.addEventListener('submit', formSubmitHendler);
formEl.addEventListener('input', throttle(formInputHendler, 500));

function formSubmitHendler(evt) {
  evt.preventDefault();
  if (!evt.target.email.value || !evt.target.message.value) {
    alert('Enter all data');
    return;
  }
  const formData = new FormData(formEl);
  formData.forEach((value, name) => console.log(value, name));
  evt.target.reset();
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
