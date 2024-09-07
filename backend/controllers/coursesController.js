import mongoose from 'mongoose'
import courseModel from '../models/courseModel.js'

//get all courses
const getCourses= async (req, res)=>{
    const courses=await courseModel.find({}).sort({createdAt:-1})
    res.status(200).json(courses)
}

//get single course
const getCourse= async (req, res)=>{
    const {id} = req.params
    const course=await courseModel.find({id: id})
    if(!course){
        return res.status(404).json({error:"No such course"})
    }

    res.status(200).json(course)
}

//add courses
const addCourse= async (req,res)=>{
    const {id, name, professor, term}=req.body
 
    try{
        const course= await courseModel.create({id, name, professor, term})
        res.status(200).json(course)
    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
    res.json({msg:'POST a new course'})
}

//delete course
const deleteCourse= async (req,res)=>{
    const {id}= req.params
    const course=await courseModel.findOneAndDelete({id: id})
    if(!course){
        return res.status(400).json({error: 'No such course'})
    }

    res.status(200).json(course)
}


//update course
const updateCourse=async (req,res)=>{
    const {id}=req.params

    const course=await courseModel.findOneAndUpdate({id:id},{
        ...req.body
    })

    if(!course){
        return res.status(400).json({error: 'No such course'})
    }
    res.status(200).json(course)
}

export {addCourse, getCourses, getCourse, deleteCourse, updateCourse}