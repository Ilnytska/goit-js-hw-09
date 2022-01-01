import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputFlatpickr: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),

}
let timerId;
let currentDate;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
   selectedDate = selectedDates[0];
    currentDate = new Date();
    
      if (selectedDate.getTime() < currentDate.getTime()) {
      refs.startBtn.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
      }
      refs.startBtn.removeAttribute('disabled');
    renderTimer(selectedDate, currentDate);
    clearInterval(timerId);
  },
};



function onStartBtnClick() {
 timerId = setInterval(() => {
    if (selectedDate <= new Date()) {
      clearInterval(timerId);
      refs.startBtn.setAttribute('disabled', true);
      return;
    }
refs.startBtn.setAttribute('disabled', true);
    renderTimer(selectedDate, new Date().getTime());
  }, 1000);
}


function addLeadingZero(value) {
   value = value.toString();
    if (value.length < 3) {
        return value.padStart(2, 0);
    }

        return value;
    }

function renderTimer(selectedDate, currentDate) {
  const { days, hours, minutes, seconds } = convertMs(selectedDate - currentDate);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
  return;
};


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

flatpickr(refs.inputFlatpickr, options);
refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtnClick);