// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const fieldset = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formEl.elements.state.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${formEl.elements.delay.value}ms`);
      } else {
        reject(`❌ Rejected promise in ${formEl.elements.delay.value}ms`);
      }
    }, formEl.elements.delay.value);
  });

  fieldset
    .then(message => {
      return iziToast.success({
        title: 'Ok',
        message: message,
      });
    })
    .catch(error => {
      return iziToast.error({
        title: 'Error',
        message: error,
      });
    });
});
