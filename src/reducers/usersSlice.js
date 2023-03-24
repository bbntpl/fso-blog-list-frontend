import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(_, action) {
			return action.payload
		}
	}
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
	return dispatch => {
		userService.getAllUsers().then(data => {
			dispatch(setUsers(data))
		})
	}
}

export default usersSlice.reducer