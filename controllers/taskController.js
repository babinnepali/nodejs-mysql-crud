const db = require('../config/db');

const getTasks = async(req,res) => {
    try{
        const [data] = await db.query('SELECT * FROM tasks');
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No record found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Tasks fetched successfully',
            totalTasks: data.length,
            data
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error fetching tasks',
            error

        })
    }
}
const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(400).send({
                success: false,
                message: 'Task ID is required'
            });
        }

        const [data] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);

        if (!data || data.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No record found'
            });
        }

        res.status(200).send({
            success: true,
            data: data[0] // return the first matching row
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error fetching task',
            error: err.message
        });
    }
};


const createTask = async(req,res) =>{
    try{
        const{title,description} = req.body;
        if(!title || !description){
            return res.status(500).send({
                success: false,
                message: 'Title and description are required'
            })
        }
        const [data] = await db.query('INSERT INTO tasks (title,description) VALUES (?,?)',[title,description]);
        if(!data){
            return res.status(500).send({
                success: false,
                message: 'Error creating task'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Task created successfully',
            data: data[0]
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating task',
            error
        })
    }
}

const updateTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        if(!taskId){
            return res.status(404).send({
                success: false,
                message: 'Task ID is required'
            })
        }
        const {title,description} = req.body;
        const [data] = await db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title,description,taskId]);
        if(!data){
            return res.status(500).send({
                success: false,
                message: 'Error updating task'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Task updated successfully',
            data: data[0]
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error updating task',
            error
        }) 
}
}
const deleteTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        if(!taskId){
            return res.status(404).send({
                success: false,
                message: 'Task ID is required'
            })
        }
        const [data] = await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
        if(!data){
            return res.status(500).send({
                success: false,
                message: 'Error deleting task'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Task deleted successfully',
            data: data.length
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error deleting task',
            error
        })
    }
}
module.exports = {getTasks, getTaskById, createTask, updateTask,deleteTask}

