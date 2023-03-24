import { useRef } from 'react';
import BlogForm from '../components/BlogForm';
import Blogs from '../components/Blogs';
import Togglable from '../lib/Togglable';

const BlogPage = () => {
	const blogFormRef = useRef()

	const toggleBlogFormVisibility = () => {
		blogFormRef.current.toggleVisibility();
	}

	return (
		<div>
			<h1>blogs</h1>
			<Togglable
				buttonLabel='create new blog'
				ref={blogFormRef}
			>
				<BlogForm toggleBlogFormVisibility={toggleBlogFormVisibility} />
			</Togglable>
			<Blogs />
		</div >
	)
}

export default BlogPage