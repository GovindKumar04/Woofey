const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`mongoose connected at url ${process.env.MONGO_URL}`)
})
.catch((e)=>{
    console.log(e)
})