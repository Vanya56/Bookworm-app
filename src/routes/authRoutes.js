const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');


const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {
            const { username, password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';

            (async function addUser() {
                let client;
                try{
                    client = await MongoClient.connect(url);
                    console.log('You connected to the server!');

                    const db = client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, password };
                    const results = await col.insertOne(user);
                    console.log(results);
                    
                } catch(err) {
                    console.log(err);
                    
                }
            }());
            debug(req.body);
            // Create user
            req.login(req.body,() => {
                res.redirect('/auth/profile');
            });
        });
        authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });
        return authRouter;
}

module.exports = router;