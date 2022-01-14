import Notiflix from 'notiflix';
const refs = {
  formPromise:document.querySelector('.form'),

}

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  }
  
function onSubmit(event) {
  event.preventDefault();
  let step = Number(refs.formPromise.elements.step.value);
let amount = Number(refs.formPromise.elements.amount.value);
let delay = Number(refs.formPromise.elements.delay.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`Promise ${position} created with ${delay} ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
           Notiflix.Notify.failure(`Promise ${position} not created with ${delay} ms`);
        }, delay);
      });
    
    delay += step;
  }
};


  refs.formPromise.addEventListener('submit', onSubmit);
