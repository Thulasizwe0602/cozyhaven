import { Link, Navigate, redirect } from "react-router-dom";
import { useContext, useState } from 'react';
import axios from "axios";
import { UserContext } from "../UserContext.jsx";


export default function SignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignInUser = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('user/signin', formData);
            setUser(data);
            setRedirect(true);
        } catch (error) {
            console.log(error)
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-80">
                <h1 className="text-4xl text-center mb-4 font-bold">Sign In</h1>
                <form className="max-w-md mx-auto " onSubmit={handleSignInUser}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button className="primary">Sign In</button>
                    <div className="text-center py-2 text-gray-500">Don't have an account?   <Link className='underline text-primary' to={'/signup'}>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}