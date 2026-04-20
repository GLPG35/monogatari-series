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
									<picture className='duplicate'>
										<source srcSet="/48.avif" type='image/avif' />
										<source srcSet="/48.webp" type='image/webp' />
										<img src="/48.png" alt="" />
									</picture>
								</div>
							</div>	
							<nav>
								<ul>
									<li><a href="/stories" className={active.includes('/stories') ? "active" : ""}>Short Stories</a></li>
									<li><a href="/lns" className={active.includes('/lns') ? "active" : ""}>Light Novels</a></li>
									<li><a href="/" className={active == '/' ? "active" : ""}>Home</a></li>
									<li><a href="/anime" className={active.includes('/anime') ? "active" : ""}>Anime</a></li>
									<li><a href="/manga" className={active.includes('/manga') ? "active" : ""}>Manga</a></li>
									<li><a href="/music" className={active == '/music' ? "active" : ""}>Music</a></li>
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