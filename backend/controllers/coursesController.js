import courseModel from '../models/courseModel.js'
import courseInfoModel from '../models/courseInfoModel.js';

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

const addCourse = async (req, res) => {
    const { id, name, professor, term } = req.body;

    try {
        // Create the course in courseModel
        const course = await courseModel.create({ id, name, professor, term });
        const courseInfo = await courseInfoModel.create({
            course_id: id,  // Link by the same id
            videos: [],        // Empty array for videos
            quizprac: [],      // Empty array for quiz practice
            content: [],       // Empty array for content
            people: [],        // Empty array for people
            quiz: []           // Empty array for quiz
        });

        res.status(200).json({ course, courseInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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