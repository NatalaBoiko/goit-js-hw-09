function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

start.classList.add('is-active');

let timer = null;

window.addEventListener('click', onStartBtnClick);
window.addEventListener('click', onStopBtnClick);

function onStartBtnClick(event) {
  if (event.target.textContent !== 'Start') {
    return;
  }
  start.setAttribute('disabled', '');
  timer = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  start.classList.toggle('is-active');
  stop.classList.toggle('is-active');
}

function onStopBtnClick(event) {
  if (event.target.textContent !== 'Stop') {
    return;
  }
  clearInterval(timer);
  // body.style.backgroundColor = '';
  start.removeAttribute('disabled');
  stop.classList.toggle('is-active');
  start.classList.toggle('is-active');
}
