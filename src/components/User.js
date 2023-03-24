import { Link } from 'react-router-dom'

const User = ({ userInfo }) => {
	const { numOfBlogs, name } = userInfo

	return (
		<tr>
			<td>
				<Link to={userInfo.id}>
					{name}
				</Link>
			</td>
			<td>{numOfBlogs}</td>
		</tr>
	)
}

export default User