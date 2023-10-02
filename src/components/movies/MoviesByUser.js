import { useState, useEffect } from "react";
import { getMoviesByUserId, deleteMovie, deleteMeal } from "../../services/moviesService";
import { getMealByMovieId } from "../../services/mealsService";
import { useNavigate, Link } from "react-router-dom";
import DinnerMovie1 from "../../images/DinnerMovie1.jpg"

export const MoviesByUser = ({ currentUser }) => {
  const [myMovies, setMyMovies] = useState([]);
  const [myMeals, setMyMeals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMoviesByUserId(currentUser.id).then((moviesArray) => {
      setMyMovies(moviesArray);
    });
  }, [currentUser]);

  useEffect(() => {
    Promise.all(
      myMovies.map((movie) => {
        return getMealByMovieId(movie.id).then((meal) => {
          return { movieId: movie.id, meal };
        });
      })
    ).then((mealArray) => {
      setMyMeals(mealArray);
    });
  }, [myMovies]);


 const handleMovieDelete = (movieId) => () => {
    const deleteConfirmation = window.confirm("Delete this film?");

    if (deleteConfirmation) {
      deleteMovie(movieId).then(() => {
        setMyMovies((origMovies) =>
          origMovies.filter((movie) => movie.id !== movieId)
        );
      });
    }
  }
  
  const handleMealDelete = (mealId) => () => {
    deleteMeal(mealId).then(() => {
      setMyMeals((origMeals) => origMeals.filter((meal) => meal.id !== mealId))
    })
  }

  const handleAllDeletions = (movieId, mealId) => () => {
    handleMovieDelete(movieId)()
    handleMealDelete(mealId)()
  }
  


  return (
    <div className="list-header">
      <div>
      <img className="logo" src={DinnerMovie1} alt="Reel Meal Logo"/>
      </div>
      <h2>Your Reel Meal Submissions</h2>
      {myMovies.map((movie) => {
        const meal = myMeals.find((placeholder) => placeholder.movieId === movie.id)?.meal;
        return (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.movieUrl}
              alt={movie.name}
              className="movie-img"
              onClick={() => {
                navigate(`/movies/${movie.id}`);
              }}
            ></img>
            <div className="movie-name">{movie.name}</div>
            <div className="movie-name">{movie.year}</div>
            {meal && (
              <div>
                <Link to={`/movies/mine/${movie.id}/edit/${meal.id}`}>
                  <button className="btn-new">Edit</button>
                </Link>
                <button className="btn-new btn-lg" onClick={handleAllDeletions(movie.id, meal.id)}>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
