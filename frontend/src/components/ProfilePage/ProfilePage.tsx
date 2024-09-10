import NavHamburger from "../NavbarPage/NavbarPage"
import { useState, useEffect } from "react";
import axios from "axios";

// interface ProfileInfo {
//     _id: string,
//     id: string;
//     name: string;
//     professor: string;
//     term: string;
//   }

const Profile = ()=>{
    const [profile, setProfile] =useState([]);
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true);
        axios
            .get('http://localhost:4000/profile')
            .then((response)=>{
                console.log(response.data)
                setProfile(response.data.profile)
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
                    <p>{profile}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile