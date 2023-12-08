import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
export default function AccountPage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    let { subpage } = useParams();
    console.log(subpage);

    if (subpage == undefined) {
        subpage = 'profile'
    }

    async function handleSignOut() {
        await axios.post('/signout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return <div>Loading...</div>
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/signin'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    function linkClasses(type = null) {
        let activeClass = 'py-2 px-6';
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            activeClass += " bg-primary text-white rounded-full";
        }
        return activeClass;
    }
    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to='/account/'>My Profile</Link>
                <Link className={linkClasses('bookings')} to='/account/bookings'>My Bookings</Link>
                <Link className={linkClasses('accomodations')} to='/account/accomodations'>My Accomodations</Link>
            </nav>

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user?.name}<br />
                    <button onClick={handleSignOut} className="primary max-w-sm mt-2">Sign Out</button>
                </div>
            )}
        </div>
    )
}