import { useStore } from '@nanostores/react'
import { musicSpoilers } from '../../store/spoilerStore'

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

const MusicList = ({ music }: { music: MusicType }) => {
	const show = useStore(musicSpoilers)
	
	return <>
		<button onClick={() => musicSpoilers.set(!show)}>{!show ? 'Show spoilers' : 'Hide spoilers'}</button>
		<div className="titles">
			{music.map(({ title, name, kanji, cover, position, hidden }) => {
				const randomCover = Math.floor(Math.random() * 3) + 1
				const randomColor = Math.floor(Math.random() * colors.length)
				
				return (
					<div className="album" key={title}>
						<a className='cover' href={`/music/${title}`}>
							{hidden && !show && <div className='overlay' style={{ backgroundColor: `var(${colors[randomColor]})` }}></div>}
							<picture style={{ viewTransitionName: `music-cover-${name}`, viewTransitionClass: 'cover-animation' }}>
								{hidden && !show ?
									<>
										<source srcSet={`/wrinkled${randomCover}.avif`} type='image/avif' />
										<source srcSet={`/wrinkled${randomCover}.webp`} type='image/webp' />
										<img src={`/wrinkled${randomCover}.jpg`} alt="" />
									</>
									: cover.map((path, i) => {
										const isLast = cover.length === i + 1
										const type = path.split('.').pop()
	
										if (isLast) return <img key={i} src={path} alt="" loading="lazy" style={position ? { objectPosition: position } : {}} />
									
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
