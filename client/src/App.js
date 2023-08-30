import React from 'react'
import logo from './logo.svg'
import './App.css';
import { Route, Link, Routes, Switch,Re } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingsscreen from './screens/Bookingsscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Homescreen />} />
      
        <Route path="/home" element={<Homescreen />} />
        <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingsscreen />} />
        <Route path='/register' element={<Registerscreen/>} />
        <Route path='/login' element={<Loginscreen/>} />
        <Route path='/profile' element={<Profilescreen/>}/>
        <Route path='/admin' element={<Adminscreen/>}/>
        <Route path='/' element={<Landingscreen/>}/>
      </Routes>
    </div>
  );
}
export default App;
