'use strict';

// 3rd Party
const express = require('express');

const router = express.Router();

// Routes
router.get('/', homePage);

// Route Runner Functions
function homePage(request, response) {
  response.render('site', {page: './pages/index', title:'Category List'});
}

module.exports = router;