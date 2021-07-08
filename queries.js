const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.connect();

const service = {

    getUsers: (req, res) => {
        pool.query('SELECT * from users', (err, results) => {
            if (err) throw err;
            res.render('index', { 'users': results.rows });
        });
    },
    
    addUser: (req, res) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let age = req.body.age;
        pool.query(`INSERT INTO users (first_name, last_name, email, user_age) VALUES('${firstname}', '${lastname}', '${email}', '${age}')`, (err, result) => {
            if (err) throw err;
            res.redirect('/');
        });
    },
    
    deleteUser: (req, res) => {
        let userId = req.params.user_id;
        pool.query('DELETE from users where user_id = $1', [userId], (err, result)=> {
            if (err) throw err;
            res.redirect('/');
        });
    },

    getUser: (req, res) => {
        let userId = req.params.user_id;
        pool.query('SELECT * from users where user_id = $1', [userId], (err, results) => {
            if (err) throw err;
            res.render('edit', { 'user': results.rows[0]});
        });
    },

    updateUser: (req, res) => {
        let userId = req.params.user_id;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let age = req.body.age;
        pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, user_age = $4 WHERE user_id = $5',
        [firstname, lastname, email, age, userId], (err, results) => {
            if (err) throw err;
            res.redirect('/');
        });
    },
  
    ascSort: (req, res) => {
        pool.query('SELECT * from users order by first_name ASC', (err, results) => {
            if (err) throw err;
            res.render('index', { 'users': results.rows });
        });
    },

    descSort: (req, res) => {
        pool.query('SELECT * from users order by first_name DESC', (err, results) => {
            if (err) throw err;
            res.render('index', { 'users': results.rows });
        });
    },

    searchUser: (req, res) => {
        let searchTerm = req.query.search;
        pool.query(`SELECT * from users where first_name ILIKE '%${searchTerm}%' or last_name ilike '%${searchTerm}%'`, (err, results) => {
            if (err) throw err;
            console.log(results.rows);
            res.render('index', { 'users': results.rows });

        })
    },
   
}

module.exports = service;