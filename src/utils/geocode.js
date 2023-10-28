const request = require('request');

const geocode = (addess, callback) => {
  const link = `http://api.positionstack.com/v1/forward?access_key=22f8b4867dfbf9732492b220f8ee25d7&query=${encodeURI(
    addess,
  )}`;

  request({ url: link, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect!', undefined);
    } else if (body.error) {
      const { error } = body;
      callback(error.message, undefined);
    } else {
      callback(undefined, {
        lat: body.data[0].latitude,
        lon: body.data[0].longitude,
        location: `${body.data[0].county}, ${body.data[0].country}`,
      });
    }
  });
};

module.exports = geocode;
