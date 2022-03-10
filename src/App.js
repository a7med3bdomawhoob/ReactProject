import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Povies from './Components/Movies/Movies';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/NotFound/Notfound';
import About from './Components/About/About';
import Network from './Components/Network/Network';
import People from './Components/People/People';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Details from './Components/Details/Details';
import Detailstv from './Components/Detailstv/Detailstv';
import Detailspeple from './Components/Detailspepole/Detailspeople';
import { ContextMediaProvider } from './Components/Context/Context';


// مع كل انتقاله بعيد الاب من اول تاني في الرن 
function App() {

  let [loginData, setLoginData] = useState(null)

  function setUserData() {
    let token = localStorage.getItem('token'); //decoded
    let decoded = jwtDecode(token);
    setLoginData(decoded)

  }
  // console.log(loginData);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserData()//because navigation of login to home return it null object  (this fill it )
    }
  }, [])
  let navigate = useNavigate()


  function logout() {

    localStorage.removeItem('token');
    setLoginData(null)
    navigate('/login')

  }



  return (
    <>
      <Navbar loginData={loginData} logout={logout} />


      <ContextMediaProvider>
        <Routes>


          <Route element={<ProtectedRoutes logindata={loginData} />}>

            <Route path='movies' element={<Povies />} />
            <Route path='home' element={<Home />} />
            <Route path='network' element={<Network />} />
            <Route path='people' element={<People />} />
            <Route path='details' element={<Details />} />
            <Route path='detailspeople' element={<Detailspeple />} />
            <Route path='detailstv' element={<Detailstv />} />
            <Route path='/' element={<Home />} />


          </Route>


          <Route path='about' element={<About />} />

          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login setUserData={setUserData} />} />


          <Route path='*' element={<Notfound />} />

        </Routes>
      </ ContextMediaProvider>
    </>
  )
}

export default App;
