import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nullifyUser } from '../reducers/loggedUserSlice';

const UserDetails = () => {
	const user = useSelector(state => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(nullifyUser(user))
		navigate('/')
	}

	return (
		<div
			className='user-details'>
			<div>{user.name}</div>
			<Button
				onClick={handleLogout}
				variant="outlined"
				style={{ backgroundColor: 'white', margin: '0 5px' }}
			>logout</Button>
		</div>
	)
}

export default UserDetails;