import courseInfoModel from "../models/courseInfoModel.js"

//get course homepage
export const getCourseInfo= async (req, res)=>{
    const {id} = req.params
    const course=await courseInfoModel.find({course_id: id})
    if(!course){
        return res.status(404).json({error:"No such course"})
    }
    res.status(200).json(course)
}

//put course info
export const updateCourseInfo=async (req,res)=>{
    const {id}=req.params

    const course=await courseInfoModel.findOneAndUpdate({course_id:id},
      { $set: req.body },{ new: true })

    if(!course){
        return res.status(400).json({error: 'No such course'})
    }
    res.status(200).json(course)
}

//post course info
export const InsertCourseInfo=async (req,res)=>{
    const {course_id, home, syllabus, vids, people, assignments, AI_gen_quiz }=req.body
    
    try{
        const course= await courseInfoModel.create({course_id, home, syllabus, vids, people, assignments, AI_gen_quiz })
        res.status(200).json(course)
    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
    res.json({msg:'POST a new course'})
}