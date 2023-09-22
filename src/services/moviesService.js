export const getMovies = () => {
    return fetch('http://localhost:8088/movies').then((res) => {
        return res.json()
    })
}

export const postMovie = (movie) => {
    return fetch('http://localhost:8088/movies', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    })}

export const getMovieById = (id) => {
    return fetch(`http://localhost:8088/movies/${id}`).then((res) => res.json())
    }

export const editMovie = (movie) => {
    return fetch(`http://localhost:8088/movies/${movie.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    })
}


export const getMoviesByUserId = (userId) => {
    return fetch(`http://localhost:8088/movies?userId=${userId}`).then((res) => res.json())
}

export const deleteMovie = (movieId) => {
    return fetch(`http://localhost:8088/movies/${movieId}`, { method: "DELETE" })
}

export const deleteMeal = (mealId) => {
    return fetch(`http://localhost:8088/meals/${mealId}`, { method: "DELETE"})
}