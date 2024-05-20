import axios from "axios"

export async function getMovies(): Promise<any> {
  const response = await axios.get("https://dummyapi.online/api/movies")
  return response
}

export async function getSingleMovie(id: string | string[]): Promise<any> {
  const response = await axios.get(`https://dummyapi.online/api/movies/${id}`)
  const singleMovieData = await response.data
  return singleMovieData
}




