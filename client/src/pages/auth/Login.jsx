import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import './Styles.css';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import isValidEmail from '../../../util/isValidEmail';
import AuthAPI from '../../service/NodejsServerAPI/AuthAPI';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/actions/userAction';

const Login = () => {
    // Lấy giá trị của tham số 'redirect' từ query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirectParam = urlParams.get('redirect');
    const dispatch = useDispatch();

    // Giải mã giá trị redirect nếu có
    const decodedRedirect = redirectParam ? decodeURIComponent(redirectParam) : '/';

    const [email,setEmail] = useState();
    const [pass,setPass] = useState();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log(email);
        console.log(pass);
        if(!email || !pass) return toast.error('Vui lòng nhập đầy đủ dữ liệu 😔 !')
        if(!isValidEmail(email)) return toast.error('Email không hợp lệ 😔 !')
        const data = {
            email : email,
            pass : pass
        }
        const result = await AuthAPI.login(data);
        if(result) {
            // let accessTokenTemp = Cookies.get("accessToken");
            // console.log(accessTokenTemp);
            // await dispatch(fetchUserData());
            if(redirectParam) return window.location.href = decodedRedirect;
            navigate('/')
            return toast.success('Đăng nhập thành công 😊 !')
        }
        return toast.error('Email hoặc mật khẩu không hợp lệ 😔 !')
    }
    return (
        <div className='auth'>
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8 ">
                    <div className='login box-auth'>

                        <div className="title-top text-center">
                            <h2>
                                Login to Bonik.
                            </h2>
                            <div className="action-to-register mt-2">
                                <span>
                                    Don’t have an account?
                                </span>
                                <Link to={'/register'} className='ms-1'>
                                    Create a free account
                                </Link>
                            </div>
                        </div>
                        <div className="login-social mt-5 row">
                            <div className="col-4">
                                <div className="option-item">
                                    <img src="https://shofy-angular.vercel.app/assets/img/icon/login/google.svg" alt="" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="option-item">
                                    <img src="https://shofy-angular.vercel.app/assets/img/icon/login/facebook.svg" alt="" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="option-item">
                                    <img src="https://shofy-angular.vercel.app/assets/img/icon/login/apple.svg" alt="" />
                                </div>
                            </div>

                        </div>

                        <div className="text-center-auth mt-5 row align-items-center">
                            <hr className='col-2 col-md-3 col-lg-4' />
                            <p className='col-8 col-md-6 col-lg-4 text-center'>
                                or Sign in with Email
                            </p>
                            <hr className='col-2 col-md-3 col-lg-4'/>
                        </div>

                        <div className="form-input mt-5">
                            <div className="input w-100">
                                <TextField 
                                id="outlined-basic" 
                                className='w-100'
                                label="Enter Your Email"
                                type='email' 
                                variant="outlined"
                                onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                            <div className="input mt-4 w-100">
                                <TextField 
                                id="outlined-basic" 
                                className='w-100'
                                label="Enter Your Password" 
                                type='password' 
                                variant="outlined"
                                onChange={(e)=>{setPass(e.target.value)}} />
                            </div>
                            <div className="btn-submit mt-4">
                                <button onClick={handleSubmit} className='btn rounded-0'>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;