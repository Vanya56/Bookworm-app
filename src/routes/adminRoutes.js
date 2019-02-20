const express = require('express');
const { mongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [{
    title: 'Shadow of the Wind',
    genere: 'fiction',
    author: 'Carlos Ruiez Zaffon',
    read: false

},
{
    title: 'Blood Meridian',
    genere: 'fiction',
    author: 'Cormac McCarthy',
    read: false

},
{
    title: 'Churchill',
    genere: 'History',
    author: 'somebody',
    read: false

},
{
    title: 'The Devil in the White City',
    genere: 'Historical Fiction',
    author: 'Somebody',
    read: false

}
];

function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongo://localhost:27017';
            const dbName = 'LibraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await mongoClient.connect(url);
                    debug('Connected to server');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                }   catch (err) {
                    debug(err.stack)

                }
                client.close();
            }());
        });
    return adminRouter;

}

module.exports = router;