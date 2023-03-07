import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup"
import PrivateRoutes from './pages/PrivateRoutes';
import Profile from './pages/Profile';
import ProfetionalProfile from './pages/Profetional.jsx';
import AddProgram from './pages/AddPrograms';
import ViewPrograms from './pages/Viewprograms.jsx';
import ViewSingleProgram from './pages/ViewSingleProgram';
import ViewStageProgramUser from "./pages/ViewStageProgramUser";
import ViewProgramDetails from './pages/ViewProgramDetails';
import ViewBookedProgram from './pages/ViewUserBooked';
import ViewHostBooking from './pages/ViewHostBooking';
import ViewMap from './pages/ViewMap'
import UserPageForProfile from './pages/UserProfilePageView'
import ChatUserBox from './pages/ChatPage'
import AdminPrivateRoutes from './pages/AdminPrivateRoutes'
import SearchPeopleByDomain from './pages/SearchPeopleByDomain'

// admn

import AdminLogin from './pages/AdminLogin'
import AdminLanding from './pages/AdminLanding'
import AdminArtistList from './pages/AdminArtistList'
import AdminProducerList from './pages/AdminProducerList'
import AdminBookingList from './pages/AdminBookingList'
import AdminCategory from './pages/AdminCategory'
import AdminDescription from './pages/AdminDescription'
import ChatFromUser from './pages/ChatFromUser'
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
            <Route element={<SearchPeopleByDomain/>} path= '/searchPeopleByDomain'/>
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
