
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Main from './Components/Main';
import About from './Components/About';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import Reservation from './Components/Reservation';
import Order from './Components/Order';
import Login from './Components/Login';
import { useState, useReducer, useEffect } from 'react';
import { fetchAPI, submitAPI } from './Components/apiUtils'; // Correct the path as needed


function App() {

  //Move availableTimes state to App component
  {/* const [availableTimes, setAvailableTimes] = useState([
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00"
]); */}

  const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
  }

  const fetchAPI = function(date) {
    const result = [];
    const random = seededRandom(date.getDate());

    for(let i = 6; i <= 12; i++) {
      if(random() < 0.5) {
        result.push(i + ":00");
      }
      if(random() > 0.5) {
        result.push(i + ":30");
      }
    }
    return result;
  }

  const submitAPI = function(formData) {
    return true;
  }

  const initialState = {availableTimes: fetchAPI(new Date())}

  const [state, dispatch] = useReducer(updateTimes, initialState);

  //Update the updateTimes function that you previously created to use the fetchData API function. Remember, you dispatched the selected date to the updateTimes function. This should be passed to the fetchData function as a parameter.

  function updateTimes(state, date) {
    return {availableTimes: fetchAPI(new Date(date))}
  }

  function submitForm (formData) {
    if(submitAPI(formData)) {
      alert("Your table is Reserved. We are looking foward to see you!")
    }
  }

  return (
    <div className="App">
        <>
          <Nav/>
          <Header/>
            <div>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route
                  path="/reservation"
                  element={
                  <Reservation
                    availableTimes={state}
                    dispatch={dispatch} //Passing dispatch function as a prop
                    submitForm={submitForm} //Pass the callback function as a prop
                    /> }
                  />
                <Route path="/order-online" element={<Order />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          <Footer/>
        </>

    </div>
  )
}

export default App;
