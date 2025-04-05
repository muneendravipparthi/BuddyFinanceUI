import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RegisterPage from "./pages/RegisterPage.js";
// import LoginPage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";

function App() {
  return (
    <Router>
      <Routes>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        </header>
        </div>
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
