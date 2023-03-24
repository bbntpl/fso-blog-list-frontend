import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { notifyUser } from './notificationSlice';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		addBlog(state, action) {
			return state.concat(action.payload)
		},
		addComment(state, action) {
			const { id, comment } = action.payload
			return state.map(o => {
				if (id === o.id) {
					return {
						...o,
						comments: o.comments.concat(comment)
					}
				}
				return o
			})
		},
		removeBlog(state, action) {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		},
		likeBlog(state, action) {
			const id = action.payload.id
			return state.map(blog => {
				if (blog.id === id) {
					return {
						...blog,
						likes: blog.likes + 1
					}
				}
				return blog
			})
		},
		setBlogs(_, action) {
			return action.payload
		}
	}
})

export const {
	addBlog,
	addComment,
	removeBlog,
	likeBlog,
	setBlogs
} = blogSlice.actions

export const initializeBlogs = () => {
	return dispatch => {
		blogService.getAll().then(blogs => {
			dispatch(setBlogs(blogs));
			console.log('# of blogs: ', blogs.length);
		})
	}
}

export const createBlog = (newBlog) => {
	return dispatch => {
		blogService.create(newBlog)
			.then(data => dispatch(addBlog(data)))
			.catch(exceptions => {
				dispatch(notifyUser(exceptions.response.data.error))
			})

		dispatch(notifyUser(`Added "${newBlog.title}" by ${newBlog.author}`,
			'success'
		));
	}
}

export const updateBlog = ({ id, requestedData, callback, options }) => {
	const { relativePath = '', ...params } = options
	return dispatch => {
		blogService.update(id, requestedData, relativePath)
			.then(() => {
				dispatch(callback(params))
			})
			.catch(exceptions => {
				dispatch(notifyUser(exceptions.response.data.error || exceptions.message))
			})
	}
}

export const deleteBlog = (blogId, blog) => {
	return dispatch => {
		blogService.remove(blogId)
			.then(() => {
				dispatch(removeBlog(blogId))
				dispatch(notifyUser(`Successfully deleted ${blog.title} by ${blog.author}`))
			})
			.catch(exceptions => {
				dispatch(notifyUser(exceptions.response.data.error || exceptions.message))
			})
	}
}

export default blogSlice.reducer