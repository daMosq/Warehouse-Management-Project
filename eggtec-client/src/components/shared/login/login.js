import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import styles from './login.module.css';
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import LoginNavBar from '../../shared/nav-bar/login-navbar';



const LoginForm = (props) => {

    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    useEffect(() => {
        const token = localStorage.getItem("auth")
        if(token){
            redirectToDashboard()
        }
        
    }, [])
    /*
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    */

    const handleChange = (event) => {
        const { id, value } = event.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    /*
    const changeEmail = event => setemail(event.target.value)

    const changePassword = event => setpassword(event.target.value)
    */

    const onSubmit = (event) => {
        event.preventDefault()
        const login = {
            "email": state.email,
            "password": state.password,
            successMessage: null
        }

        axios.post('http://localhost:4000/', login)
        .then(res => {
            if(res.status === 200){
                setState(prevState => ({
                    ...prevState,
                    'successMessage': 'Login successful. Redirecting to dashboard'
                }))
                localStorage.setItem('auth', res.data.token)
                redirectToDashboard();
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    'successMessage': "Incorrect Login"
                }))
              
            }
            
        })
        .catch( error => {
            console.log(error)
            setState(prevState => ({
                ...prevState,
                'successMessage': 'Login Error, Try Again'
            }))
        });
        
            
    }
    const redirectToDashboard = () => {

        window.location.href = '/dashboard';
    }
           
        return (
            <>
            <LoginNavBar/>
            <div className={styles.container}>
            
            <div className="card col-12 col-lg-4 login-card mt-2">
    
            <h1>Login</h1>
            <form>
                <div className="form-group text-left">
                    <label for="email">E-mail</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group text-left">
                    <label for="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={onSubmit}
                >Login</button>

                &nbsp; No Account? &nbsp;
                <input
                    type="button" value="Register" className="btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/register';
                    }}
                /> 
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
           
        </div>
        </div>
        </>
        )
    
}

export default LoginForm;