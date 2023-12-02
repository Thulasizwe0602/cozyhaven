import { Link } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
export default function SignUpPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUpUser(event){
        event.preventDefault();
        try{
            await axios.post('/signup',{
                name,
                email,
                password
            });
        }catch(e){
            alert(e.response.data.errorMessage)
        }
    }
    
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-80">
            <h1 className="text-4xl text-center mb-4 font-bold">Sign Up</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSignUpUser}>
                <input type='text' placeholder='Name' value={name} onChange={ev => setName(ev.target.value)}/>
                <input type='email' placeholder='Email address' value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type='password' placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)}/>
                <input type='password' placeholder='Confirm Password'/>
                <button className="primary">Sign Up</button>
                <div className="text-center py-2 text-gray-500">Already a member?   <Link className='underline text-primary'to={'/signin'}>Sign In</Link>
                </div>
            </form>
            </div>
        </div>
    )
}