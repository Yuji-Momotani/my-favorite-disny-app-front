import { useContext, useState } from "react";
import Star from "./Star"
import {ClickStarFuncContext, StarStateContext} from '../Character';

const StarRating = ({starState, characterId}) => {
	const starNum = [...Array(3)].map((_,i) => ++i);
	const {registerStar, updateStar} = useContext(ClickStarFuncContext);
	const {setAllStarData} = useContext(StarStateContext);
	const {selectStar, setSelectStar} = starState
	const [isRegistConnect, setIsRegistConnect] = useState(false)

	const clickStar = async(evaluation) => {
		if (isRegistConnect) {
			return
		}
		setIsRegistConnect(true)
		let registData = {}
		if (selectStar > 0) {
			// 元の星の数が1以上なら更新
			registData = await updateStar(characterId, evaluation)
			setAllStarData(prev => {
				const newData = prev.map(p => {
					if (p.character_id === registData.character_id) {
						p.evaluation = registData.evaluation
					}
					return p
				})
				return newData
			})
			alert("Complete Update")
		} else {
			// 元の星の数が0なら更新
			registData = await registerStar(characterId, evaluation)
			setAllStarData(prev => [...prev, registData])
			alert("Complete Regist")
		}
		setSelectStar(registData.evaluation)
		setIsRegistConnect(false)
	}

	return (
		<div className="flex justify-center">
			{
				starNum.map(s => {
					return (
						<Star key={s} selected={selectStar >= s} onSelect={() => {clickStar(s)}} />
					)
				})
			}
		</div>
	)
}

export default StarRating