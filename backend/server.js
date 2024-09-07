import dotenv from 'dotenv';
import express from "express"
import mongoose from 'mongoose';
import landingPageRoutes from "./routes/landingPageRoutes.js"
import coursesPageRoutes from "./routes/coursesPageRoutes.js"
import adminPageRoutes from "./routes/adminPageRoutes.js"
import cors from 'cors'



dotenv.config()
const app= express()

app.use(cors());

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/dashboard',landingPageRoutes)
app.use('/courses',coursesPageRoutes)
app.use('/admin',adminPageRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("listenining on port 3000")
        })
    })
    .catch((error)=>{
        console.log(error)
    })

app.get('/',(req,res)=>{ 
    res.json({msg:"Welcome to the app"})
})

