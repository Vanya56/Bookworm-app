const express = require('express');
const {
  MongoClient,
  ObjectID
} = require('mongodb');

const uri = "mongodb+srv://ivan56:Rolex2152!@cluster0-rlxr7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

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