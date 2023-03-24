import { useSelector } from 'react-redux';
import Blog from './BlogItem';

const Blogs = () => {
	const blogs = useSelector(state => [...state.blogs]
		.sort((a, b) => b.likes - a.likes))

	return (
		blogs.length === 0
			? <div>There are no blogs yet</div>
			: <div>
				{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
					/>
				)}
			</div>
	)
}

export default Blogs;