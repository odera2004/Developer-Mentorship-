import { Routes,Route, BrowserRouter} from 'react-router-dom'
import './styles/classic.css'; // Adjust path as needed
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import About from './pages/About'
import { MentorProvider } from './context/MentorContext'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserProvider } from './context/UserContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

{/* <GoogleOAuthProvider clientId="your-google-client-id">
  <App />
</GoogleOAuthProvider> */}
function App() {
  return (

    <BrowserRouter>
    <AuthProvider>
    <GoogleOAuthProvider clientId="657664230113-v0ngcasp9gg858ehd1b4t3smio9me38l.apps.googleusercontent.com">
    

    <UserProvider>
    <MentorProvider>
      
      <Routes>
        <Route>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/services" element={<Services />} />             
          </Route>
        </Route>
      </Routes>

      </MentorProvider>
      </UserProvider>
      </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App;
