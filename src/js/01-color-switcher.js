function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

window.addEventListener('click', onStartBtnClick);
window.addEventListener('click', onStopBtnClick);

start.classList.add('is-active');
stop.disabled = true;

let timer = null;

function onStartBtnClick(event) {
  if (event.target.textContent !== 'Start') {
    return;
  }
  start.disabled = true;
  stop.disabled = false;

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
  start.disabled = false;
  stop.classList.toggle('is-active');
  start.classList.toggle('is-active');
}
