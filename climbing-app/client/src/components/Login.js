import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Signup from './Signup';

function Login() {
	const [isSignup, setSignup] = useState(false);
	const [isLogin, setLogin] = useState(true);
	const navigate = useNavigate();

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
		navigate('/:id');
	};

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		navigate('/:id');
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		setSignupValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	console.log(signupValues);

	const showSignup = () => {
		setSignup(true);
		hideLogin();
	};

	const hideLogin = () => {
		setLogin(false);
	};

	const showLogin = () => {
		setLogin(true);
	};

	return (
		<>
			{isLogin && (
				<div>
					<form className="loginForm" onSubmit={handleLoginSubmit}>
						<h2>Login</h2>
						<div className="form_error">
							Incorrect username/password combination
						</div>
						<div className="htmlForm-group">
							<label htmlFor="exampleInputEmail1">Email address</label>
							<input
								type="email"
								className="htmlForm-control"
								id="exampleInputEmail1"
								autoFocus
								required
								aria-describedby="emailHelp"
								placeholder="Enter email"></input>
							onChange={(e) => handleInputChange(e)}
						</div>
						<div className="htmlForm-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input
								type="password"
								className="htmlForm-control"
								id="exampleInputPassword1"
								required
								autoFocus
								placeholder="Password"></input>
							onChange={(e) => handleInputChange(e)}
						</div>
						{/* <div className="htmlForm-check">
							<input
								type="checkbox"
								className="htmlForm-check-input"
								id="exampleCheck1"></input>
							<label className="htmlForm-check-label" htmlFor="exampleCheck1">
								Check me out
							</label>
						</div> */}
						<button type="submit" className="btn btn-primary">
							Log in
						</button>
					</form>

					{/* sign up form only appears when I click on 'Don't have account */}
					<p class="toCreateAccount">
						<span>Don't have an account yet?</span>
					</p>
					<button
						className="btn btn-trasnparent signupBtn"
						onClick={showSignup}>
						Create one!
					</button>

					{/* <p class="toCreateAccount">
					<NavLink to="/signup" className="formLink" id="linkCreateAccount">
						Create one!
					</NavLink>
				</p> */}
				</div>
			)}
			{isSignup && (
				<div>
					<form className="signupForm" onSubmit={handleSignupSubmit}>
						<h2>Create account</h2>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="inputName">Name</label>
								<input
									type="text"
									name="Name"
									className="form-control"
									id="inputName"
									required
									placeholder="Name"
									onChange={(e) => handleInputChange(e)}></input>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="inputSurame">Surname</label>
								<input
									type="text"
									name="Surname"
									className="form-control"
									id="inputSurname"
									required
									placeholder="Surmame"
									onChange={(e) => handleInputChange(e)}></input>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="inputEmail">Email</label>
								<input
									type="email"
									name="email"
									className="form-control"
									id="inputEmail"
									required
									placeholder="Email"
									onChange={(e) => handleInputChange(e)}></input>
							</div>

							<div className="form-group col-md-6">
								<label htmlFor="inputUsername">Username</label>
								<input
									type="text"
									name="userName"
									className="form-control"
									id="inputUsername"
									required
									placeholder="Username"
									onChange={(e) => handleInputChange(e)}></input>
							</div>
						</div>
						{/* password needs to have some conditions to be accepted */}
						<div className="form-group">
							<label htmlFor="inputPassword4">Password</label>
							<input
								type="password"
								name="password"
								className="form-control"
								id="inputPassword"
								required
								placeholder="Password"
								onChange={(e) => handleInputChange(e)}></input>
						</div>

						{/* <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"></input>
                </div> */}

						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="inputCity">City</label>
								<input
									type="text"
									name="city"
									className="form-control"
									id="inputCity"
									required
									onChange={(e) => handleInputChange(e)}></input>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="inputCountry">Country</label>
								<input
									type="text"
									name="country"
									className="form-control"
									id="inputCountry"
									required
									onChange={(e) => handleInputChange(e)}></input>
							</div>
							<div className="form-group col-md-2">
								<label htmlFor="inputZip">Zip</label>
								<input
									type="text"
									name="zip"
									className="form-control"
									id="inputZip"
									required
									onChange={(e) => handleInputChange(e)}></input>
							</div>
						</div>
						<div className="form-group"></div>
						<button
							type="submit"
							onCLick={showLogin}
							className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			)}
		</>
	);
}

export default Login;
