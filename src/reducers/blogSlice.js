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
		removeBlog(state, action) {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		},
		likeBlog(state, action) {
			const id = action.payload
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
export const updateBlog = (id, updatedBlog) => {
	return dispatch => {
		blogService.update(id, updatedBlog)
			.then(() => {
				dispatch(likeBlog(id))
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