import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

//pages and components
import Home from './DashboardPage/DashboardPage'
import CoursePage from './CoursesPage/CoursePage'
import Profile from './ProfilePage/ProfilePage';
import CourseInfoPage from './CourseInfoNavbar/CourseInfoNavbar';
import CourseHomePage from './CourseHomePage/CourseHomePage';
import CourseSyllabusPage from './CourseSyllabusPage/CourseSyllabusPage';
import Chatbot from './Chatbot/Chatbot';

function Layout() {
  return (
    <div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/courses' element={<CoursePage/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/courses/:id' element={<CourseInfoPage/>}/>
            <Route path='/courses/:id/home' element={<CourseHomePage/>}></Route>
            <Route path='/courses/:id/syllabus' element={<CourseSyllabusPage/>}></Route>
            <Route path='/courses/:id/chatbot' element={<Chatbot/>}></Route>
          </Routes>
        </div>
      </div>
  )
}

export default Layout
