import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignUpUser = async (event) => {
        event.preventDefault();

        try {
            await axios.post('/signup', formData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-80">
                <h1 className="text-4xl text-center mb-4 font-bold">Sign Up</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSignUpUser}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button className="primary">Sign Up</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?{' '}
                        <Link className="underline text-primary" to={'/signin'}>
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}