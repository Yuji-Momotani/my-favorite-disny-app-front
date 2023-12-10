import axios from "axios"

const auth = () => {
	const signup = async(name, password) => {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/signup`,
			{
				name: name,
				password: password,
			},
			// {withCredentials: true,}
		)
		return res
	}
	const login = async(name, password) => {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/login`,
			{
				name:name,
				password:password,
			},
			// {withCredentials: true,}
		)
		return res
	}
	const logout = async() => {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/logout`,
			// {withCredentials: true}
		)
		return res
	}
	return {signup, login, logout}
}

export default auth