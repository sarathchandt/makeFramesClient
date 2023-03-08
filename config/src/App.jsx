import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from "./Pages/Signup"
import PrivateRoutes from './Pages/PrivateRoutes';
import Profile from './Pages/Profile';
import ProfetionalProfile from './Pages/Profetional.jsx';
import AddProgram from './Pages/AddPrograms';
import ViewPrograms from './Pages/Viewprograms.jsx';
import ViewSingleProgram from './Pages/ViewSingleProgram';
import ViewStageProgramUser from "./Pages/ViewStageProgramUser";
import ViewProgramDetails from './Pages/ViewProgramDetails';
import ViewBookedProgram from './Pages/viewUserBooked';
import ViewHostBooking from './Pages/ViewHostBooking';
import ViewMap from './Pages/ViewMap'
import UserPageForProfile from './Pages/userProfilePageView'
import ChatUserBox from './Pages/ChatPage'
import AdminPrivateRoutes from './Pages/AdminPrivateRoutes'

// admn

import AdminLogin from './Pages/AdminLogin'
import AdminLanding from './Pages/AdminLanding'
import AdminArtistList from './Pages/AdminArtistList'
import AdminProducerList from './Pages/AdminProducerList'
import AdminBookingList from './Pages/AdminBookingList'
import AdminCategory from './Pages/AdminCategory'
import AdminDescription from './Pages/AdminDescription'
import ChatFromUser from './Pages/ChatFromUser'
function App() {



  return (
    <div >
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Profile />} path='/profile' />
            <Route element={<ProfetionalProfile />} path='/profetionalProfile' />
            <Route element={<AddProgram />} path='/addPrograms' />
            <Route element={<ViewPrograms />} path='/viewPrograms' />
            <Route element={<ViewSingleProgram />} path='/viewSingleProgram' />
            <Route element={<ViewStageProgramUser />} path='/viewStageProgramUser' />
            <Route element={<ViewProgramDetails />} path='/viewProgramDetails' />
            <Route element={<ViewBookedProgram />} path='/viewBookedProgram' />
            <Route element={<ViewHostBooking />} path="/viewHostBook" />
            <Route element={<ViewMap />} path={'/viewMap'} />
            <Route element={<UserPageForProfile />} path={'/UserPageForProfile'} />
            <Route element={<ChatUserBox />} path='/ChatUserBox' />
            <Route element={<ChatFromUser/>} path = '/chatFromUsers'/>
          </Route>


          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />



          <Route element={<AdminPrivateRoutes />}>
            <Route element ={ <AdminArtistList/>} path ='/adminArtistList'/>
            <Route element={<AdminLanding />} path='/admin' />
            <Route element={<AdminProducerList/>} path='/adminProducerList'/>
            <Route element={<AdminBookingList/>} path = '/adminBookingList'/>
            <Route element={<AdminCategory/>} path = '/adminCategory'/>
            <Route element={<AdminDescription/>} path = '/adminDescription'/>
          </Route>



            <Route path='/adminLogin' element={<AdminLogin />} />




        </Routes>
      </Router>

    </div>
  )
}

export default App
