import { useSelector } from 'react-redux'

const Notification = () => {
	const notifications = useSelector((state) => state.notifications)

	if (!notifications.length) return ''

	const lastElementIndex = notifications.length - 1
	const { message, type } = notifications[lastElementIndex]

	return (
		<div className={`notif-${type}`}>
			{message}
		</div>
	)
}

export default Notification;