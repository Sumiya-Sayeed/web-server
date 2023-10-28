// console.log('client side js file here it is!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch('http://localhost:3000/weather?address=dhaka').then((response) => {
//   console.log('sfd');
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location, data.forecaset);
//     }
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#error');
const messagetwo = document.querySelector('#weather-data');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messagetwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messagetwo.textContent = data.forecaset;
        }
      });
    },
  );
});
