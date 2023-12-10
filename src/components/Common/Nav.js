import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../util/auth'
import {useNavigate} from 'react-router-dom';
import useError from '../../hooks/useError';

// const Nav = ({setDispStarNum}) => {
const Nav = ({stateStarNum}) => {
	const {logout} = useAuth();
	const navigate = useNavigate();
	const {switchErrorHandling} = useError();
	const [dispStarNum ,setDispStarNum] = stateStarNum
	const doLogout = async() => {
		try {
			await logout()
			navigate("/")
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}
	const clickSelectStarNum = (num) => {
		setDispStarNum(num)
	}
	return (
		<nav className="bg-yellow-600">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					{/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
							<span className="absolute -inset-0.5"></span>
							<span className="sr-only">Open main menu</span>
							<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
							<svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div> */}
					<div className="flex flex-1 items-stretch justify-between">
						<div className="flex space-x-4">
							{/* <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a> */}
							<button href="#" className={`${dispStarNum === 0 && "bg-gray-900"} text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium`} onClick={() => {clickSelectStarNum(0)}}>All</button>
							<button href="#" className={`${dispStarNum === 1 && "bg-gray-900"} text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium`} onClick={() => {clickSelectStarNum(1)}}>Star:1</button>
							<button href="#" className={`${dispStarNum === 2 && "bg-gray-900"} text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium`} onClick={() => {clickSelectStarNum(2)}}>Star:2</button>
							<button href="#" className={`${dispStarNum === 3 && "bg-gray-900"} text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium`} onClick={() => {clickSelectStarNum(3)}}>Star:3</button>
						</div>
						{/* <div className="flex flex-shrink-0 justify-end items-center"> */}
						<div className="flex flex-shrink-0 justify-end items-center">
							<FontAwesomeIcon icon={faRightFromBracket} className="cursor-pointer" onClick={doLogout} />
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Mobile menu, show/hide based on menu state. --> */}
		</nav>
	)
}

export default Nav