import React from 'react';
import { Grid} from '@material-ui/core';
import './movieCard.css';

const MovieCard = ({ movieData }) => {
    return (
        <Grid item xs={4} className="card_container "  >
            <img src={`http://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="movie_poster" className="movie-poster"></img>
            <div className="overview">
                <h4>{movieData.overview}</h4>
            </div>
        </Grid>
    )
}

export default MovieCard
