const router = require('express').Router();
const User =  require('../model/user.model')
const Task =  require('../model/task.model')


//création d'une tâche

router.post('/', async (req,res)=>{
    const newtask = new Task(req.body)
    await newtask.save()
    const users = await User.find({}).exec()
    const tasks = await Task.find({}).populate({ path: 'user', select: 'name occupied'}).exec()
    res.send({users, tasks})
})

//suppression d'une tâche

router.delete('/:id', async (req,res)=>{

    const tasksUser = await Task.findById(req.params.id).populate({ path: 'user', select: 'name occupied'}).exec()
    if(tasksUser.user){
        const id = tasksUser.user._id
        await User.findByIdAndUpdate(id, {occupied : false}).exec()
    }
    await Task.findByIdAndDelete(req.params.id).exec()
    const users = await User.find({}).exec()
    const tasks = await Task.find({}).populate({ path: 'user', select: 'name occupied'}).exec()
    res.send({users, tasks})
})

//récupération d'une tâche

router.get('/', async (req,res)=>{
    const tasks = await Task.find({}).populate({ path: 'user', select: 'name occupied'}).exec()
    res.send(tasks)
})

module.exports = router