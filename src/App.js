import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Diety from './components/Diety';
import VastraSeva from './components/VastraSeva';
import BookingDetails from './components/BookingDetails';
import Seva from './components/Seva';
import Payment from './components/Payment';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Ai from './components/Ai';


const App=()=>
{
  return (
    <Routes>
      <Route path="/"  element={<Home/>} /> 
      <Route path="/vastra_seva" exact element={<VastraSeva />} />
      <Route path="/about_us" exact element={<AboutUs/>} />
      <Route path="/contact_us" exact element={<ContactUs/>} />
      <Route path="/seva" exact element={<Seva />} />
      <Route path="/ai" exact element={<Ai />} />
      <Route path="/payment/:data" exact element={<Payment />} />
      <Route path="/diety/:diety_name" exact element={<Diety />} />
      <Route path="/booking_details" exact element={<BookingDetails />} />
    </Routes>

  );
  
  
}

export default App;
