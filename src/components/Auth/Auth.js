import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';

import auth from '../../util/auth';
import useError from '../../hooks/useError';

const Auth = () => {
	const [isLoginDisp, setIsLoginDist] = useState(true)
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()
	const {signup, login} = auth()
	const {switchErrorHandling} = useError()

	const sendUserForm = (e) => {
		e.preventDefault();
		if (isLoginDisp) {
			// ログイン
			const doLogin = async() => {
				try {
					debugger;
					await login(name, password)
					navigate("/search")
				} catch(err) {
					if (err.response.data.message) {
						// csrf,jwtミドルウェア系のエラーはmessageに入る
						switchErrorHandling(err.response.data.message)
					} else {
						switchErrorHandling(err.response.data)
					}
				}

			}
			doLogin()
		} else {
			// 登録
			const doSignup = async() => {
				try {
					debugger;
					await signup(name, password)
					await login(name, password)
					navigate("/search")
				} catch(err) {
					if (err.response.data.message) {
						// csrf,jwtミドルウェア系のエラーはmessageに入る
						switchErrorHandling(err.response.data.message)
					} else {
						switchErrorHandling(err.response.data)
					}
				}
			}
			doSignup()
		}
	}
	return (
		<div className='flex justify-center mt-10'>
			<div className="w-full max-w-xs">
				<form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={sendUserForm}>
					<h4 className="text-center text-2xl">
						{
							isLoginDisp ?
								<span>ログイン画面</span>
							:
								<span>ユーザー登録</span>
						}
					</h4>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
							UserName
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name" type="text" placeholder="xxx@test.com" value={name} onChange={(e) => {setName(e.target.value)}} />
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						{/* <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password" type="password" placeholder="******************" onChange={(e) => {setPassword(e.target.value)}} />
						<p className="text-red-500 text-xs italic">Please choose a password.</p> */}
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password" type="password" placeholder="******************" value={password} onChange={(e) => {setPassword(e.target.value)}} />
					</div>
					<div className="flex justify-center items-center">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							{
								isLoginDisp ? "Login" : "SignUp"
							}
						</button>
					</div>
					<div className="flex justify-center mt-5">
						{
							isLoginDisp ?
							// <FontAwesomeIcon icon={faUserPlus} onClick={() => {setIsLoginDisp(prev => !prev)}} className="cursor-pointer" />
							<FontAwesomeIcon icon={faUserPlus} onClick={() => {setIsLoginDist(prev => !prev)}} className="cursor-pointer" />
							 :
							//  <FontAwesomeIcon icon={faRightToBracket} onClick={() => {setIsLoginDisp(prev => !prev)}} className="cursor-pointer" />
							 <FontAwesomeIcon icon={faRightToBracket} onClick={() => {setIsLoginDist(prev => !prev)}} className="cursor-pointer" />
						}
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth