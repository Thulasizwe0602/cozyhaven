import { useState } from "react";
import { Link } from "react-router-dom";
export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignInUser(event) {
        event.preventDefault();
        try {
            await axios.post('/signIn', {
                email,
                password
            });
        } catch (e) {
            alert(e.response.data.errorMessage)
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-80">
                <h1 className="text-4xl text-center mb-4 font-bold">Sign In</h1>
                <form className="max-w-md mx-auto " onSubmit={handleSignInUser}>
                    <input type='email' placeholder='Email address' value={email} onChange={event => setEmail(event.target.value)} />
                    <input type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
                    <button className="primary">Sign In</button>
                    <div className="text-center py-2 text-gray-500">Don't have an account?   <Link className='underline text-primary' to={'/signup'}>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}