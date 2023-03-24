import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationSlice';
import blogReducer from './reducers/blogSlice'
import loggedUserReducer from './reducers/loggedUserSlice'
import usersReducer from './reducers/usersSlice'

export const store = configureStore({
	reducer: {
		notifications: notificationReducer,
		blogs: blogReducer,
		user: loggedUserReducer,
		users: usersReducer
	},
})