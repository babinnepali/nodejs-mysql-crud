const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');


dotenv.config();


const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/tasks', require('./routes/taskRoutes.js'));



app.get('/test', (req, res) => {
    res.status(200).send('Task added!')
})

const PORT = process.env.PORT ||8000;



mySqlPool.query('SELECT 1').then(() => {
    console.log('Connected to the database!')
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/test`)
    })


}).catch((error) => {
    console.log(error);
})