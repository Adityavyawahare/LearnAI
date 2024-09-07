import { BrowserRouter,Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

//pages and components
import Layout from './components/Layout'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="*" element={<Layout/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
