
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
const router = express.Router();


//mySql connection 
const pool = mysql.createPool({
    connectionLimit   :10,
    host              : 'localhost',
    user              : 'root',
    password          : '',
    database          : 'gbv'

})

//get all CHAT_BOX chats
router.get('/api/v/', (req, res) => 
{
    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM chat_box', (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) 
            {
                res.send(rows)
            } else 
            {
                console.log(err)
            }

            // optional
            console.log('The data from CHAT_BOX table is : \n', rows)
        })
    })
})

//get specific CHAT_BOX chats
router.get('/api/v/:vec_id', (req, res) => 
{

    const chat_id = request.params.chat_id;

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * FROM CHAT_BOX WHERE chat_id = ?', chat_id, (err, rows) => 
        {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // optional
            console.log('The data from CHAT_BOX table is : \n', rows)
        })
    })
})

//add CHAT_BOX chat 
router.post('/api/p/', (req, res) => 
{

    pool.getConnection((err, connection) => 
    {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO chat_box SET ?', params, (err, rows) => 
        {
        connection.release() // return the connection to pool
        if (!err) 
        {
            res.send(`Successfully Added CHAT_BOX` + params.name)
        } else 
        {
            console.log(err)
        }
        
        //optional
        console.log('CHAT_BOX \n', rows)

        })
    })
});

module.exports = router;

