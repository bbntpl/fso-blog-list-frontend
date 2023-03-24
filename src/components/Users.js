import { useSelector } from 'react-redux'
import User from './User'

const Users = () => {
	const users = useSelector(state => state.users)

	return (
		<div>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th><b>blogs created</b></th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((user, index) => {
							const userInfo = {
								name: user.name,
								numOfBlogs: user.blogs.length,
								id: user.id
							}
							return (
								<User userInfo={userInfo} key={index} />
							)
						})
					}
				</tbody>
			</table>

		</div>
	)
}

export default Users