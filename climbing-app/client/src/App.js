import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Form from './components/Form';
import Settings from './components/Settings';
import Login from './components/Login';
import Private from './components/Private';

// import Signup from './components/Signup';
import List from './components/List';
import Profile from './components/Profile';
import Preferences from './components/Preferences';
import logo from './images/logo.png';
import './App.css';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

function App() {
	const [isChecked, setChecked] = useState(false);
	//Sets lead prop in preferences & settings {}'s.
	const [recommendations, setRecommendations] = useState([]);
	//SetsRecommendations [] (= recommended climbers) based on preferences {}.
	const [days, setDays] = useState(['Saturday', 'Monday', 'Tuesday', 'Friday']);
	//Setsdays "active user" wants to climb based on daysOfWeek []. daysOfWeeks gets modified in Preferences & Settings forms
	const [location, setLocation] = useState('');
	const [isSignup, setSignup] = useState(false);
	const [isLogin, setLogin] = useState(false);

	//setsLocation "active user" profile.
	const navigate = useNavigate();

	//THIS COMING FROM /PRIVATE
	const [message, setMessage] = useState('');

	useEffect(() => {
		requestData();
	}, []);

	const requestData = async () => {
		let options = {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};

		try {
			const result = await fetch('private', options);
			const data = await result.json();

			if (!result.ok) setMessage(data.error);
			else setMessage(data.message);
		} catch (error) {
			console.log(error);
		}
	};

	const deactivateLogin = () => {
		setLogin(false);
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
		deactivateLogin();
	};

	//"active user" default settings. Displayed on Profile page
	const [settings, setSettings] = useState({
		id: 4, //HOW DO I MAKE THIS ID DINAMIC?
		firstname: '',
		lastname: '',
		username: '',
		password: '',
		email: '',
		gender: '',
		pronouns: '',
		bio: '',
		avatar: '',
		level: '',
		top: false,
	});

	//"active user" default preferences. Sets user matching criteria.
	// NB - lead, gender and level prop value in preferences can differ from lead, gender, levelprop in Settings.
	// i.e. User can be level = intermediate, but choose to match with advanced. Idem gender and lead.
	const [preferences, setPreferences] = useState({
		gender: '',
		level: '',
		lead: false,
	});

	//"active user" default days of climbing.
	//Replicated across settings and preferences forms i.e. Users must have matching days.
	const [daysOfWeek, setDaysOfWeek] = useState([
		{ name: 'Monday', checked: false },
		{ name: 'Tuesday', checked: false },
		{ name: 'Wednesday', checked: false },
		{ name: 'Thursday', checked: false },
		{ name: 'Friday', checked: false },
		{ name: 'Saturday', checked: false },
		{ name: 'Sunday', checked: false },
	]);

	//Fetches and setsLocation of "active user" using external API.
	//Replicated across settings and preferences forms i.e. Users must have matching location.
	/* const getLocation = () => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
				'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com',
			},
		};

		fetch(
			'https://ip-geo-location.p.rapidapi.com/ip/check?format=json',
			options
		)
			.then((response) => response.json())
			.then((response) => {
				console.log(JSON.stringify(response));
				setLocation(response.city.name);
			})
			.catch((err) => console.error(err));
	};
 */

	const [error, setError] = useState('');

	//Created with Vicky
	async function saveSettings(id) {
		let options = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(settings),
		};

		try {
			let response = await fetch(`/users/${id}`, options); // do PUT
			if (response.ok) {
				let users = await response.json();
				console.log('user updated');
			} else {
				console.log(`Server error: ${response.status} ${response.statusText}`);
			}
		} catch (err) {
			console.log(`Server error: ${err.message}`);
		}
	}

	async function addUser() {
		let options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(settings),
		};

		try {
			let response = await fetch(`/register`, options); // do PUT
			if (response.ok) {
				let users = await response.json();
				console.log('user added');
			} else {
				console.log(`Server error: ${response.status} ${response.statusText}`);
			}
		} catch (err) {
			console.log(`Server error: ${err.message}`);
		}
	}

	//Fetches users from db based on level, gender, lead props in preferences {}, days [] & location
	const getRecommendations = async () => {
		try {
			let results = await fetch('/recommend', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					location,
					days,
					level: preferences.level,
					gender: preferences.gender,
					top: preferences.lead,
				}),
			});
			let users = await results.json();
			console.log(users);
			//if db query successful > fetched users get pushed into recommendations []
			setRecommendations(users);
			console.log(recommendations);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setSettings((state) => ({
			...state,
		}));
		setPreferences((state) => ({
			...state,
		}));
		getRecommendations(); //Makes sure myMatches is not empty when first loading.
		//Matched based on default values preferences {}, days [] & location.
		//getLocation(); // sets "active user" geolocation when first loading
		navigate('/'); //nagivates to homescreen when first loading.
	}, []);

	let activeClassName = 'btn btn-sm btn-warning';

	const activateLogin = () => {
		setLogin(true);
	};

	return (
		<div className="main container-fluid text-center">
			<div className="flex-row">
				{/*Switches to different views using React Router Navlink*/}
				<div>
					<NavLink to="/">
						<img
							className="nav-logo m-2"
							src={logo}
							alt="logo"
							onClick={() => navigate('/')}
						/>
					</NavLink>
				</div>

				<nav className="nav navbar nav-masthead p-2">
					{/* 	<div className="align-self-start">
						<NavLink
							to="/settings"
							className={({ isActive }) =>
								isActive ? activeClassName : undefined
							}>
							<span className="nav-item material-symbols-outlined m-2 p-1 icon">
								settings
							</span>
						</NavLink>
					</div> */}

					<div className="align-self-start">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? activeClassName : undefined
							}>
							<span className="material-symbols-outlined m-2 p-1 icon">
								home
							</span>
						</NavLink>
					</div>
					<div className="align-self-center">
						{isLogin && (
							<NavLink
								to="/preferences"
								className={({ isActive }) =>
									isActive ? activeClassName : undefined
								}>
								<button className="text-white btn m-1">myPreferences</button>
							</NavLink>
						)}
						{isLogin && (
							<NavLink
								to="/profile"
								className={({ isActive }) =>
									isActive ? activeClassName : undefined
								}>
								<button className="text-white btn m-1">myProfile </button>
							</NavLink>
						)}
						{/*Switches to different view AND fetches new recommendations*/}
						{isLogin && (
							<NavLink
								to="/matches"
								className={({ isActive }) =>
									isActive ? activeClassName : undefined
								}>
								<button
									onClick={() => getRecommendations}
									className="text-white btn m-1">
									myMatches{' '}
								</button>
							</NavLink>
						)}
					</div>

					<div className="align-self-right m-2 p-1">
						{!isLogin && (
							<NavLink
								to="/login"
								className={({ isActive }) =>
									isActive ? activeClassName : undefined
								}>
								<button className="text-white btn m-1">Log in/Sign up</button>
							</NavLink>
						)}
					</div>
					{isLogin && (
						<div className="align-self-right m-2 p-1">
							<button onClick={logout} className="text-white btn m-1">
								Log out{' '}
							</button>
						</div>
					)}
				</nav>
			</div>

			<Routes>
				<Route path="/" element={<Home />}></Route>

				<Route
					path="/settings"
					element={
						<Form
							handleSubmit={
								//define handlesubmit for settings (PUT)
								(e) => {
									e.preventDefault();
									saveSettings(settings.id);
									navigate('/profile');
									console.log('submitting routeSettings');
								}
							}
							settings={settings}
							setSettings={setSettings}
							days={days}
							setDays={setDays}
							setChecked={setChecked}
							navigate={navigate}
							daysOfWeek={daysOfWeek}
							location={location}
							setLocation={setLocation}
						/>
					}></Route>

				{/* <Route path="/signup" element={<Signup />}></Route> */}

				<Route path="/login" element={<Login setLogin={setLogin} />}></Route>

				<Route
					path="/signup"
					element={
						<Form
							handleSubmit={
								//define handlesubmit for settings (PUT)
								(e) => {
									e.preventDefault();

									addUser();
									navigate('/profile');
									activateLogin();
									console.log('submitting routeSettings');
								}
							}
							setLogin={setLogin}
							settings={settings}
							setSettings={setSettings}
							days={days}
							setDays={setDays}
							setChecked={setChecked}
							navigate={navigate}
							daysOfWeek={daysOfWeek}
							location={location}
							setLocation={setLocation}
						/>
					}></Route>

				<Route
					path="/private"
					element={
						<Private
						//
						/>
					}></Route>

				<Route
					path="/preferences"
					element={
						<Preferences
							preferences={preferences}
							setPreferences={setPreferences}
							setDays={setDays}
							setChecked={setChecked}
							navigate={navigate}
							getRecommendations={getRecommendations}
							daysOfWeek={daysOfWeek}
							location={location}
							setLocation={setLocation}
						/>
					}></Route>

				<Route
					path="/profile"
					element={
						<Profile
							settings={settings}
							getRecommendations={getRecommendations}
							location={location}
							navigate={navigate}
						/>
					}></Route>

				<Route
					path="/matches"
					element={<List recommendations={recommendations} />}></Route>
			</Routes>

			<footer className="p-2 text-white text-left">
				<p className="p-2 font-italic"> CodeOp Project 2023 </p>
			</footer>
		</div>
	);
}

export default App;
