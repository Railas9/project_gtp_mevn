const router = require('express').Router();
const Task = require('../model/task.model');
const User =  require('../model/user.model')


//création d'un user

router.post('/inscription', async (req,res)=>{
    const user = await User.findOne({ name: req.body.name }).exec()
    console.log(user)
    if(user){
        res.send({error:'Un utilisateur posséde déja ce nom'});
    }else{
        const hashedPassword = await User.hashPassword(req.body.password);
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        await newUser.save()
        res.sendStatus(200);
    }

})

//recupération des users

router.get('/', async (req,res)=>{
    const users = await User.find({}).exec()
    res.send(users)
})

//connexion d'un user

router.post('/connexion', async (req,res)=>{
    const user = await User.findOne({name: req.body.name}).exec()
    if(!user || !user.comparePassword(req.body.password)){
        res.send({error:'Mot de passe ou nom d\'utilisateur incorrect'});
    }else{
        res.send(user)
    }

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