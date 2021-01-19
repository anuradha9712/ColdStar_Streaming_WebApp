import logo from './logo.svg';
import './App.css';
import apiService from './services/index';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";


function App() {

  const [movieList, setMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getMovieList();
  }, [])

  const getMovieList = async () => {
    //event.preventDefault()
    try {
      const apiResponse = await apiService.getMovieList(pageNumber + 1);
      setPageNumber(pageNumber + 1);
      console.log("movieList--> ", apiResponse);
      const newList = [...movieList, ...apiResponse.results ]
      setMovieList(newList);
    }
    catch (exception) {
      console.log("error")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <InfiniteScroll
          dataLength={movieList.length}
          next={getMovieList}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {movieList && movieList.length > 0 ?
            movieList.map((item, key) => (
              <div key={key}>
                {item.overview} <hr></hr>
              </div>
            ))
            : ''
          }
        </InfiniteScroll>

      </header>
    </div>
  );
}

export default App;
