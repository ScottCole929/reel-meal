import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userChange } from "../../services/userService"

export const Profile = ({ currentUser }) => {
    const [userInfo, setUserInfo] = useState({
        name: currentUser.name || "",
        email: currentUser.email || "",
    })

    useEffect(() => {
        setUserInfo({
            name: currentUser.name || "",
            email: currentUser.email || "",
        })
    }, [currentUser])

    const navigate = useNavigate()

    const handleReset = async (event) => {
        event.preventDefault();
        try {
            const changedUser = await userChange(currentUser, {
            name: userInfo.name,
            email: userInfo.email
            })

        setUserInfo({
            name: changedUser.name,
            email: changedUser.email,
        })

        navigate("/")
    } catch (error) {
        console.error("Failed", error)
    }
}

    const handleProfileChange = (event) => {
        setUserInfo({
            ...userInfo, [event.target.id]: event.target.value
        })
    }

    return (
            <form className="profile-form" onSubmit={handleReset}>
            <h2 className="profile-form-title">Your Profile</h2>
            <fieldset>
                <div className="profile-group">
                    <label>Name:</label>
                    <input
                        value={userInfo.name}
                        name="name"
                        type="text"
                        id="name"
                        className="profile-control"
                        onChange={handleProfileChange}
                        required
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="profile-group">
                    <label>Email:</label>
                    <input
                        value={userInfo.email}
                        name="email"
                        type="email"
                        id="email"
                        className="profile-control"
                        onChange={handleProfileChange}
                        required
                    />
                </div>
            </fieldset>
            <fieldset>
                <button type="submit">Update Profile</button>
            </fieldset>
    </form>
    )
}