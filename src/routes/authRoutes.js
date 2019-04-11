const express = require('express');
const passport = require('passport');
const {
    MongoClient
} = require('mongodb');

const uri = "mongodb+srv://ivan56:Rolex2152!@cluster0-rlxr7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            const {
                username,
                password
            } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';

            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    console.log('Connected to server!');

                    const db = client.db(dbName);

                    const col = db.collection('users');
                    const user = {
                        username,
                        password
                    };
                    const results = await col.insertOne(user);
                    console.log(results);
                    req.login(results.ops[0], () => {
                        res.redirect('/auth/profile')
                    });

                } catch (err) {
                    console.log(err);
                }
            }());
        });
    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'sign in'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            falureRedirect: '/'
        }));
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });
    return authRouter;
}

module.exports = router;