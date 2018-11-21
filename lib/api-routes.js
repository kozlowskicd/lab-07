'use strict';

const superagent = require('superagent');
const express = require('express');

const router = express.Router();
const API = 'localhost:3000';

router.get('/categories', listPage);
router.post('/categories', postItem);
router.delete('/categories', deleteItem);
router.patch('/categories', patchItem);

function listPage(request, response) {
  superagent.get(`${API}/categories`)
    .then(data => {
      response.render('site', {page: './pages/categories', title:'Listings', items: data.body});
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error'});
    });
}
  
function postItem(request, response) {
  superagent.post(`${API}/categories`)
    .then( () => {
      response.redirect('/categories');
    })
    .catch( error => {
      response.render('site', {page: './pages/error', title:'Error', error:error});
    });
}

function patchItem (request, response) {
  superagent.put(`${API}/categories/${request.body._id}`)
    .send(request.body)
    .then(() => {
      response.redirect('/categories');
    })
    .catch((err) => {response.render('site', {page: './pages/error', title: 'Error', err:err});
    });
}

function deleteItem(request, response) {
  superagent.delete(`${API}/categories/${request.body._id}`)
    .then(() => {
      response.redirect('/categories');
    })
    .catch((err) => {response.render('site', {page: './pages/error', title: 'Error', err:err});
    });
}
module.exports = router;