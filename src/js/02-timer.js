import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const selectedDate = this.selectedDates[0].getTime();
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;

    if (deltaTime <= 0) {
      Notify.failure('Please choose a date in the future');
      btnEl.disabled = true;
    } else {
      btnEl.disabled = false;
      inputEl.disabled = true;
    }
  },
};

const fp = flatpickr(inputEl, options);

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

const onBtnClick = () => {
  btnEl.disabled = true;

  const timerStart = fp.selectedDates[0];
  timerId = setInterval(() => {
    if (timerStart.getTime() <= Date.now()) {
      clearInterval(timerId);
      return;
    }
    const deltaTime = timerStart - Date.now();
    const time = convertMs(deltaTime);

    updateTimer(time);
  }, 1000);
};
btnEl.addEventListener('click', onBtnClick);
