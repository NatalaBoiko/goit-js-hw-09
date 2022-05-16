function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const start = document.querySelector('[data-start]');
// console.log(start.textContent);

const stop = document.querySelector('[data-stop]');
// console.log(stop.nodeName);
const body = document.querySelector('body');
// console.log(body.style);

let timer = null;

window.addEventListener('click', onStartBtnClick);
window.addEventListener('click', onStopBtnClick);

function onStartBtnClick(event) {
  if (event.target.textContent !== 'Start') {
    return;
  }
  console.log('hello');
  start.setAttribute('disabled', '');
  timer = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onStopBtnClick(event) {
  if (event.target.textContent !== 'Stop') {
    return;
  }
  console.log('bye');
  clearInterval(timer);
  // body.style.backgroundColor = '';
  start.removeAttribute('disabled');
}
