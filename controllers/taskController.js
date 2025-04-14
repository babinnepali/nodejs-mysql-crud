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


module.exports = {getTasks}

