const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    SSL: false,
});

pool.connect();
const getRental = (req, res) => {
    console.log("get rental" + process.env.DATABASE_URL);
    pool.query('SELECT * from rental limit 5', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
};
const getActors = (req, res) => {
    console.log(`db getActors`);
    pool.query('SELECT first_name, last_name FROM actor ORDER BY last_name ASC', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    })
}
const updateActors = (req, res) =>{
    let id  = req.params.id;
    let firstname = req.params.firstname;
    pool.query('update actor set first_name = $1 where actor_id = $2 returning *',
    [firstname, id],
    (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}
module.exports = {getRental, getActors, updateActors};