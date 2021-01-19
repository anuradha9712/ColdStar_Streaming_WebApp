import logo from './logo.svg';
import './App.css';
import apiService from './services/index'; 
import React,  {useEffect} from 'react';

function App() {

  useEffect(()=>{
    getMovieList(1);
  },[])

  const getMovieList = async (pageNo) => {
    //event.preventDefault()
    try {
      const movieList = await apiService.getMovieList(pageNo)
      console.log("movieList--> ", movieList);
    } 
    catch (exception) {
      console.log("error")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
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

      </header>
    </div>
  );
}

export default App;
