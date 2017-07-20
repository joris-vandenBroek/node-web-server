const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintenanceMessage: 'Site is currently under maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getWebSiteName', 'My moustache website');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our website',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pagetTitle: 'Projects',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
