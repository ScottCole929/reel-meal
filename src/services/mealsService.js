export const getMovieMeal = (movieId) => {
    return fetch(`http://localhost:8088/meals/${movieId}`).then((res) => res.json()
    )
}

export const postMeal = (meal) => {
    return fetch('http://localhost:8088/meals', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(meal),
    })}


export const getMealById = (id) => {
        return fetch(`http://localhost:8088/meals/${id}`).then((res) => res.json())
        }

export const getMealByMovieId = (movieId) => {
    return fetch(`http://localhost:8088/meals/${movieId}`).then((res) => res.json())
}

export const editMeal = (meal) => {
     return fetch(`http://localhost:8088/meals/${meal.id}`, {
            method: "PUT",
            headers: {
                 "Content-Type": "application/json",
            },
            body: JSON.stringify(meal),
            })
        }