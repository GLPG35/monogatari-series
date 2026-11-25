import { useStore } from '@nanostores/react'
import { musicSpoilers } from '../../store/spoilerStore'
import type { languages } from '../../i18n/ui'
import { useTranslatedPath, useTranslations } from '../../i18n/utils'

type MusicType = typeof import('../../utils/music.json')

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

const MusicList = ({ music, currentLang }: { music: MusicType, currentLang: keyof typeof languages }) => {
	const show = useStore(musicSpoilers)
	const translatePath = useTranslatedPath(currentLang)
	const t = useTranslations(currentLang)
	
	return <>
		<button onClick={() => musicSpoilers.set(!show)}>{!show ? t('showSpoilers') : t('hideSpoilers')}</button>
		<div className="titles">
			{music.map(({ title, name, kanji, cover, position, hidden }) => {
				const randomCover = Math.floor(Math.random() * 3) + 1
				const randomColor = Math.floor(Math.random() * colors.length)
				
				return (
					<div className="album" key={title}>
						<a className='cover' href={translatePath(`/music/${title}`)}>
							{hidden && !show && <div className='overlay' style={{ backgroundColor: `var(${colors[randomColor]})` }}></div>}
							<picture>
								{hidden && !show ?
									<>
										<source srcSet={`/wrinkled${randomCover}.avif`} type='image/avif' />
										<source srcSet={`/wrinkled${randomCover}.webp`} type='image/webp' />
										<img src={`/wrinkled${randomCover}.jpg`} alt="" style={{ viewTransitionName: `spoiler-music-cover-${title}` }} />
									</>
									: cover.map((path, i) => {
										const isLast = cover.length === i + 1
										const type = path.split('.').pop()
	
										if (isLast) return <img key={i} src={path} alt="" loading="lazy" style={{ viewTransitionName: `music-cover-${title}`, objectPosition: position ? position : 'none' }} />
									
										return <source srcSet={path} type={`image/${type}`} key={i} />
									})}
							</picture>
						</a>
						<div className="name">
							<h3>{kanji ? kanji : name}</h3>
							{kanji && <span>{name}</span>}
						</div>
					</div>
				)
			})}
		</div>
	</>
}

export default MusicList
