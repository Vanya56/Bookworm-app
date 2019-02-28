const express = require('express');
const debug = require('debug')('app')
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.port || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery')))
app.set('views', './src/views')
app.set('view engine', 'ejs')

const nav =  [
    { link: '/books', title: 'Book' },
    { link: '/authors', title: 'Author' }
  ];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }
    ],
    title: 'Library'
  })
})

app.listen(port, function () {
  debug(`listening on port ${chalk.green(port)}`)
})
