import { editMovie, getMovieById } from "../../services/moviesService"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { editMeal, getMealById } from "../../services/mealsService"

export const EditMovie = () => {
    const [movie, setMovie] = useState({})
    const [meal, setMeal] = useState({})
    const [yearChoice, setYearChoice] = useState(movie.year || '')

    const [description, setDescription] = useState('')
    const [movieUrl, setMovieUrl] = useState('')
    const [mealUrl, setMealUrl] = useState('')
    const [timestamp, setTimestamp] = useState('')

    const { movieId, mealId } = useParams()
    const navigate = useNavigate()

    const currentYear = new Date().getFullYear()
    const years = Array.from({length: currentYear - 1900 }, (_, index) => (currentYear - index).toString())

    const handleYearChange = (event) => {
        setYearChoice(event.target.value)
    }

    useEffect(() => {
        getMovieById(movieId).then((movieObject) => {
            setMovie(movieObject)
            setMovieUrl(movieObject.movieUrl || "")
            setTimestamp(movieObject.timestamp || "")
            if (movieObject.year) {
                setYearChoice(movieObject.year)
            } else {
                setYearChoice('')
            }
        })
    }, [movieId])

    useEffect(() => {
        getMealById(mealId).then((mealObject) => {
            setMeal(mealObject)
            setDescription(mealObject.description || "")
            setMealUrl(mealObject.mealUrl || "")
        })
    }, [mealId])


    const handleSave = (event) => {
        event.preventDefault()

    const updatedMovie = {
        id: movie.id,
        name: movie.name,
        year: yearChoice,
        movieUrl: movie.movieUrl,
        timestamp: movie.timestamp,
        userId: movie.userId
    }

    
    const updatedMeal = {
        id: meal.id,
        description: meal.description,
        mealUrl: meal.mealUrl,
        userId: meal.userId,
        movieId: meal.movieId
    }
    
    editMeal(updatedMeal).then(() => {
        editMovie(updatedMovie).then(() => {
            setMovie(updatedMovie)
            setMeal(updatedMeal)
            navigate(-1)
        })
    })
    
}


    return (
        <form className="movie-form">
        <h2 className="movie-form-title">Edit Your Reel Meal!</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Movie Title:</label>
                <input
                    value={movie.name || ""}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Movie Name"
                    onChange={(event) => {
                        const movieCopy = { ...movie }
                        movieCopy.name = event.target.value
                        setMovie(movieCopy)
                    }}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="year">Release Year:</label>
                <select
                    id="year"
                    name="year"
                    value={yearChoice}
                    onChange={handleYearChange}>
                <option value="">Select a Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}    
                    </option>
                ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description of this Reel Meal:</label>
                <input
                    value={meal.description || ""}
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="Meal info here"
                    onChange={(event) => {
                        const mealCopy = { ...meal }
                        mealCopy.description = event.target.value
                        setMeal(mealCopy)
                    }}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="movieUrl">Enter image URL of your film's movie poster:</label>
                <input
                    value={movie.movieUrl || ""}
                    name="movieUrl"
                    type="text"
                    className="form-control"
                    placeholder="https://www.movieposterhere.com"
                    onChange={(event) => {
                        const movieCopy = { ...movie }
                        movieCopy.movieUrl = event.target.value
                        setMovie(movieCopy)
                    }}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="mealUrl">Enter image URL of your Reel Meal being cooked in the film:</label>
                <input
                    value={meal.mealUrl || ""}
                    name="mealUrl"
                    type="text"
                    className="form-control"
                    placeholder="https://www.foodpichere.com"
                    onChange={(event) => {
                        const mealCopy = { ...meal }
                        mealCopy.mealUrl = event.target.value
                        setMeal(mealCopy)
                    }}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="timestamp">Timestamp of Reel Meal occurrence in the film's running time (Example- hh:mm:ss)</label>
                <input
                    value={movie.timestamp || ""}
                    name="timestamp"
                    text="text"
                    className="form-control"
                    placeholder="00:00:00"
                    onChange={(event) => {
                        const movieCopy = { ...movie }
                        movieCopy.timestamp = event.target.value
                        setMovie(movieCopy)
                    }}
                />
            </div>
        </fieldset>
        <button className="button" onClick={handleSave}>
            Save Reel Meal
        </button>
    </form>
    )
    }