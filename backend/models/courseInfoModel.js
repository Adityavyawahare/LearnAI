import mongoose from 'mongoose'

const Schema=mongoose.Schema

const courseInfoSchema = new Schema({
    course_id: {
        type: String,
        required: true
    },
    home:[
        {
            type: String,
            required: true,
        }
    ],
    syllabus: [
        {
            type: String,
            required: true,
        }
    ],
    vids: [
        {
            url: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String
            },
            summary: {
                type: String
            },
        },
    ],
    people: [
        {
            student_id:{
                type: String,
                required: true
            },
            name: {
                type: String
            }
        },
    ],
    assignments: [
        {
            sessionDetails: {
                sessionDate: {
                    type: Date,
                    default: Date.now,
                },
                duration: {
                    type: Number, // duration in minutes or seconds
                    required: true,
                },
            },
            score: {
                type: Number, // score for the quiz session
                required: true,
            },
            quiz_id: {
                type: Number,
                required: true
            }
        },
    ],
    AI_gen_quiz: [
        {
            sessionDetails: {
                sessionDate: {
                    type: Date,
                    default: Date.now,
                },
                duration: {
                    type: Number, // duration in minutes or seconds
                    required: true,
                },
            },
            score: {
                type: Number, // score for the quiz session
                required: true,
            },
            quiz_id: {
                type: Number,
                required: true
            }
        },
    ],
}, { timestamps: true })

export default mongoose.model('CoursesInfo', courseInfoSchema)