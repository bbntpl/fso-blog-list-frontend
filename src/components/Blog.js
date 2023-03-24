import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'
import { deleteBlog, likeBlog, updateBlog } from '../reducers/blogSlice'

const Blog = () => {
	const match = useMatch('blogs/:id')
	const { id } = useParams()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const blog = match
		? useSelector(state => state.blogs.find(blog => blog.id === id))
		: null

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
		const updateBlogParams = {
			id: blog.id,
			requestedData: {
				...blog,
				likes: blog.likes + 1
			},
			callback: likeBlog,
			options: { id: blog.id }
		}
		dispatch(updateBlog(updateBlogParams))
	}

	const handleDeletion = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id, blog))
		}
	}

	if (!blog) {
		return <p>loading...</p>
	}

	return (
		<div
			className='blog-details'
		>
			<h1 className='blog-title'>{blog.title}</h1>
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
					added by {blog.user.name || blog.user.username}
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
	)
}

export default Blog