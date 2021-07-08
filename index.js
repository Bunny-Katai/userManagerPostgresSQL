const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 1111;
const db = require('./queries');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'views')))

app.set('views','./views' );
app.set('view engine', 'pug');

app.get('/', db.getUsers);
app.get('/add', (req, res) => {
    res.render('form')
})
app.post('/add', db.addUser);

app.get('/delete/:user_id', db.deleteUser);
app.get('/users/ascending', db.ascSort);
app.get('/users/descending', db.descSort);
app.get('/users/:user_id', db.getUser);
app.post('/users/:user_id', db.updateUser);
app.get('/users', db.searchUser);





// example
// app.get('/updateActors/actorid/:id/firstname/:firstname', db.updateActors);


app.listen(port, () => {
    console.log(`Listening To Port: ${port}`)
})