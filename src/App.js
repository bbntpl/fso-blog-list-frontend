import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Login from './components/Login';
import Notification from './components/Notification';
import Users from './components/Users';
import UserBlogList from './components/UserBlogList';
import Blog from './components/Blog';
import CommentSection from './components/CommentSection';
import BlogPage from './views/BlogPage';

import {
	initializeBlogs,
} from './reducers/blogSlice';
import {
	initializeUser,
} from './reducers/loggedUserSlice';
import { initializeUsers } from './reducers/usersSlice';
import NavMenu from './components/Menu';
import { Box, Container } from '@mui/material';

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
		dispatch(initializeUsers())
	}, [])

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	return (
		<Container maxWidth='sm'>
			<NavMenu />
			<Notification />
			<Box component="main">
				{
					user === null
						? <Login />
						:
						<Routes>
							<Route
								path={'/blogs/:id'}
								element={<>
									<Blog />
									<CommentSection />
								</>}
							/>
							<Route
								path={'/users/:id'}
								element={<UserBlogList />}
							/>
							<Route
								path={'/users'}
								element={<Users />}
							/>
							{
								['/blogs', '/'].map(p => (
									<Route
										key={p}
										path={p}
										element={<BlogPage />}
									/>
								))
							}
						</Routes>
				}
			</Box>
		</Container>
	)
}

export default App