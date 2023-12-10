import { createContext, useEffect, useState } from "react"
import { getCharacter } from "../util/util"
import PrevAndNextButton from "./Common/PrevAndNextButton";
import Load from "./Common/Load";
import Nav from "./Common/Nav";
import axios from "axios";
import useError from "../hooks/useError";
import DispCharacter from "./DispCharacter";
export const ClickStarFuncContext = createContext()
export const StarStateContext = createContext()

const Character = () => {
	const BASE_URL = "https://api.disneyapi.dev"
	const allCharacterURL = BASE_URL + "/character"

	const {switchErrorHandling} = useError()
	const [characterData, setCharacterData] = useState([])
	const [prevURL, setPrevURL] = useState("")
	const [nextURL, setNextURL] = useState("")
	const [isLoad, setIsLoad] = useState(true)
	const [allStarData, setAllStarData] = useState([])
	const [dispStarNum ,setDispStarNum] = useState(0) // 0:ALL、1~3：Starの数でfilter

	const clickPrevBtn = async () => {
		setIsLoad(true);
		const getCharacterResponse = await getCharacter(prevURL);
		setPrevURL(getCharacterResponse.info.previousPage);
		setNextURL(getCharacterResponse.info.nextPage);
		setCharacterData(getCharacterResponse.data);
		setIsLoad(false);
	}

	const clickNextBtn = async () => {
		setIsLoad(true);
		const getCharacterResponse = await getCharacter(nextURL);
		setPrevURL(getCharacterResponse.info.previousPage);
		setNextURL(getCharacterResponse.info.nextPage);
		setCharacterData(getCharacterResponse.data);
		setIsLoad(false);
	}

	const getAllStarByUser = async() => {
		try {
			const {data} = await axios.get(
				`${process.env.REACT_APP_API_URL}/favorites`,
				// {withCredentials:true,}
			)
			setAllStarData(data)
		} catch(err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}

	const registerStar = async(character_id, evaluation) => {
		try {
			debugger;
			const {data} = await axios.post(
				`${process.env.REACT_APP_API_URL}/favorites`,
				{
					character_id: character_id,
					evaluation: evaluation,
				},
				// {withCredentials: true,}
			)
			return data
		} catch (err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}

	const updateStar = async(character_id, evaluation) => {
		try {
			debugger;
			const {data} = await axios.put(
				`${process.env.REACT_APP_API_URL}/favorites/${character_id}`,
				{
					evaluation: evaluation,
				},
				// {withCredentials: true,}
			)
			return data
		} catch (err) {
			if (err.response.data.message) {
				// csrf,jwtミドルウェア系のエラーはmessageに入る
				switchErrorHandling(err.response.data.message)
			} else {
				switchErrorHandling(err.response.data)
			}
		}
	}

	useEffect(() => {
		const initFunc = async() => {
			debugger
			const getCharacterResponse = await getCharacter(allCharacterURL);
			setPrevURL(getCharacterResponse.info.previousPage);
			setNextURL(getCharacterResponse.info.nextPage);
			setCharacterData(getCharacterResponse.data);
			console.log(getCharacterResponse.data);
			await getAllStarByUser();
			setIsLoad(false);
		};
		initFunc();
		// ESLintでwarningが出る。（依存関係を解決しろと）
		// ただ、今回のallCharacterURL(BASE_URL)は定数なので変更されることはない。
		// よって、以下のコメントでLinterを無効化する。
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-blue-100">
			<StarStateContext.Provider value={{allStarData, setAllStarData ,dispStarNum}}>
				<Nav stateStarNum={[dispStarNum ,setDispStarNum]}/>
				{
					isLoad 
					?
					<div className="flex justify-center my-4">
						<Load /> 
					</div>
					:
					<div>
						<div className="flex justify-center my-4">
							<div className="grid gap-4 sm:grid-cols-3">
									<ClickStarFuncContext.Provider value={{registerStar, updateStar}}>
										<DispCharacter dispStarNum={dispStarNum} characterData={characterData} />
									</ClickStarFuncContext.Provider>
							</div>
						</div>
						<div className="flex justify-center">
							<PrevAndNextButton isDispPrev={prevURL != null} isDispNext={nextURL != null} clickPrevBtn={clickPrevBtn} clickNextBtn={clickNextBtn} />
						</div>
					</div>
				}
			</StarStateContext.Provider>
		</div>
	)
}

export default Character