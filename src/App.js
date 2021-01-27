import logo from './logo.svg';
import './App.css';
import apiService from './services/index';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from './components/MovieCard/index';
import { Grid, Typography, TextField } from '@material-ui/core';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const index = Math.floor(Math.random() * 10);

  useEffect(() => {
    getMovieList();
  }, [])

  const getMovieList = async () => {
    //event.preventDefault()
    try {
      const apiResponse = await apiService.getMovieList(pageNumber + 1);
      setPageNumber(pageNumber + 1);
      console.log("movieList--> ", apiResponse);
      const newList = [...movieList, ...apiResponse.results]
      setMovieList(newList);
    }
    catch (exception) {
      console.log("error")
    }
  }

  const handleFilterNameChange = () => {
    console.log("inside filter")
  }

  return (
    <div className="App-header">

      <Grid container xs={12} className="navbar-container">
        <Grid item xs={6}>
          ColdStar
        </Grid>
        <Grid item xs={6} >
          <Grid item className="searchbox-container">
            <TextField id="outlined-basic3" label="Search" onChange={handleFilterNameChange} variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      {/* ==========================Banner====================== */}
      {movieList && movieList[0] ?
        <Grid container xs={12} className="main-banner" style={{ background: `linear-gradient(rgba(32, 32, 32, 0) 0%, #202020 100%), url(http://image.tmdb.org/t/p/w1280${movieList[index].backdrop_path})` }}>

          <Grid item xs={12} className="banner-text">
            <h2>{movieList[index].title}</h2>
            {/* <p>{movieList[index].overview}</p> */}
          </Grid>

        </Grid>
        : ''}

      {/* ==========================Movie List====================== */}
      <InfiniteScroll
        dataLength={movieList.length}
        next={getMovieList}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Grid container xs={12}>
          {movieList && movieList.length > 0 ?
            movieList.map((item, key) => (
              <MovieCard
                movieData={item}
                key={key}
              />

            ))
            : ''
          }
        </Grid>
      </InfiniteScroll>

    </div>
  );
}

export default App;
