import { AnimatePresence } from 'motion/react'
import GalleryVisualizer from '../GalleryVisualizer'
import { useState } from 'react'
import type { languages } from '../../i18n/ui'
import { useTranslations } from '../../i18n/utils'

type Props = {
	gallery: [string[], "visible" | "hidden", boolean?][],
	currentLang: keyof typeof languages
}

const GalleryContainer = ({ gallery, currentLang }: Props) => {
	const t = useTranslations(currentLang)
	const [viewSS, setViewSS] = useState<number>()
	const [showHidden, setShowHidden] = useState(false)
	
	return (
		<>
			<AnimatePresence>
				{viewSS !== undefined &&
					<GalleryVisualizer {...{viewSS, setViewSS, screenshots: gallery.filter(x => !showHidden ? x[1] === 'visible' : x).map(x => x[0]), currentLang}} />
				}
			</AnimatePresence>
			<div className="gallery">
				<div className="galleryTitle">
					<h4>{t('gallery')}</h4>
					{gallery.some(x => x[1] === 'hidden') && <button onClick={() => setShowHidden(!showHidden)}>{!showHidden ? `(${t('showSpoilers')})` : `(${t('hideSpoilers')})`}</button>}
				</div>
				<div className="pictures">
					{gallery.filter(x => !showHidden ? x[1] === 'visible' : x).map((picture, index) => (
						<div key={picture[0][0] + index} className={`picture ${picture[2] ? 'wide' : ''}`} onClick={() => setViewSS(index)}>
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

export default GalleryContainer
