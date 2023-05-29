const router = require('express').Router();
const Task = require('../model/task.model');
const User =  require('../model/user.model')


//création d'un user

router.post('/', async (req,res)=>{
    const newUser = new User(req.body)
    await newUser.save()
    res.sendStatus(200);
})

//recupération des users

router.get('/', async (req,res)=>{
    const users = await User.find({}).exec()
    res.send(users)
})

//assignation d'une tâche

router.patch('/:taskId/:userId?', async (req,res)=>{  

    const task = await Task.findById(req.params.taskId).populate({ path: 'user', select: '_id' }).exec()

    if(req.params.userId){
        
        if(task.user){
            await User.findByIdAndUpdate(task.user._id, {occupied : false}).exec()
        }
      
        const newUser = await User.findByIdAndUpdate(req.params.userId, { occupied : true }).exec()
        await Task.findByIdAndUpdate(req.params.taskId, { user : newUser._id }).exec()

    }else{
        await User.findByIdAndUpdate(task.user._id, {occupied : false}).exec()
        await Task.findByIdAndUpdate(req.params.taskId, { user : null }).exec()
    }

    const users = await User.find({}).exec()
    const tasks = await Task.find({}).populate({ path: 'user', select: 'name occupied'}).exec()
    res.send({ users, tasks});

})

module.exports = router