import { useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const CommentSection = () => {
	const match = useMatch('blogs/:id')
	const { id } = useParams()
	const blog = match
		? useSelector(state => state.blogs.find(blog => blog.id === id))
		: null

	if (!blog) return ''

	return (
		<div>
			<h3>comments</h3>
			<CommentForm blog={blog} />
			<ul>
				{
					blog.comments.map((comment, index) => (
						<li key={index}>{comment}</li>
					))
				}
			</ul>
			{!blog.comments.length && <p>No comments yet</p>}
		</div>
	)
}

export default CommentSection