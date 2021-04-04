import { Redirect, Link } from "react-router-dom";
import React, { Component, useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RegisterForm = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState('')

    // changes state values 
   
    const changeFirstName = event => setFirstName(event.target.value)

    const changeLastName = event => setlastName(event.target.value)

    const changePhoneNumber = event => setPhoneNumber(event.target.value)

    const changeEmail = event => setEmail(event.target.value)

    const changeCompany = event => setCompany(event.target.value)

    const changePassword = event => setPassword(event.target.value)

    const checkboxHandler = event => null;
    // will grab all details user typed in and saved in 'registered' after user clicks submit
    // want to send 'registered' to the backend, use axios
    const onSubmit = (event) => {
        // prevents form from acting in default way, stops refreshing
        event.preventDefault()
        const registered = {
            firstName,
            lastName,
            phoneNumber,
            email,
            company,
            password
        }

        seterror('')
        // everything stored in registered will send to backend (url) then to mongo
        axios.post('http://localhost:4000/register', registered)
            .then(res => {
                console.log(res.data)
                if(res.data.token){
                    localStorage.setItem('auth', res.data.token)

                    redirectToDashboard();
                }
                else{
                    seterror('Invalid')
                }
        })



    }
    const redirectToDashboard = () => {

        window.location.href = '/dashboard';
    }

    return (
        <div>

            <h1 className='text-center'>Register New User</h1>
            <div>
                <div className='container form-div d-flex justify-content-center'>
                    <form onSubmit={onSubmit}>
                        <input type='text'
                            placeholder='First Name'
                            onChange={changeFirstName}
                            value={firstName}
                            className='form-control form-group' />

                        <input type='text'
                            placeholder='Last Name'
                            onChange={changeLastName}
                            value={lastName}
                            className='form-control form-group' />

                        <input type='number'
                            placeholder='Phone Number'
                            onChange={changePhoneNumber}
                            value={phoneNumber}
                            className='form-control form-group' />

                        <input type='text'
                            placeholder='E-mail'
                            onChange={changeEmail}
                            value={email}
                            className='form-control form-group' />

                        <input type='text'
                            placeholder='Company'
                            onChange={changeCompany}
                            value={company}
                            className='form-control form-group' />

                        <input type='password'
                            placeholder='Password'
                            onChange={changePassword}
                            value={password}
                            className='form-control form-group' />

                        <input type='submit' className='btn btn-primary btn-block'
                            value='Submit' />
                            <p>{error}</p>

                        <div className='text-center'>
                            <input type='checkbox' id='agree'
                                onChange={checkboxHandler} />
                            <label className='p-1' type='text'> I accept the terms & conditions </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default RegisterForm;