import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notifications = useSelector((state) => state.notifications)

	if (!notifications.length) return ''

	const lastElementIndex = notifications.length - 1
	const { message, type } = notifications[lastElementIndex]

	return (
		<Alert severity={type} sx={{ margin: '1rem 0' }}>
			{message}
		</Alert>
	)
}

export default Notification;