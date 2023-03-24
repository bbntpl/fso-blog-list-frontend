import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, updateBlog } from '../reducers/blogSlice'

const CommentForm = ({ blog }) => {
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')

	const handleChange = (event) => {
		setComment(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const updateBlogParams = {
			id: blog.id,
			requestedData: { comment },
			callback: addComment,
			options: {
				id: blog.id,
				comment,
				relativePath: 'comments'
			}
		}
		dispatch(updateBlog(updateBlogParams))
		setComment('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				name='comment'
				onChange={handleChange}
				value={comment}
			/>
			<button>add comment</button>
		</form>
	)
}

export default CommentForm