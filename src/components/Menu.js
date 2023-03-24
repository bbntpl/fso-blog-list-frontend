import { NavLink as RouterNavLink } from 'react-router-dom';
import { Link as MaterialLink, Box, Typography, Toolbar, AppBar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import UserDetails from './UserDetails';

const NavMenu = () => {
	const user = useSelector(state => state.user)

	const navItems = [
		{
			text: 'Blogs',
			to: '/blogs',
		},
		{
			text: 'Users',
			to: '/users',
		}
	]

	return (
		<Box sx={{ display: 'flex', p: 4 }}>
			<AppBar component="nav" color='primary'>
				<Toolbar>
					<Typography
						variant="h5"
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
					>
						Blog App
					</Typography>
					{
						user !== null && <Box sx={{
							display: { xs: 'flex', sm: 'flex' },
							flexDirection: 'row',
							justifyContent: 'center'
						}}>
							{navItems.map((item) => (
								<Button
									key={item.text}
									sx={{ margin: '0 8px' }}
								>
									<MaterialLink
										component={RouterNavLink}
										sx={{ color: '#fff' }}
										{...item}
									>
										{item.text}
									</MaterialLink>
								</Button>
							))}
							<UserDetails />
						</Box>
					}
				</Toolbar>
			</AppBar>
		</Box >
	)
}

export default NavMenu