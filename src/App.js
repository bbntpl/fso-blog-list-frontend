import { useState, useEffect, useRef } from 'react'

import Login from './components/Login';
import Blogs from './components/Blogs';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import Togglable from './lib/Togglable';
import {
	notifyUser,
} from './reducers/notificationSlice';
import {
	initializeBlogs,
} from './reducers/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
	initializeUser,
	submitUserCredentials
} from './reducers/userSlice';
import loginService from './services/login';

const App = () => {
	const blogFormRef = useRef()
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const toggleBlogFormVisibility = () => {
		blogFormRef.current.toggleVisibility();
	}

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUser())
	}, [])

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

	const loginHandlers = {
		submitUserCredentials: handleLogin,
		changeUsername: ({ target }) => {
			const usernameInput = target.value
			setUsername(usernameInput);
		},
		changePassword: ({ target }) => {
			const pwdInput = target.value
			setPassword(pwdInput);
		}
	}

	return (
		<>
			<h1>
				{
					user === null
						? 'log in to application'
						: 'blogs'
				}
			</h1>
			<Notification />
			<div>
				{
					user === null
						? <Login
							loginHandlers={loginHandlers}
							username={username}
							password={password}
						/>
						: <div>
							<UserDetails />
							<Togglable
								buttonLabel='create new blog'
								ref={blogFormRef}
							>
								<BlogForm toggleBlogFormVisibility={toggleBlogFormVisibility} />
							</Togglable>
							<Blogs />
						</div>
				}
			</div>
		</>
	)
}

export default App