import { Link } from "react-router-dom";
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/">
                    Home
                </Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/movies/new">
                    Add A Reel Meal
                </Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/movies/mine">
                    My Reel Meals
                </Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/profile">
                    Profile
                </Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/login">
                    Logout
                </Link>
            </li>
        </ul>
    )
}