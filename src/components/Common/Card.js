import { useContext, useEffect, useState } from "react";
import StarRating from "../Star/StarRating"
import { StarStateContext } from "../Character";

const Card = ({data}) => {
	const [selectStar, setSelectStar] = useState(0);
	const {allStarData, dispStarNum} = useContext(StarStateContext)

	useEffect(() => {
		if (dispStarNum === 0) {
			allStarData.forEach(el => {
				if (el.character_id === data._id) {
					setSelectStar(el.evaluation)
				}
			});
		} else {
			allStarData.filter(s => {
				return s.evaluation === dispStarNum
			}).forEach(el => {
				if (el.character_id === data._id) {
					setSelectStar(el.evaluation)
				}
			});
		}
	}, [allStarData, data, dispStarNum])

	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<div className="flex justify-center">
					<img className="rounded-t-lg" src={data.imageUrl} alt={data.name} />
				</div>
				<div className="flex justify-center my-5">
					<StarRating starState={{selectStar, setSelectStar}} characterId={data._id} />
				</div>
				<div className="p-5">
						<h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h4>
						<div className="mb-4 text-white">
							<div className="text-lg">Movies</div>
							<ol className="text-md text-base list-decimal ml-4">
								{
									data.films.length ? 
										data.films.map((film,i) => (<li key={i}>{film}</li>))
									:
									"なし"
								}
							</ol>
						</div>
						<a href={data.sourceUrl} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" target="_blank" rel="noopener noreferrer">
								Read more
								<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
								</svg>
						</a>
				</div>
		</div>
	)
}

export default Card