import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notifyUser } from './notificationSlice'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUserCredentials(_, action) {
			return action.payload
		}
	}
})

export const { setUserCredentials } = userSlice.actions

export const initializeUser = () => {
	return dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUserCredentials(user))
			blogService.setToken(user.token)
		}
	}
}

export const nullifyUser = () => {
	return dispatch => {
		dispatch(setUserCredentials(null));
		window.localStorage.removeItem('loggedUser');
	}
}

export const submitUserCredentials = (user) => {
	return async dispatch => {
		window.localStorage.setItem('loggedUser', JSON.stringify(user));
		blogService.setToken(user.token);
		dispatch(setUserCredentials(user));
		dispatch(notifyUser(
			`${user.name || user.user} successfully logged in!`,
			'success'
		))
	}
}

export default userSlice.reducer