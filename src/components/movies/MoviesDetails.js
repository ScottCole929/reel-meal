import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMovieById } from "../../services/moviesService"
import { getMovieMeal } from "../../services/mealsService"

export const MoviesDetails = () => {
    const [movie, setMovie] = useState({})
    const [meal, setMeal] = useState({})

    const { movieId } = useParams()

    useEffect(() => {
        getMovieById(movieId).then((movieObject) => {
            setMovie(movieObject)
        })
    }, [movieId])

    useEffect(() => {
        getMovieMeal(movieId).then((mealObject) => {
            setMeal(mealObject)
        })
    }, [movieId])

return (
    <div className="movie-detail-container">
        <h3 className="movie-detail-name">Which Reel Meal appears in {movie.name} ({movie.year})?</h3>
        <img src={meal?.mealUrl} alt={movie.name} className="meal-img" />
        <div className="movie-details">Meal being prepared in this film: {meal?.description ? meal?.description : "Not available"}</div>
        <div className="movie-details">Timestamp for meal: {movie.timestamp}</div>
        </div>
)
}
