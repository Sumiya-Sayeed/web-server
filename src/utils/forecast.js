const request = require('request');

const forecast = (lat, lon, callback) => {
  const link = `http://api.weatherstack.com/current?access_key=d8d0ed7a44a30266cb91fd1b47f4fdc6&query=${lat},${lon}`;

  request({ url: link, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect!', undefined);
    } else if (response.body.error) {
      const {
        body: { error },
      } = response;
      callback(error.message, undefined);
    } else {
      const {
        body: { current },
      } = response;
      callback(
        undefined,
        `${current.weather_descriptions[0]}: Temperature is out there ${current.temperature}, actual feels ${current.feelslike}. ${current.precip}%`,
      );
    }
  });
};

module.exports = forecast;

// const url =
//   'http://api.weatherstack.com/current?access_key=d8d0ed7a44a30266cb91fd1b47f4fdc6&query=&units=f';

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect');
//   } else if (response.body.error.code) {
//     console.log('Unable to find the location');
//   } else {
//     const {
//       body: { current },
//     } = response;
//     console.log(
//       `${current.weather_descriptions[0]}: Temperature is out there ${current.temperature}, actual feels ${current.feelslike}. ${current.precip}%`,
//     );
//   }
// });
