import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Character from './components/Character';
import Auth from './components/Auth/Auth';
import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
	useEffect(() => {
		const getCsrf = async() => {
			axios.defaults.withCredentials = true;
			const {data} = await axios.get(
				`${process.env.REACT_APP_API_URL}/csrf`,
				// {withCredentials: true}
			)
			axios.defaults.headers.common["X-CSRF-Token"] = data.csrf_token;
		}
		getCsrf()
	})
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Auth/ >} />
				<Route path="/search" element={<Character/>} />
			</Routes>
		</Router>
	);
}

export default App;
