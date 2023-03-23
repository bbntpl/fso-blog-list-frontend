import { useDispatch, useSelector } from 'react-redux';
import { nullifyUser } from '../reducers/userSlice';

const UserDetails = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	return (
		<div style={{ 'margin': '1rem 0' }} className='user-details'>
			{user.name}
			<button onClick={() => dispatch(nullifyUser())}>logout</button>
		</div>
	)
}

export default UserDetails;