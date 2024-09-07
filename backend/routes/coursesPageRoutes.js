import express from 'express'
import {getCourses ,getCourse} from '../controllers/coursesController.js'

const router=express.Router()

router.get('/',getCourses)

router.get('/:id',getCourse)

export default router