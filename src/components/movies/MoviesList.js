import { useState, useEffect } from "react"
import { getMovies } from "../../services/moviesService"
import { useNavigate } from "react-router-dom"
import DinnerMovie1 from "../../images/DinnerMovie1.jpg"
import "./Movies.css"

export const MoviesList = () => {
    const [movies, setMovies] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getMovies().then((moviesArray) => {
        setMovies(moviesArray)
        })
    }, [])

    return (
        <div>
            <div className="list-header">
        <img className="logo" src={DinnerMovie1} alt="Reel Meal Logo"/>
        <h1>Reel Meal</h1>
        <h4>Select a film below to start your culinary adventure...</h4>
        </div>
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
    </div>
    )
}