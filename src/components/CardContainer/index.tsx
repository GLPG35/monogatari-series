import { AnimatePresence } from 'motion/react'
import CardVisualizer from '../CardVisualizer'
import { useState } from 'react'

type Props = {
	cards: [string[], string[], "visible"|"hidden", boolean?][],
}

const CardContainer = ({ cards }: Props) => {
	const [viewSS, setViewSS] = useState<number>()
	const [showHidden, setShowHidden] = useState(false)
	
	return (
		<>
			<AnimatePresence>
				{viewSS !== undefined &&
					<CardVisualizer {...{viewSS, setViewSS, screenshots: cards.filter(x => !showHidden ? x[2] === 'visible' : x).map(x => [x[0], x[1]])}} />
				}
			</AnimatePresence>
			<div className="cards">
				<div className="cardsTitle">
					<h4>Cards</h4>
					{cards.some(x => x[2] === 'hidden') && <button onClick={() => setShowHidden(!showHidden)}>{!showHidden ? '(Show spoilers)' : '(Hide spoilers)'}</button>}
				</div>
				<div className="pictures">
					{cards.filter(x => !showHidden ? x[2] === 'visible' : x).map((picture, index) => (
						<div key={picture[0][0] + index} className='picture' onClick={() => setViewSS(index)}>
							<picture>
								{picture[0].map((path, i) => {
									const isLast = picture[0].length === i + 1
									const type = path.split('.').pop()

									if (isLast) return <img key={path} src={path} alt="" loading='lazy' />

									return <source key={path} srcSet={path} type={`image/${type}`} />
								})}
							</picture>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default CardContainer
