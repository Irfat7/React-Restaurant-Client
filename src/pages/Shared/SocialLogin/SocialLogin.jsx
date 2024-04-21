import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const googleSignInHandler = () => {
        googleSignIn()
            .then(res => {
                const loggedUser = res.user
                const userDataToSave = {
                    name: loggedUser.displayName,
                    email: loggedUser.email
                }
                fetch('https://react-restaurant-server-sable.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userDataToSave)
                })
                console.log('google sign in successful', loggedUser)
                navigate(from, { replace: true })
            })
            .catch(err => console.log('google sign in error', err.message))
    }
    return (
        <div>
            <div className='divider'></div>
            <button onClick={googleSignInHandler} className='btn btn-circle btn-outline text-2xl'>
                G
            </button>
        </div>
    );
};

export default SocialLogin;