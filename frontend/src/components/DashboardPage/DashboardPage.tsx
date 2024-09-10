import NavHamburger from "../NavbarPage/NavbarPage"
import { useState, useEffect } from "react"
import axios from "axios"
import './DashboardPage.css'
import { Link } from 'react-router-dom';

interface Course {
    _id: string,
    id: string;
    name: string;
    professor: string;
    term: string;
  }

const Home = ()=>{
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
        return (
            <>
                <NavHamburger />
                <div className="content">
                    <div className="courses">
                        <p>loading......</p>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className="main">
            <NavHamburger />
            <div className="home">
                <div className="courses">
                    {courses &&
                        courses.map((course: Course) => (
                            <Link to={`/courses/${course.id}`} key={course._id} className="course-link">
                                <div className="course-card">
                                    <h3>{course.name}</h3>
                                    <p>Id: {course.id}</p>
                                    <p>Professor: {course.professor}</p>
                                    <p>Term: {course.term}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home