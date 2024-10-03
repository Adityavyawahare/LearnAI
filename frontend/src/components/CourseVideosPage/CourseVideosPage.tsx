import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CourseInfoPage from "../CourseInfoNavbar/CourseInfoNavbar";
import './CourseVideosPage.css'

const CourseVideosPage= ()=>{
    const { id } = useParams<{ id: string }>();
    const [description, setDescription] =useState([]);
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true);
        axios
            .get(`http://localhost:4000/courses/${id}/videos`)
            .then((response)=>{
                console.log(response.data[0].videos)
                setDescription(response.data[0].videos)
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
                <CourseInfoPage/>
                <div className="content">
                    <div className="courses">
                        <p>loading......</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <CourseInfoPage />
            <div className="desc">
                {description && description.map((desc: String) => (
                    <div className="desc-data">
                        <p>{desc}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CourseVideosPage