import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import Dashboard from './Pages/Dashboard/Dashboard'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Update from './Pages/Update/Update';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {   BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/update/:id' element={ <Update />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
