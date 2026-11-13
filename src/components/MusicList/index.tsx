import { useStore } from '@nanostores/react'
import { musicSpoilers } from '../../store/spoilerStore'

type MusicType = typeof import('../../utils/music.json')

const MusicList = ({ music }: { music: MusicType }) => {
	const show = useStore(musicSpoilers)
	
	return <>
		<button onClick={() => musicSpoilers.set(!show)}>{!show ? 'Show spoilers' : 'Hide spoilers'}</button>
		<div className="titles">
			{music.map(({ title, name, kanji, cover, position, hidden }) => (
				<div className="album" key={title}>
					<a className={`cover ${hidden && !show ? 'hidden' : ''}`} href={`/music/${title}`}>
						<picture style={{ viewTransitionName: `music-cover-${name}`, viewTransitionClass: 'cover-animation' }}>
							{cover.map((path, i) => {
								const isLast = cover.length === i + 1
								const type = path.split('.').pop()

								if (isLast) return <img key={i} src={path} alt="" loading="lazy" style={position ? {objectPosition: position} : {}} />
								
								return <source srcSet={path} type={`image/${type}`} key={i} />
							})}
						</picture>
					</a>
					<div className="name">
						<h3>{kanji ? kanji : name}</h3>
						{kanji && <span>{name}</span>}
					</div>
				</div>
			))}
		</div>
	</>
}

export default MusicList
