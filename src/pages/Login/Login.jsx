import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginImage from '../../assets/others/authentication2.png'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const doSubmit = (user_captcha_value) => {
        if (validateCaptcha(user_captcha_value) == true) {
            return true
        }
        else {
            return false
        }
    };

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const captcha = form.captcha.value
        if (doSubmit(captcha)) {
            signIn(email, password)
                .then(userCredential => {
                    const loggedUser = userCredential.user
                    navigate(from, { replace: true })
                    console.log('user logged in', loggedUser)
                })
                .catch(err => console.log('login error ', err.message))
        }
        else {
            alert('wrong captcha')
        }
    }
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img src={loginImage} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                            <input type="text" name='captcha' placeholder="Captcha" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <Link to='/signup'>New? Sign Up</Link>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;