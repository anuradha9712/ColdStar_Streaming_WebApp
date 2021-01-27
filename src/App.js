import logo from './logo.svg';
import './App.css';
import apiService from './services/index';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from './components/MovieCard/index';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [showSearchList, setShowSearchList] = useState(false);
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
      setMovieList(newList.filter((item)=> item.backdrop_path !== null && item.poster_path !== null));
      setOriginalMovieList(newList.filter((item)=> item.backdrop_path !== null && item.poster_path !== null));

    }
    catch (exception) {
      console.log("error")
    }
  }

  const handleFilterNameChange = (event) => {
    console.log("inside filter--> ", event.target.value);
    setSearchName(event.target.value);
    if(event.target.value === ''){
      setShowSearchList(false);
      setMovieList(originalMovieList);
    }
  }

  const handleSearchChange = async () => {
    try {
      const apiResponse = await apiService.searchMovie(searchName);
      console.log("search movieList--> ", apiResponse);
      const newList = [...apiResponse.results];
      setMovieList(newList.filter((item)=> item.backdrop_path !== null && item.poster_path !== null));
      setShowSearchList(true);
    }
    catch (exception) {
      console.log("error")
    }
  }

  return (
    <div className="App-header">

      <Grid container xs={12} className="navbar-container">
        <Grid item xs={6}>
          ColdStar
        </Grid>
        <Grid item xs={6} >
          <Grid item container xs={12} spacing={2} className="searchbox-container">
            <Grid item xs={8}>
              <TextField id="outlined-basic3" label="Search" onChange={handleFilterNameChange} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={handleSearchChange} color="secondary" size="large" className="searchBtn">Search</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* ==========================Banner====================== */}
      {movieList && movieList[index] ?
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
        next={showSearchList ? '' : getMovieList}
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
