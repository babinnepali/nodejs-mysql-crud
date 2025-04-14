const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');


const router = express.Router();


router.get('/getall',getTasks)

router.get('/get/:id',getTaskById)

router.post('/create',createTask)

router.put('/update/:id',updateTask)

router.delete('/delete/:id', deleteTask)

module.exports = router;