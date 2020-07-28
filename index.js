const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

var options = {  weekday: 'long', month: 'long', day: 'numeric'};
var curruntDate = new Date().toLocaleTimeString('en-us', options);
curruntDate = curruntDate.split(',');

var weekDay = curruntDate[0];
var month = curruntDate[1];

curruntDate = `${weekDay}, ${month}`;

var list = []

app.get('/', (req, res) => {
    res.render('home', {date : curruntDate, list: list})
})

app.post('/', (req, res) => {
    list.push(
        {"name" : req.body.task}
    )
    res.redirect('/')
})

app.listen(3000, () => console.log('Server is running on port 3000'))