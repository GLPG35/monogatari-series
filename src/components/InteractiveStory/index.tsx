import { useState } from 'react'
import PDFEmbed from '../PDFEmbed'
import { motion, AnimatePresence } from 'motion/react'

const parseLang = {
	'ENG': 'English',
	'SPA': 'Spanish',
	'PT-BR': 'Portuguese (Brazil)',
	'JPN': 'Japanese'
}

type Lang = keyof typeof parseLang

const InteractiveStory = ({ stories }: { stories: { name: string, when: string, pictures: string[], files: { language: string, file: string, fileName: string }[] }[] }) => {
	const [selectedStory, setSelectedStory] = useState<{ file: string, fileName: string }>()
	const [modal, setModal] = useState<{ language: string, file: string, fileName: string }[]>()
	
	const handleStory = (files: { language: string, file: string, fileName: string }[], language: Lang) => () => {
		const findStory = files.find(x => x.language == language)

		if (!findStory) return
		setSelectedStory(() => ({ file: findStory.file, fileName: findStory.fileName }))
		setModal(undefined)
	}
	
	return (
		<div className='stories'>
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
									{modal[0].fileName.split('.').shift()}
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
								{modal.map(({ language }) => (
									<button onClick={handleStory(modal, language as Lang)}>{parseLang[language as Lang]}</button>
								))}
							</motion.div>
						</motion.div>
					</div>
				}
			</AnimatePresence>
			{selectedStory && <PDFEmbed url={selectedStory.file} fileName={selectedStory.fileName} setView={setSelectedStory} />}
			{stories.map(({ name, when, pictures, files }) => (
				<div className="story" key={files[0].fileName}>
					<div className="cover" onClick={() => setModal(files)}>
						<picture>
							{pictures.map((path, i) => {
								const isLast = pictures.length === i + 1
								const type = path.split('.').pop()

								if (isLast) return <img src={path} key={path} alt="" loading="lazy" />
								
								return <source srcSet={path} key={path} type={`image/${type}`} />
							})}
						</picture>
					</div>
					<div className="when">
						<div className="whenWrapper">
							<div className="texture">
								<picture>
									<source srcSet="/23.avif" type="image/avif" />
									<source srcSet="/23.webp" type="image/webp" />
									<img src='/23.png' alt="" loading="lazy" />
								</picture>
								<div className="duplicate" style={{ "--current-img": "image-set(url('/23.avif') type('image/avif'), url('/23.webp') type('image/webp'), url('/23.png') type('image/png'));" } as React.CSSProperties}>
								</div>
							</div>
							<span>{when}</span>
						</div>
					</div>
					<div className="name">
						{name}
					</div>
				</div>
			))}
		</div>
	)
}

export default InteractiveStory
