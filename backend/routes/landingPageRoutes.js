import express from 'express'

const router=express.Router()

router.get('/',(req,res)=>{
    res.json({dashboard:'Welcome to the dashboard page'})
})

export default router