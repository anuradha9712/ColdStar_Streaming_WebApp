import axios from 'axios'
const baseUrl = 'https://api.themoviedb.org/3/movie/popular'

const getMovieList = async pageNo => {
  const response = await axios.get(`${baseUrl}?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}`)
  return response.data
}

export default { getMovieList }