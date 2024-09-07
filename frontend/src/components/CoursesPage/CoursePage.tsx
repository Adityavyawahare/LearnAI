import { useEffect, useState } from "react";
import axios from "axios";
import '../CoursesPage/CoursePage.css'
import NavHamburger from "../NavbarPage/NavbarPage";

interface Course {
    _id: string,
    id: string;
    name: string;
    professor: string;
    term: string;
  }


const CoursePage= ()=>{
    const [courses, setCourses] =useState([]);
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true);
        axios
            .get('http://localhost:4000/courses')
            .then((response)=>{
                setCourses(response.data)
                setLoading(false)
            })
            .catch((error)=>{
                console.log(error)
                setLoading(false)
            })
    },[])
    
    if (loading) {
        return <div>Loading...</div>;  // Show loading indicator while fetching data
    }

    return (
        <div className="app-container">
            <NavHamburger />
            <div className="content">
                <div className="courses">
                    {courses &&
                        courses.map((course: Course) => (
                            <div key={course._id}>
                                <h3>{course.name}</h3>
                                <p>Id: {course.id}</p>
                                <p>Professor: {course.professor}</p>
                                <p>Term: {course.term}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default CoursePage