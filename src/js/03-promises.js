import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const btnEl = document.querySelector('button');

formEl.addEventListener('submit', onBtnClick);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onBtnClick(evt) {
  evt.preventDefault();
  const delay = `${delayEl.value}`;
  const delayStep = `${stepEl.value}`;
  const amount = `${amountEl.value}`;
  let newDelay = delay;

  for (let position = 0; position < amount; position += 1) {
    newDelay += delayStep;
    createPromise({ position, newDelay })
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  // formEl.reset();
}
