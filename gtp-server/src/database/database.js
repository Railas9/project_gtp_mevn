const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI).then(()=>{
    console.log("connection ok")
})

module.exports = mongoose