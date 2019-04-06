const express = require('express');
const {
  MongoClient,
  ObjectID
} = require('mongodb');
const bookController = require('../controllers/bookController')

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getById, middleweare } = bookController(bookService, nav);
  bookRouter.use(middleweare);
  bookRouter.route('/')
  .get(getIndex);
   
bookRouter.route('/:id')
    .get(getById);
     
  return bookRouter;
}


module.exports = router;