'use strict';

const methodOverride = require('method-override');
const apiRoutes = require('./api-routes.js');
const pageRoutes = require('./page-routes.js');
const express = require('express');
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(methodOverride((request, response) => {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// Static folder access
app.use(express.static('./public'));

// Dynamic Routes
app.use(apiRoutes);
app.use(pageRoutes);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
