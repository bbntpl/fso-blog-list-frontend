import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = (boolean) => {
		setVisible(boolean) || setVisible(!visible)
	}

	useImperativeHandle(refs, () => ({
		toggleVisibility
	}))

	return (
		<div className='togglable'>
			<div style={hideWhenVisible}>
				<Button onClick={toggleVisibility} variant='contained'>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button
					onClick={toggleVisibility}
					variant='text
				'>cancel</Button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable