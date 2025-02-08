import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SearchBooks from './components/SearchBooks/SearchBooks'
import BookCard from './components/BookCard/BookCard'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <SearchBooks></SearchBooks>
    <BookCard bookData={{ 
      title: "Throne of Glass",
      coverImage: "https://m.media-amazon.com/images/I/81Or91a0G+L._UF894,1000_QL80_.jpg",
      author: "Sarah J. Mass",
      rating: 5
    }}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
