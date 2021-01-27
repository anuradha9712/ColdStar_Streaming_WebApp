import axios from 'axios'
const baseUrl = 'https://api.themoviedb.org/3'

const getMovieList = async pageNo => {
  const response = await axios.get(`${baseUrl}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}`)
  return response.data
}

const searchMovie = async movieName =>{
  const response = await axios.get(`${baseUrl}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieName}`)
  return response.data
}
export default { getMovieList, searchMovie }