const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/todoListDB', {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    err ? console.log(err) : console.log('Seccessfully conected to mongoDB');
})

// Task Schema
const taskSchema = mongoose.Schema({
    name: String
})

// Task model
const Task = mongoose.model('Task', taskSchema)

var options = {  weekday: 'long', month: 'long', day: 'numeric'};
var curruntDate = new Date().toLocaleTimeString('en-us', options);
curruntDate = curruntDate.split(',');

var weekDay = curruntDate[0];
var month = curruntDate[1];

curruntDate = `${weekDay}, ${month}`;



app.get('/', (req, res) => {

    Task.find((err, list) => {
        if (err) {
            console.log(err);
        } else {
            res.render('home', {date : curruntDate, list: list})
        }
    })
})

app.post('/', (req, res) => {
    
    var task = new Task({
        name: req.body.task
    })

    task.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Seccessfully saved the task');
            res.redirect('/')
        }
    })
})

app.post('/delete', (req, res) => {
    Task.deleteOne({_id: req.body.checkbox}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Seccessfully deleted task')
            res.redirect('/')
        }
    })
})


app.listen(3000, () => console.log('Server is running on port 3000'))