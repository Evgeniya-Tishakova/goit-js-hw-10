// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const date = new Date();
console.log('Date: ', date);

let userSelectedDate;
let startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    let dateNow = new Date();
    if (selectedDates[0].getTime() < dateNow.getTime()) {
      startBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      return;
    }

    startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let daysElem = document.querySelector('[data-days]');
let hoursElem = document.querySelector('[data-hours]');
let minutesElem = document.querySelector('[data-minutes]');
let secondsElem = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const intervalTime = setInterval(() => {
    let dateNow = new Date();
    const total = userSelectedDate.getTime() - dateNow.getTime();

    if (total <= 0) {
      clearInterval(intervalTime);
      return;
    }
    console.log(total);
    let { days, hours, minutes, seconds } = convertMs(total);
    daysElem.innerHTML = addLeadingZero(
      days,
      String(days).length < 2 ? 2 : String(days).length
    );
    hoursElem.innerHTML = addLeadingZero(hours, 2);
    minutesElem.innerHTML = addLeadingZero(minutes, 2);
    secondsElem.innerHTML = addLeadingZero(seconds, 2);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value, targetLength) {
  return value.toString().padStart(targetLength, '0');
}
