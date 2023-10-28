const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config

const pubDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve

app.use(express.static(pubDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sumiya Sayeed',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Sumiya Sayeed',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Sumiya Sayeed',
    message: 'How can I help you? Just tell me.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term for address',
    });
  }

  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({
        error: 'No found weather info',
      });
    } else {
      forecast(lat, lon, (error, forecastData) => {
        if (error) {
          return res.send({
            error: 'No found weather info',
          });
        } else {
          return res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        }
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

// app.get('/weather', (req, res) => {
//   const place = 'Dhaka';
//   const temp = '27 degree';
//   res.send(`We live in <h>${place}</h1>. Temperature is ${temp}`);
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>it is all about ABOUT!!!!</h1>');
// });

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404!',
    name: 'Sumiya Sayeed',
    message: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404!',
    name: 'Sumiya Sayeed',
    message: '404 not found',
  });
});

app.listen(3000, () => {
  console.log('Started server on 3000');
});
