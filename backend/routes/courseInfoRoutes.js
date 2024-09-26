import express from 'express'
import {addCourse, getCourses ,getCourse, deleteCourse, updateCourse} from '../controllers/coursesController.js'
import { InsertCourseInfo, updateCourseInfo, getCourseInfo } from '../controllers/courseInfoController.js'

const router=express.Router()

// admin/courses

router.post('/:id', InsertCourseInfo)

router.put('/:id/home', updateCourseInfo)
router.put('/:id/videos', updateCourseInfo)
router.put('/:id/syllabus', updateCourseInfo)
router.put('/:id/assignments', updateCourseInfo)
router.put('/:id/people', updateCourseInfo)
router.put('/:id/chatbot', updateCourseInfo)


export default router