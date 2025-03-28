import { Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Homepage'
import Landingpage from './components/Landingpage'

function App() {
  

  return (
    <><Navbar/>
    <Landingpage/>
    <Routes>
      <Route exact path="/" element={<Home />} />

    </Routes>
    </>
    
    
  )
}

export default App
