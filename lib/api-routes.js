'use strict';

const superagent = require('superagent');
const express = require('express');

const router = express.Router();
const API = 'http://localhost:3000';

router.get('/list', listPage);
router.delete('/list:_id', deleteItem);

function listPage(request, response) {
  superagent.get( `${API}/categories`)
    .then(data => {
      response.render('site', {page: './pages/list', title:'Listings', items: data.body});
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}
  
function deleteItem(request, response) {
  let _id = request.params._id;
  superagent.delete(`${API}/categories/${_id}`)
    .then( () => {
      response.redirect('/list');
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}
  
module.exports = router;