const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URl)
.then(()=>{
    console.log(`mongoose connected at url ${process.env.MONGO_URl}`)
})
.catch((e)=>{
    console.log(e)
})