import { useState, useEffect } from "react"
import { getMovies } from "../../services/moviesService"
import { useNavigate } from "react-router-dom"

export const MoviesList = () => {
    const [movies, setMovies] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getMovies().then((moviesArray) => {
        setMovies(moviesArray)
        })
    }, [])

    return (
      <div className="movie-container">
        {movies.map((movie) => {
            return (
              <div key={movie.id} className="movie-card">
                <img
                src={movie.movieUrl}
                alt={movie.name}
                className="movie-img"
                onClick={() => {
                    navigate(`/movies/${movie.id}`)
                }}
            ></img>
            <div className="movie-name">{movie.name}</div>
            <div className="movie-name">{movie.year}</div>
        </div>
        )
       })}       
        </div>
    )
}