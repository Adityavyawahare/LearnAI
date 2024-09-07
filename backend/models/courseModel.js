import mongoose from 'mongoose'

const Schema=mongoose.Schema

const courseSchema= new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    professor:{
        type: String,
        required:true
    },
    term:{
        type:String,
        required:true
    }
},{ timestamps: true})

export default mongoose.model('Courses', courseSchema)