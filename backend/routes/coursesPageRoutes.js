import express from 'express'
import {getCourses ,getCourse} from '../controllers/coursesController.js'
import { getCourseInfo } from '../controllers/courseInfoController.js'
import chatbotPageRoutes from './chatbotPageRoutes.js'

const app= express()
const router=express.Router()

router.get('/',getCourses)

router.get('/:id',getCourse)

router.get('/:id/home', getCourseInfo)

router.get('/:id/videos',getCourseInfo)

router.get('/:id/syllabus',getCourseInfo)

router.get('/:id/assignments', getCourseInfo)

router.get('/:id/people', getCourseInfo)





export default router