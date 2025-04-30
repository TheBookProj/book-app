import logo from './logo.svg';
import './App.css';
import SearchBooks from './components/SearchBooks/SearchBooks';
import BookDetails from './components/BookDetails/BookDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
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
