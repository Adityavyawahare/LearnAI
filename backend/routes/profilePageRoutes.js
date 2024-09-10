import express from 'express'

const router=express.Router()

router.get('/',(req,res)=>{
    res.json({profile:'Name and details will be displayed here'})
})

export default router