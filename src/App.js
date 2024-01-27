import React from 'react'; // Import React
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import from react-router-dom
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify'; // Assuming you're using react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify css if using ToastContainer
import  MyNavBar from "./Components/MyNavbar";
import Exercise from './Pages/Exercise';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <MyNavBar />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/exercise" element={<Exercise />} />


        </Routes>

      </Router>
    </>
  );
}

export default App;
