import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import {connect} from 'react-redux';
//import DefaultUserPic from "../uploads/team-male.jpg";
import axios from 'axios';
// import LoginNavBar from '../../shared/nav-bar/login-navbar';

const UpdateProfile = (props) => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setlastName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState(null)
	const [email, setEmail] = useState('')
	const [company, setCompany] = useState('')

	const changeFirstName = event => setFirstName(event.target.value)

	const changeLastName = event => setlastName(event.target.value)

	const changePhoneNumber = event => setPhoneNumber(event.target.value)

	const changeEmail = event => setEmail(event.target.value)

	const changeCompany = event => setCompany(event.target.value)

	const onSubmit = (event) => {
		// prevents form from acting in default way, stops refreshing
		event.preventDefault()
		const users = {
			firstName,
			lastName,
			phoneNumber,
			email,
			company,
		}

		// everything stored in registered will send to backend (url) then to mongo
		axios.post('http://localhost:4000/update-profile', users, { headers: { Authentication: localStorage.getItem('auth') } })
			.then(res => console.log(res.data))

	}

	useEffect(() => {
		axios.get('http://localhost:4000/profile', { headers: { Authentication: localStorage.getItem('auth') } })
			.then(res => {
				setFirstName(res.data.firstName)
				setlastName(res.data.lastName)
				setCompany(res.data.company)
				setPhoneNumber(res.data.phoneNumber)

				console.log(res.data)
			})

	}, [])

	/*
	fetchUserDetails=(user_id)=>{
		//console.log(user_id);
		axios.get("http://localhost:4000/users/"+user_id,{
			headers: {
				"content-type": "application/json"
			  }
		}).then(res=>{
			console.log(res);
			this.setState({email:res.data.results[0].email});
		})
		.catch(err=>console.log(err))
	}

	*/
	/*
	 UpdateProfileHandler=(e)=>{
		 e.preventDefault();
		 //create object of form data
		 const formData = new FormData();
		 
		 formData.append("user_id",this.state.user_id);
 
		 //update-profile - doesn't work
		 axios.post("http://localhost:4000/users/",formData,{
			 headers: {
				 "content-type": "application/json"
			   }
		 }).then(res=>{
			 console.log(res);
			 this.setState({msg:res.data.message});
		 })
		 .catch(err=>console.log(err))
	 }
 
 
	 componentDidMount(){
	  this.fetchUserDetails(this.state.user_id);
	 }
 */

	return (
		< Modal show={props.show} onHide={props.onClose} >
			<Modal.Header closeButton>
				<Modal.Title>Update User Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
							placeholder='Company'
							onChange={changeCompany}
							value={company}
							className='form-control form-group' />

						<input type='submit'
							className='btn btn-primary btn-block'
							value='Submit' />

					</form>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onClose}>
					Close
					</Button>
				<Button variant="primary" onClick={() => console.log('submitted')}>
					Save Changes
					</Button>
			</Modal.Footer >
		</Modal >
	);
}

export default UpdateProfile;