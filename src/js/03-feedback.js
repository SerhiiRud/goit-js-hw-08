import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

restoreInput();

function saveInput(event) {
  event.preventDefault();

  const { email, message } = formEl.elements;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email: email.value,
      message: message.value,
    })
  );
  restoreInput();
}

function restoreInput() {
  try {
    const restoredInput = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (restoredInput) {
      formEl.email.value = restoredInput.email;
      formEl.message.value = restoredInput.message;
    }
  } catch (error) {
    console.log(error.message);
  }
}

function onSubmit(event) {
  if (
    event.currentTarget.email.value === '' ||
    event.currentTarget.message.value === ''
  ) {
    return alert(`Please fill all fields!`);
  }
  event.preventDefault();
  const messageObject = {
    email: formEl.email.value,
    message: formEl.message.value,
  };
  console.log(messageObject);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

formEl.addEventListener('input', throttle(saveInput, 500));
formEl.addEventListener('submit', onSubmit);
