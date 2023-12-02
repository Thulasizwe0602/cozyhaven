import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";

export default function SignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignInUser = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/signin', formData);
        } catch (error) {
            alert(error);
        }
    };

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