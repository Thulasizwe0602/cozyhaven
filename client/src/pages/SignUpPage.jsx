import { Link } from "react-router-dom";
export default function SignUpPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-80">
            <h1 className="text-4xl text-center mb-4 font-bold">Sign Up</h1>
            <form className="max-w-md mx-auto ">
                <input type='text' placeholder='Name'/>
                <input type='email' placeholder='Email address'/>
                <input type='password' placeholder='Password'/>
                <input type='password' placeholder='Confirm Password'/>
                <button className="primary">Sign Up</button>
                <div className="text-center py-2 text-gray-500">Already a member?   <Link className='underline text-primary'to={'/signin'}>Sign In</Link>
                </div>
            </form>
            </div>
        </div>
    )
}