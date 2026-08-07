import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { motion, AnimatePresence } from 'motion/react'

const Menu = ({ active }: { active: string }) => {
	const [menu, setMenu] = useState(false)
	
	return (
		<>
			<AnimatePresence>
				{menu &&
					<motion.div className="menu" initial={{ x: '-150%' }} animate={{ x: 0 }} exit={{ x: '-150%' }} transition={{ duration: 0.7, type: 'spring', bounce: -2 }}>
						<div className="menuWrapper">
							<button onClick={() => setMenu(false)}>
								<LuX></LuX>
								<span>Close</span>
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
									<li><a href="/stories" className={active.startsWith('/stories') ? "active" : ""}>Short Stories</a></li>
									<li><a href="/lns" className={active.startsWith('/lns') ? "active" : ""}>Light Novels</a></li>
									<li><a href="/" className={active == '/' || active.startsWith('/anime') ? "active" : ""}>Anime</a></li>
									<li><a href="/manga" className={active.startsWith('/manga') ? "active" : ""}>Manga</a></li>
									<li><a href="/music" className={active.startsWith('/music') ? "active" : ""}>Music</a></li>
									<li><a href="/downloads" className={active.startsWith('/downloads') ? "active" : ""}>Downloads</a></li>
								</ul>
							</nav>
						</div>
					</motion.div>
				}
			</AnimatePresence>
			<button className="menuIcon" onClick={() => setMenu(true)}>
				<LuMenu />
				<span>Menu</span>
			</button>
		</>
	)
}

export default Menu
