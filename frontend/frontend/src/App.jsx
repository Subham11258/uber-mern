
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserLogout from './pages/UserLogout'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { Routes, Route } from 'react-router-dom'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Start/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup/>} />
        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/home" element={
          <UserProtectedWrapper>

          <Home/>
          
          </UserProtectedWrapper>} />
        <Route path="/user/logout" element={
          <UserProtectedWrapper>

          <UserLogout/>
          
          </UserProtectedWrapper>} /> 
        <Route path="/captain-home" element={
          <CaptainProtectedWrapper>
          <CaptainHome/>
          </CaptainProtectedWrapper>
          
          } />
      </Routes>
    </div>
  )
}

export default App