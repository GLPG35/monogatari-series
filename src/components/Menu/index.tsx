import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { motion, AnimatePresence } from 'motion/react'
import { languages } from '../../i18n/ui'
import { trimLocation, useTranslatedPath, useTranslations } from '../../i18n/utils'

const Menu = ({ active, currentLang }: { active: string, currentLang: keyof typeof languages }) => {
	const [menu, setMenu] = useState(false)
	const t = useTranslations(currentLang)
	const translatePath = useTranslatedPath(currentLang)
	
	return (
		<>
			<AnimatePresence>
				{menu &&
					<motion.div className="menu" initial={{ x: '-150%' }} animate={{ x: 0 }} exit={{ x: '-150%' }} transition={{ duration: 0.7, type: 'spring', bounce: -2 }}>
						<div className="menuWrapper">
							<button onClick={() => setMenu(false)}>
								<LuX></LuX>
								<span>{t('nav.close')}</span>
							</button>
							<div className="menuBackground">
								<div className="backgroundWrapper">
									<picture>
										<source srcSet="/48.avif" type='image/avif' />
										<source srcSet="/48.webp" type='image/webp' />
										<img src="/48.png" alt="" />
									</picture>
									<div className="duplicate" style={{ '--current-img': "image-set(url('/48.avif') type('image/avif'), url('/48.webp') type('image/webp'), url('/48.png') type('image/png'))" } as React.CSSProperties}>
									</div>
								</div>
							</div>	
							<nav>
								<ul>
									<li><a href={translatePath("/stories")} className={trimLocation(active, currentLang).startsWith('/stories') ? "active" : ""}>{t('nav.shortStories')}</a></li>
									<li><a href={translatePath("/lns")} className={trimLocation(active, currentLang).startsWith('/lns') ? "active" : ""}>{t('nav.lightNovels')}</a></li>
									<li><a href={translatePath("/")} className={trimLocation(active, currentLang) == '/' || trimLocation(active, currentLang).startsWith('/anime') ? "active" : ""}>Anime</a></li>
									<li><a href={translatePath("/manga")} className={trimLocation(active, currentLang).startsWith('/manga') ? "active" : ""}>Manga</a></li>
									<li><a href={translatePath("/music")} className={trimLocation(active, currentLang).startsWith('/music') ? "active" : ""}>{t('nav.music')}</a></li>
									<li><a href={translatePath("/downloads")} className={trimLocation(active, currentLang).startsWith('/downloads') ? "active" : ""}>{t('nav.downloads')}</a></li>
								</ul>
							</nav>
						</div>
					</motion.div>
				}
			</AnimatePresence>
			<button className="menuIcon" onClick={() => setMenu(true)}>
				<LuMenu />
				<span>{t('nav.menu')}</span>
			</button>
		</>
	)
}

export default Menu
