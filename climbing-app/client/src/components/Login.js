import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import axios from 'axios';

function Login({ setSignup, setLogin }) {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});

	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const activateLogin = () => {
		setLogin(true);
	};

	const login = async () => {
		try {
			let options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			};
			const result = await fetch('login', options);
			const data = await result.json();
			if (!result.ok) setError(data.error);
			else {
				//store token locally
				localStorage.setItem('token', data.token);
				//redirect to private page
				//navigate('/private');
				navigate('/profile');
				activateLogin();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const [signupValues, setSignupValues] = useState({
		name: '',
		surname: '',
		username: '',
		email: '',
		password: '',
		city: '',
		country: '',
		zip: '',
	});

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		//	navigate('/:id');
	};

	/* const handleSignupSubmit = (e) => {
		e.preventDefault();
		navigate('/:id');
	}; */

	const handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		setSignupValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		setSignupValues((state) => ({
			...state,
		}));
		// setPreferences((state) => ({
		// 	...state,
		// }));
		// getRecommendations(); //Makes sure myMatches is not empty when first loading.
		// //Matched based on default values preferences {}, days [] & location.
		// getLocation(); // sets "active user" geolocation when first loading
		// navigate('/'); //nagivates to homescreen when first loading.
	}, []);

	/* const showSignup = () => {
		setSignup(true);
		hideLogin();
	};

	const hideLogin = () => {
		setLogin(false);
	}; */

	return (
		<>
			<div>
				<form className="loginForm" onSubmit={handleLoginSubmit}>
					<h2>Login</h2>
					{/* <div className="form_error">
							Incorrect username/password combination
						</div> */}
					<div className="htmlForm-group">
						<label htmlFor="exampleInputEmail1">Username</label>
						<input
							value={credentials.username}
							type="text"
							name="username"
							onChange={handleChange}
							className="htmlForm-control"
							id="inputUsername"
							autoFocus
							required
							placeholder="Enter username"></input>
					</div>
					<div className="htmlForm-group">
						<label htmlFor="inputPassword1">Password</label>
						<input
							type="password"
							className="htmlForm-control"
							value={credentials.password}
							onChange={handleChange}
							name="password"
							id="inputPassword"
							required
							autoFocus
							placeholder="Password"></input>
					</div>

					<button type="submit" className="btn btn-primary" onClick={login}>
						Log in
					</button>
					{/* Give a content to error! */}
					{error}
				</form>

				{/* sign up form only appears when I click on 'Don't have account */}
				<p class="toCreateAccount">
					<span>Don't have an account yet?</span>
				</p>

				<button
					className="btn btn-trasnparent signupBtn"
					type="submit"
					onClick={() => navigate('/signup')}>
					Create one!
				</button>
			</div>
		</>
	);
}

export default Login;
