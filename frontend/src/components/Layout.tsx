import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

//pages and components
import Home from './DashboardPage/DashboardPage'
import CoursePage from './CoursesPage/CoursePage'

function Layout() {
  return (
    <div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/courses' element={<CoursePage/>}/>
          </Routes>
        </div>
      </div>
  )
}

export default Layout
