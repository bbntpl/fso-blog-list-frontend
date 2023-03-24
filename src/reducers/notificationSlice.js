import { createSlice } from '@reduxjs/toolkit'

const generateId = () =>
	Number((1000000 * Math.random()).toFixed(0))

const notificationSlice = createSlice({
	name: 'notifications',
	initialState: [],
	reducers: {
		setNotification(state, action) {
			// payload value consist of a notification object
			return state.concat(action.payload)
		},
		removeNotification(state, action) {
			const id = action.payload
			return state.filter(notifications => notifications.id !== id)
		}
	}
})

export const {
	setNotification,
	removeNotification
} = notificationSlice.actions

export const notifyUser = (message, type = 'error') => {
	return dispatch => {
		const notificationWithoutId = {
			message, type
		}
		const id = generateId()
		dispatch(setNotification({ ...notificationWithoutId, id }))
		setTimeout(() => {
			dispatch(removeNotification(id))
		}, 5000)
	}

}

export default notificationSlice.reducer