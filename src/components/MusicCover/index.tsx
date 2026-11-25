import { useState } from "react"
import type { languages } from "../../i18n/ui"
import { useTranslations } from "../../i18n/utils"

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
	title: string,
	cover: string[],
	coverAlt?: string[],
	hidden?: boolean,
	randomCover: number,
	randomColor: number,
	currentLang: keyof typeof languages
}

const MusicCover = ({ title, cover, coverAlt, hidden, randomCover, randomColor, currentLang }: Props) => {
	const [alt, setAlt] = useState(false)
	const t = useTranslations(currentLang)
	
	return (
		<div className="coverWrapper">
			<div className={`cover ${coverAlt ? 'withAlt' : ''}`}>
				{hidden &&
					<>
						<div className='overlay' style={{ backgroundColor: `var(${colors[randomColor]})` }}></div>
						<picture className="spoiler">
							<source srcSet={`/wrinkled${randomCover}.avif`} type='image/avif' />
							<source srcSet={`/wrinkled${randomCover}.webp`} type='image/webp' />
							<img src={`/wrinkled${randomCover}.jpg`} alt="" style={{ viewTransitionName: `spoiler-music-cover-${title}` }} />
						</picture>
					</>
				}
				<picture>
					{(coverAlt ? (alt ? coverAlt : cover) : cover).map((path, i) => {
						const isLast = cover.length === i + 1
						const type = path.split('.').pop()
	
						if (isLast) return <img src={path} alt="" key={i} className={hidden ? 'hidden' : ''} style={{ viewTransitionName: `music-cover-${title}` }} />
						
						return <source srcSet={path} type={`image/${type}`} key={i} />
					})}
				</picture>
			</div>
			<div className="sources">
				<p><a href={coverAlt ? (alt ? coverAlt[2] : cover[2]) : cover[2]} target="_blank">{t('fullResolution')}</a></p>
				{coverAlt && <p><a onClick={() => setAlt(!alt)}>{!alt ? 'Original' : t('specialEdition')}</a></p>}
			</div>
		</div>
	)
}

export default MusicCover
