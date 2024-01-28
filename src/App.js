import React from 'react'; // Import React
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import from react-router-dom
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify'; // Assuming you're using react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify css if using ToastContainer
import  MyNavBar from "./Components/MyNavbar";
import Exercise from './Pages/Exercise';
import Profile from './Pages/Profile';
import Challenges from './Pages/Challenges';
import Connect from './Pages/Connect';
import CreateAccount from './Pages/CreateAccount';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/exercise" element={<Exercise />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/challenges" element={<Challenges />} />
          <Route exact path="/connection" element={<Connect />} />
          <Route exact path="/createAccount" element={<CreateAccount />} />

        </Routes>
        <MyNavBar />

      </Router>
    </>
  );
}

export default App;
