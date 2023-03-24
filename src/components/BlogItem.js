import { NavLink as RouterNavLink, useMatch } from 'react-router-dom';
import { Link as MaterialLink } from '@mui/material';
import theme from '../theme'

const BlogItem = ({ blog }) => {

	const match = useMatch('/blogs')
	const blogStyle = {
		backgroundColor: theme.palette.primary.main,
	}

	const navigateTo = match ? blog.id : `blogs/${blog.id}`

	return (
		<div className='blog-item' style={blogStyle}>
			<MaterialLink
				className='blog-title'
				component={RouterNavLink}
				to={navigateTo}
			>
				{blog.title} {blog.author}
			</MaterialLink>
		</div>
	)
}

export default BlogItem