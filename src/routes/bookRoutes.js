const express = require('express');
const bookRouter = express.Router();

function router(nav) {
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
    // Route for  book list.
    bookRouter.route('/')
        .get((req, res) => {
            res.render('bookListView', {
                nav,
                title: 'Library',
                books
            })
        })
    // Route for single book.
    bookRouter.route('/:id')
        .get((req, res) => {
            const {
                id
            } = req.params;
            res.render('bookView', {
                nav,
                title: 'Library',
                book: books[id]
            });
        });
    return bookRouter;
}


module.exports = router;