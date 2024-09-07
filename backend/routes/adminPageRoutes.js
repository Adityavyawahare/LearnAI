import express from 'express'
import {addCourse, getCourses ,getCourse, deleteCourse, updateCourse} from '../controllers/coursesController.js'

const router=express.Router()

router.get('/',(req,res)=>{
    res.json({msg:'Dashboard will be here'})
})

router.get('/courses/:id', getCourse)
router.get('/courses', getCourses)
router.post('/courses', addCourse)
router.delete('/courses/:id', deleteCourse)
router.put('/courses/:id', updateCourse)
export default router