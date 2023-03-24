// import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'

const UserBlogList = () => {
	const match = useMatch('users/:id')
	const { id } = useParams()
	const user = useSelector(state => state.users.find(user => user.id === id))

	if (!user) {
		return <p>loading ...</p>
	}

	const userInfo = match ? user : null
	return (
		<>
			<h3>added blogs</h3>
			<ul>
				{
					userInfo.blogs.map((blog, index) => {
						return (
							<li key={index}>
								<p>{blog.title}</p>
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

export default UserBlogList