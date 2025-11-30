import "./config/envConfig.js"
import { connectDB } from "./config/db.js";
import { app } from "./app.js";



await connectDB()
.then(() => {
    app.listen(process.env.PORT)
})
.catch((error) => {
    console.log(error)
})

