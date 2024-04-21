import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginImage from '../../assets/others/authentication2.png'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"


const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)

    const onSubmit = (data) => {
        console.log(data)
        if (doSubmit(data.captcha)) {
            createUser(data.email, data.password)
                .then(userCredential => {
                    const loggedUser = userCredential.user
                    const userDataForDb = {
                        name : data?.name,
                        email : data?.email,
                    }
                    console.log(loggedUser)
                    console.log(userDataForDb)
                    updateUserProfile(data.name)
                        .then(() => {
                            console.log('profile updated successfully')
                            fetch('https://react-restaurant-server-sable.vercel.app/users', {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(userDataForDb)
                            })
                        })
                        .catch((error) => console.log('updating info error ', error.message));
                    console.log('new user created', loggedUser)
                    reset()
                })
                .catch(err => console.log('signup error ', err.message))
        }
        else {
            alert('wrong captcha');
        }

    }

    const doSubmit = (user_captcha_value) => {
        if (validateCaptcha(user_captcha_value) == true) {
            return true
        }
        else {
            return false
        }
    };

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
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                            {errors.email && <span className='text-red-400'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password")} name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name")} name='name' placeholder="name" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                            <input type="text" {...register("captcha")} name='captcha' placeholder="Captcha" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                        <Link to='/login'>Already have an account? Login</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;