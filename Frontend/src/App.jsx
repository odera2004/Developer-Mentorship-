import { Routes,Route, BrowserRouter} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
