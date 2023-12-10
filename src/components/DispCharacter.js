import { useContext, useEffect, useState } from "react"
import Card from "./Common/Card"
import { StarStateContext } from "./Character"

const DispCharacter = ({dispStarNum, characterData}) =>  {
	const [dispCharacterData, setDispCharacterData] = useState(characterData)
	const {allStarData} = useContext(StarStateContext)

	useEffect(() => {
		if (dispStarNum === 0) {
			// 全て表示
			setDispCharacterData(characterData)
		} else {
			// フィルタリングして表示
			const filterAllStarData = allStarData.filter(s => s.evaluation === dispStarNum)
			const filterCharacterData = characterData.filter(c => 
				filterAllStarData.findIndex(data => 
					data.character_id === c._id) > -1)
			setDispCharacterData(filterCharacterData)
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispStarNum])

	return (
		<>
			{
				dispCharacterData.length
				? 
				dispCharacterData.map((data,index) => {
					return <Card key={index} data={data}/>
				})
				:
				<>
					<div></div>
					<div>表示するデータがありませんでした。</div>
					<div></div>
				</>
			}
		</>
	)
}

export default DispCharacter