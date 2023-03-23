import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationSlice';
import blogReducer from './reducers/blogSlice'
import userReducer from './reducers/userSlice'

export const store = configureStore({
	reducer: {
		notifications: notificationReducer,
		blogs: blogReducer,
		user: userReducer
	},
})