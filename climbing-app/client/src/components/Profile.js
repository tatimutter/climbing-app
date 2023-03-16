import React, { useState, useEffect } from 'react';
import '../App.css';

function Profile({ location, navigate, getRecommendations }) {
	//Fetches recommended climbers from db and sets 'recommendations []'
	//Switches to myMatches vuew where user sees recommendations
	const findPartners = () => {
		getRecommendations();
		navigate('/matches');
	};
	const [settings, setSettings] = useState({});
	useEffect(()=>{
		getUserInfo();
	}, [])
	
	async function getUserInfo() {
		let results = await fetch(`/users/10`);
		let user = await results.json();
		console.log(user)
		//if db query succesfull > sets featured user
		setSettings(user[0])
	}
	console.log(settings);
	
	return (
		<div className="bg-2 d-flex justify-content-center align-items-center">
			<div className="card">
				<div className="user text-center">
					<div className="profile">
						<img
							src={settings.avatar}
							alt="profile_avatar"
							className="rounded-circle"
							width="100"
						/>
					</div>
				</div>

				<div className="mt-5 text-center">
					<h4 className="p-2 mb-0"> {settings.username} </h4>
					<span className="d-block mb-2"> {settings.pronouns}</span>

					<button
						className="btn btn-warning btn-sm follow"
						onClick={findPartners}>
						Get Matched
					</button>

					<div className="d-flex justify-content-between align-items-center mt-4 px-4">
						<span className="bio col-12 text-center">{settings.bio}</span>
					</div>

					<div className="d-flex justify-content-between align-items-center mt-4 px-4">
						<div className="stats">
							<h6 className="mb-0"> Location </h6>
							<span> {location}</span>
						</div>

						<div className="stats">
							<h6 className="mb-0"> Level </h6>
							<span> {settings.level}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
