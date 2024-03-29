import React from 'react'; // Import React
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import from react-router-dom
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify'; // Assuming you're using react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify css if using ToastContainer
import  MyNavBar from "./Components/MyNavbar";
import Exercise from './Pages/Exercise';
import Challenges from './Pages/Challenges';
import CreateAccount from './Components/CreateAccount';
import RoadMap from './Pages/RoadMap';
// import UserProvider from './Components/AccountsProvider';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        {/* <UserProvider> */}
        <Routes>

          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/exercise" element={<Exercise />} />
          <Route exact path="/challenges" element={<Challenges />} />
          <Route exact path="/createAccount" element={<CreateAccount />} />  
          <Route path='/roadmap' element={<RoadMap />}/>

        </Routes>
        <MyNavBar />

        {/* </UserProvider> */}
      </Router>
    </>
  );
}

export default App;