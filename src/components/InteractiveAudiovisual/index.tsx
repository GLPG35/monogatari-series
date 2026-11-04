import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const parseLang = {
	'ENG': 'English',
	'SPA': 'Spanish',
	'PT-BR': 'Portuguese (Brazil)',
	'JPN': 'Japanese'
}

type Lang = keyof typeof parseLang

const InteractiveAudiovisual = ({ audiovisual }: { audiovisual: { name: string, date: string, when: string, pictures: string[], links: { language: string, url: string, incomplete?: boolean }[] }[] }) => {
	const [modal, setModal] = useState<{ name: string, links: { language: string, url: string, incomplete?: boolean }[] }>()
	
	return (
		<div className="audiovisual">
			<AnimatePresence>
				{modal && 
					<div className="modalWrapper" onClick={() => setModal(undefined)}>
						<motion.div initial={{ translateY: '120%' }} animate={{ translateY: 0 }} exit={{ translateY: '120%' }} transition={{ duration: 0.7, type: 'spring', bounce: -2 }} className="modalContainer">
							<motion.div className="labelBackgroundWrapper" initial={{ translateX: '-110%' }} animate={{ translateX: 0 }} transition={{ duration: 0.7, type: 'spring', bounce: -2, delay: 0.2 }}>
								<div className="label">
									<div className="labelBackground">
										<picture>
											<source srcSet='/28.avif' type='image/avif' />
											<source srcSet='/28.webp' type='image/webp' />
											<img src="/28.png" alt="" />
										</picture>
									</div>
									Language
								</div>
							</motion.div>
							<motion.div className="labelBackgroundWrapper right" initial={{ translateX: '110%' }} animate={{ translateX: 0 }} transition={{ duration: 0.7, type: 'spring', bounce: -2, delay: 0.4 }}>
								<div className="label">
									<div className="labelBackground">
										<picture>
											<source srcSet='/28.avif' type='image/avif' />
											<source srcSet='/28.webp' type='image/webp' />
											<img src="/28.png" alt="" />
										</picture>
									</div>
									{modal.name}
								</div>
							</motion.div>
							<div className="modalBackground">
								<div className="modalBackgroundWrapper">
									<picture>
										<source srcSet="/104.avif" type='image/avif' />
										<source srcSet="/104.webp" type='image/webp' />
										<img src="/104.png" alt="" />
									</picture>
									<div className="duplicate" style={{ "--current-img": "image-set(url('/104.avif') type('image/avif'), url('/104.webp') type('image/webp'), url('/104.png') type('image/png'))" } as React.CSSProperties}>
									</div>
								</div>
							</div>
							<motion.div className="modal" onClick={e => e.stopPropagation()}>
								{modal.links.map(({ language, url, incomplete }) => (
									<a key={language} href={url} target='_blank'>{parseLang[language as Lang]}{incomplete && ' [Incomplete]'}</a>
								))}
							</motion.div>
						</motion.div>
					</div>
				}
			</AnimatePresence>
			{audiovisual.map(({ name, date, when, pictures, links }) => {
				const isDate = date.includes('-')
				const [fullYear, month, day] = date.split('-')
				const parseDate = isDate ? Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(+fullYear, +month - 1, +day)) : date
				
				return <div className="media" onClick={() => setModal({ name, links })} key={name}>
					<div className="cover">
						<picture>
							{pictures.map((path, i) => {
								const isLast = pictures.length === i + 1
								const type = path.split('.').pop()

								if (isLast) return <img key={i} src={path} alt="" loading="lazy" />
								
								return <source key={i} srcSet={path} type={`image/${type}`} />
							})}
						</picture>
					</div>
					<div className="when">
						<div className="whenWrapper">
							<div className="texture">
								<picture>
									<source srcSet="/42.avif" type="image/avif" />
									<source srcSet="/42.webp" type="image/webp" />
									<img src='/42.png' alt="" loading="lazy" />
								</picture>
								<div className="duplicate" style={{ "--current-img": "image-set(url('/42.avif') type('image/avif'), url('/42.webp') type('image/webp'), url('/42.png') type('image/png'));" } as React.CSSProperties}>
								</div>
							</div>
							<span>{when}</span>
						</div>
					</div>
					<div className="mediaTitle">
						<h3 className="name">{name}</h3>
						<div className="date">{parseDate}</div>
					</div>
				</div>
			})}
		</div>
	)
}

export default InteractiveAudiovisual
