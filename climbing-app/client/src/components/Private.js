import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Private({ setLogin, logout }) {
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

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
	/*  */

	//MOVED THIS TO App.JS:
	/* const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
		//	deactivateLogin();
	}; */

	return (
		<div>
			<div>{message}</div>
			<button className="btn btn-outline-dark ml-2" onClick={logout}>
				Log out
			</button>
		</div>
	);
}

export default Private;
