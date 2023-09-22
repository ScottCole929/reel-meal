import { useEffect, useState } from "react"
import { postMovie } from "../../services/moviesService"
import { postMeal } from "../../services/mealsService"
import { useNavigate } from "react-router-dom"

export const NewMovieForm = ( { currentUser } ) => {
    const [yearChoice, setYearChoice] = useState('')
    const [newMovie, setNewMovie] = useState({
        name: "",
        year: "",
        movieUrl: "",
        timestamp: "",
        userId: 0,
    })

    const [newMeal, setNewMeal] = useState({
        description: "",
        mealUrl: "",
        userId: 0,
        movieId: 0,
    })

    useEffect(() => {
        if (currentUser && currentUser.id) {
            setNewMovie(origMovie => ({ ...origMovie, userId: currentUser.id }))
            setNewMeal(origMeal => ({ ...origMeal, userId: currentUser.id }))
        }
    }, [currentUser])
    
    const navigate = useNavigate()
    
    const currentYear = new Date().getFullYear()
    const years = Array.from({length: currentYear - 1900 }, (_, index) => (currentYear - index).toString())

    const handleYearChange = (event) => {
        setYearChoice(event.target.value)
    }

    const handleMovieInputChange = (event) => {
        const movieCopy = { ...newMovie }
        movieCopy[event.target.name] = event.target.value
        setNewMovie(movieCopy)
    }

    const handleMealInputChange = (event) => {
        const mealCopy = { ...newMeal }
        mealCopy[event.target.name] = event.target.value
        setNewMeal(mealCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

    const newMovieEntry = {
        name: newMovie.name,
        year: yearChoice,
        movieUrl: newMovie.movieUrl,
        timestamp: newMovie.timestamp,
        userId: newMovie.userId
    }

    postMovie(newMovieEntry)
    .then((res) => res.json())
    .then((enteredMovie) => {
        const newMealEntry = {
            description: newMeal.description,
            mealUrl: newMeal.mealUrl,
            userId: newMeal.userId,
            movieId: enteredMovie.id,
    }

    postMeal(newMealEntry).then(() => {
        navigate("/")
    })
    })
}



return (
    <form className="movie-form">
    <h2 className="movie-form-title">Add a Reel Meal to the archives!</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Movie Title:</label>
            <input
                value={newMovie.name}
                name="name"
                type="text"
                className="form-control"
                placeholder="Movie Name"
                onChange={handleMovieInputChange}
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
                value={newMeal.description}
                name="description"
                type="text"
                className="form-control"
                placeholder="Meal info here"
                onChange={handleMealInputChange}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="movieUrl">Enter image URL of your film's movie poster:</label>
            <input
                value={newMovie.movieUrl}
                name="movieUrl"
                type="text"
                className="form-control"
                placeholder="https://www.movieposterhere.com"
                onChange={handleMovieInputChange}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="mealUrl">Enter image URL of your Reel Meal being prepared in the film:</label>
            <input
                value={newMeal.mealUrl}
                name="mealUrl"
                type="text"
                className="form-control"
                placeholder="https://www.foodpichere.com"
                onChange={handleMealInputChange}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="timestamp">Timestamp of Reel Meal occurrence in the film's running time (Example- hh:mm:ss)</label>
            <input
                value={newMovie.timestamp}
                name="timestamp"
                text="text"
                className="form-control"
                placeholder="00:00:00"
                onChange={handleMovieInputChange}
            />
        </div>
    </fieldset>
    <button className="button" onClick={handleSave}>
        Add Entry
    </button>
</form>
)
}