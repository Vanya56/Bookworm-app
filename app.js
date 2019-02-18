const express = require('express')
const debug = require('debug')('app')
const path = require('path')
const chalk = require('chalk')



const port = process.env.port || 3000;
const app = express();
const bookRouter = express.Router();

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', 
    {
        nav: [{link: '/books', title:'Books'},
          {link: '/authors', title:'Authors'}],
        title: 'Library'
    }
  );
});

app.listen(port, function () {
    debug(`listening on port ${chalk.green(port)}`);
})