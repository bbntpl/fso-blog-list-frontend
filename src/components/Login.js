import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitUserCredentials } from '../reducers/loggedUserSlice';
import { notifyUser } from '../reducers/notificationSlice';
import loginService from '../services/login';

import { Button, TextField } from '@mui/material';

const Login = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password
			})
			dispatch(submitUserCredentials(user))
			setUsername('');
			setPassword('');
		} catch (exception) {
			dispatch(notifyUser(
				exception.response.data.error || 'Wrong username of password'
			));
		}
	}


	const changeUsername = ({ target }) => {
		const usernameInput = target.value
		setUsername(usernameInput);
	}

	const changePassword = ({ target }) => {
		const pwdInput = target.value
		setPassword(pwdInput);
	}

	return (
		<>
			<h1>Login to application</h1>
			<form onSubmit={handleLogin} id='login-form'>
				<div>
					<TextField
						label="Username"
						variant="outlined"
						id='username-input'
						type="text"
						value={username}
						name="Username"
						onChange={changeUsername}
					/>
				</div>
				<div>
					<TextField
						label="Password"
						variant="outlined"
						id='password-input'
						type="password"
						value={password}
						name="Password"
						onChange={changePassword}
					/>
				</div>
				<div id='login-button-wrapper'>
					<Button variant='outlined' id='login-btn' type="submit">login</Button>
				</div>
			</form>
		</>
	)
}

export default Login;