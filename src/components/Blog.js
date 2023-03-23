import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogSlice'

const Blog = ({ blog }) => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const [showBlogDetails, setShowBlogDetails] = useState(false)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const deleteButtonStyle = {
		backgroundColor: 'lightblue',
		border: 'none',
		borderRadius: '4px',
		padding: '2px 4px',
		margin: '2px 1px'
	}

	const isBlogOwnedByUser = (username) => {
		return user.username === username
	}

	const handleIncrementLikes = () => {
		dispatch(updateBlog(blog.id, {
			...blog,
			likes: blog.likes + 1
		}))
	}

	const toggleBlogDetails = () => {
		setShowBlogDetails(!showBlogDetails)
	}

	const handleDeletion = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id, blog))
		}
	}

	return (
		<div className='blog' style={blogStyle}>
			<span className='blog-title'>
				{blog.title} {blog.author}
				<button onClick={toggleBlogDetails}>{showBlogDetails ? 'hide' : 'show'}</button>
			</span>
			<div
				className='blog-details'
				style={{ 'display': showBlogDetails ? '' : 'none' }}
			>
				<div className='blog-detail'>
					<a className='blog-url' href={blog.url}>{blog.url}</a>
				</div>
				<div className='blog-detail'>
					<span className='blog-likes'>likes {blog.likes}
						<button onClick={handleIncrementLikes}>like</button>
					</span>
				</div>
				<div className='blog-detail'>
					<p className='blog-user'>
						{blog.user.name || blog.user.username}
					</p>
				</div>
				<div className='blog-detail'>
					{isBlogOwnedByUser(blog.user.username) &&
						<button
							id='blog-remove'
							style={deleteButtonStyle}
							onClick={handleDeletion}
						>remove</button>}
				</div>
			</div>
		</div>
	)
}

export default Blog