const PrevAndNextButton = ({isDispPrev, isDispNext, clickPrevBtn, clickNextBtn}) => {
	return (
		<div className="inline-flex my-7">
			{
				isDispPrev && 
				<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={clickPrevBtn}>
					Prev
				</button>
			}
			{
				isDispNext && 
				<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={clickNextBtn}>
					Next
				</button>
			}
		</div>
	)
}

export default PrevAndNextButton