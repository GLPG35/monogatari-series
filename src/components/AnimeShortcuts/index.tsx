import { useState, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { LuChevronDown } from "react-icons/lu"
import { useTranslatedPath, useTranslations } from "../../i18n/utils"
import type { languages } from "../../i18n/ui"

const AnimeShortcuts = ({ currentLang, path }: { currentLang: keyof typeof languages, path: string }) => {
	const [show, setShow] = useState(false)
	const t = useTranslations(currentLang)
	const translatePath = useTranslatedPath(currentLang)
	
	return (
		<motion.div className="shortcuts" animate={{ y: !show ? 0 : '85%' }} transition={{ duration: 0.7, type: 'spring', bounce: 0 }} drag='y' dragConstraints={{ top: 0, bottom: !show ? 0 : 470 }} dragElastic={0.2} onDragEnd={(_, info) => {
			if (!show && (info.offset.y > 50 || info.velocity.y > 300)) {
				setShow(true)
			}

			if (show && (info.offset.y < -50 || info.velocity.y < -300)) {
				setShow(false)
			}
		}}>
			<div className="wrapper">
				<div className="textureWrapper">
					<div className="texture">
						<picture>
							<source srcSet="/2-big.avif" type="image/avif" />
							<source srcSet="/2-big.webp" type="image/webp" />
							<img src="/2-big.png" alt="" fetchPriority="high" />
						</picture>
						<div className="duplicate" style={{ "--current-img": "image-set(url('/2-big.avif') type('image/avif'), url('/2-big.webp') type('image/webp'), url('/2-big.png') type('image/png'))" } as React.CSSProperties}>
						</div>
					</div>
				</div>
				<ul>
					<li><a onClick={() => setShow(false)} href={translatePath("#watch-order")}>{t('anime.watchOrder')}</a></li>
					<li><a onClick={() => setShow(false)} href={translatePath("#essential-stories")}>{t('anime.essentialShortStories')}</a></li>
					<li><a onClick={() => setShow(false)} href={translatePath("#essential-audiovisual")}>{t('anime.audiovisualContent')}</a></li>
					<li><a onClick={() => setShow(false)} href={translatePath("#books")}>{t('anime.miscellaneousBooks')}</a></li>
				</ul>
				<motion.div className="drag" onTap={() => setShow(!show)} animate={{ rotate: !show ? 0 : 180 }}>
					<LuChevronDown />
				</motion.div>
			</div>
		</motion.div>
	)
}

export default AnimeShortcuts
