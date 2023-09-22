import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { MoviesList } from "../components/movies/MoviesList";
import { MoviesDetails } from "../components/movies/MoviesDetails";
import { NewMovieForm } from "../components/forms/NewMovieForm";
import { MoviesByUser } from "../components/movies/MoviesByUser";
import { useEffect, useState } from "react";
import { EditMovie } from "../components/forms/EditMovie";
import { Profile } from "../components/forms/Profile";
import { Login } from "../components/auth/Login";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localUser);

    setCurrentUser(honeyUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<MoviesList />} />
        <Route path="movies">
          <Route
            path="new"
            element={<NewMovieForm currentUser={currentUser} />}
          />
          <Route
            path="mine"
            element={<MoviesByUser currentUser={currentUser} />}
          />
          <Route path=":movieId" element={<MoviesDetails />} />
          <Route path="mine/:movieId/edit/:mealId" element={<EditMovie />} />
        </Route>
        <Route path="profile" element={<Profile currentUser={currentUser}/>} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
