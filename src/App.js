import './App.css';
import SearchBooks from './components/SearchBooks/SearchBooks';
import BookDetails from './components/BookDetails/BookDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { AuthProvider } from './firebase/authContext';
import UserDetails from './components/UserDetails/UserDetails';
import NavBar from './components/NavBar/NavBar';
import LogOut from './components/LogOut/LogOut';
import { useState } from 'react';

function App() {
  const [logOutRequested, setLogOutRequested] = useState(false);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar
            requestedLogOut={() => setLogOutRequested(true)}
          />
          <div className="mainPage">
              <LogOut
                clicked={logOutRequested}
                removeLogOutRequest={() => setLogOutRequested(false)}
              />
              <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/book-details" element={<BookDetails />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/home" element={<SearchBooks />} />
                <Route path="/user/:userId" element={<UserDetails />} />
              </Routes>
            </div>
        </AuthProvider>
      </Router>
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
