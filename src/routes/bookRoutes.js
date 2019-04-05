const express = require('express');
const {
  MongoClient,
  ObjectID
} = require('mongodb');
const bookController = require('../controllers/bookController')

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleweare } = bookController(nav);
  bookRouter.use(middleweare);
  bookRouter.route('/')
  .get(getIndex);
   
bookRouter.route('/:id')
    .get(getById);
     
  return bookRouter;
}


module.exports = router;