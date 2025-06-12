
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from "./components/Home"
import Login from './components/Login'
import Error from './components/Error'
import Signup from './components/Signup'
import EmailVerify from './components/EmailVerify'
import Profile from './components/Profile'
import AddLinks from './components/AddLinks'
import EditProfile from './components/EditProfile'
import ForgetPassword from "./components/ForgetPassword"
import ResetPassword from './components/ResetPassword'
import ChangePassword from './components/ChangePassword'
import './App.css'
import Messbill from './components/Messbill'
import Logout from './components/Logout'
import AdminVerify from './AdminComponents/AdminVerify'
import NewAdmin from './AdminComponents/NewAdmin'
import Dashboard from './AdminComponents/Dashboard'
import AdminForget from './AdminComponents/AdminForget'
import Accept from './AdminComponents/Accept'
import Admin from './AdminComponents/Admin'
import AdminFooter from './AdminComponents/AdminFooter'


function App() {


  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/TodoList' element={<Home/>} />
      <Route path='/Home' element={<Home/>} />
      <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
      <Route path='/Login' element={<Login/>} />
          <Route path='/Logout' element={<Logout/>} />
      <Route path='/Create' element={<Signup/>} />
      <Route path='/Change_Password' element={<ChangePassword/>}></Route>
        <Route path='/Add_Links' element={<AddLinks/>}></Route>
          <Route path='/Edit_Profile' element={<EditProfile/>}></Route>
      <Route path='/api/:id/verify/:token/reset' element={<ResetPassword/>}/>
      <Route path='/api/user/:id/verify/:token' element={<EmailVerify/>} />
      <Route path='/user/:id/access/:token' element={<Accept/>} />
      <Route path='/Messbill' element={<Messbill/>} />
        <Route path='/Profile' element={<Profile/>} />
            <Route path='/Admin' element={<AdminVerify/>} />
            <Route path='/Admin/AdminsList' element={<Admin/>} />
            <Route path='/Admin/NewAdmin' element={<NewAdmin/>} />
            <Route path='/admin/ForgetPassword' element={<AdminForget/>} />
                <Route path='/admin/footer' element={<AdminFooter/>} />
      <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
    
       </>
  )
}

export default App
