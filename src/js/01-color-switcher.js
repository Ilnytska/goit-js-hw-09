refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}
let timerId = null;

function onStartClick() {
    timerId = setInterval(() => {
        const color = getRandomHexColor()
    document.body.style.background = color;

  }, 1000);
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true); 
}

function onStopClick() {
    clearInterval(timerId);
       refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);