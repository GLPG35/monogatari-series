import { useState } from "react"

const colors = [
	'--bg-purple',
    '--bg-green',
    '--bg-lilac',
    '--bg-salmon',
    '--bg-blue',
    '--bg-orange',
    '--bg-yellow',
    '--bg-red',
    '--bg-black',
    '--bg-white'
]

type Props = {
	cover: string[],
	coverAlt?: string[],
	hidden?: boolean,
	randomCover: number,
	randomColor: number
}

const MusicCover = ({ cover, coverAlt, hidden, randomCover, randomColor }: Props) => {
	const [alt, setAlt] = useState(false)
	
	return (
		<div className="coverWrapper">
			<div className={`cover ${coverAlt ? 'withAlt' : ''}`}>
				{hidden &&
					<>
						<div className='overlay' style={{ backgroundColor: `var(${colors[randomColor]})` }}></div>
						<picture className="spoiler">
							<source srcSet={`/wrinkled${randomCover}.avif`} type='image/avif' />
							<source srcSet={`/wrinkled${randomCover}.webp`} type='image/webp' />
							<img src={`/wrinkled${randomCover}.jpg`} alt="" />
						</picture>
					</>
				}
				<picture>
					{(coverAlt ? (alt ? coverAlt : cover) : cover).map((path, i) => {
						const isLast = cover.length === i + 1
						const type = path.split('.').pop()
	
						if (isLast) return <img src={path} alt="" key={i} className={hidden ? 'hidden' : ''} />
						
						return <source srcSet={path} type={`image/${type}`} key={i} />
					})}
				</picture>
			</div>
			<div className="sources">
				<p><a href={coverAlt ? (alt ? coverAlt[2] : cover[2]) : cover[2]} target="_blank">Full resolution</a></p>
				{coverAlt && <p><a onClick={() => setAlt(!alt)}>{!alt ? 'Original' : 'Special Edition'}</a></p>}
			</div>
		</div>
	)
}

export default MusicCover
