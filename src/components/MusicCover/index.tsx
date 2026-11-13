import { useState } from "react"

type Props = {
	cover: string[],
	coverAlt?: string[],
	hidden?: boolean
}

const MusicCover = ({ cover, coverAlt, hidden }: Props) => {
	const [alt, setAlt] = useState(false)
	
	return (
		<div className={`cover ${coverAlt ? 'withAlt' : ''}`}>
			<p><a href={coverAlt ? (alt ? coverAlt[2] : cover[2]) : cover[2]} target="_blank">Full resolution</a></p>
			{coverAlt && <p><a onClick={() => setAlt(!alt)}>{!alt ? 'Original' : 'Special Edition'}</a></p>}
			<picture>
				{(coverAlt ? (alt ? coverAlt : cover) : cover).map((path, i) => {
					const isLast = cover.length === i + 1
					const type = path.split('.').pop()

					if (isLast) return <img src={path} alt="" key={i} className={hidden ? 'hidden' : ''} />
					
					return <source srcSet={path} type={`image/${type}`} key={i} />
				})}
			</picture>
		</div>
	)
}

export default MusicCover
