import { useState } from 'react'
import PDFEmbed from '../PDFEmbed'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslations } from '../../i18n/utils'
import type { languages } from '../../i18n/ui'

const parseLang = {
	'ENG': {
		en: 'English',
		es: 'Inglés',
		pt: 'Inglês'
	},
	'SPA': {
		en: 'Spanish',
		es: 'Español',
		pt: 'Espanhol'
	},
	'PT-BR': {
		en: 'Portuguese (Brazil)',
		es: 'Portugués (Brasil)',
		pt: 'Portugês (Brasil)'
	},
	'JPN': {
		en: 'Japanese',
		es: 'Japonés',
		pt: 'Japonês'
	}
}

type Lang = keyof typeof parseLang

const InteractiveStory = ({ stories, currentLang }: { stories: { name: string, when: string, pictures: string[], files: { language: string, file: string, fileName: string }[] }[], currentLang: keyof typeof languages }) => {
	const t = useTranslations(currentLang)
	const [selectedStory, setSelectedStory] = useState<{ file: string, fileName: string }>()
	const [modal, setModal] = useState<{ name: string, files: { language: string, file: string, fileName: string }[] }>()
	
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
									{t('language')}
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
								{modal.files.map(({ language }) => (
									<button onClick={handleStory(modal.files, language as Lang)}>{parseLang[language as Lang][currentLang]}</button>
								))}
							</motion.div>
						</motion.div>
					</div>
				}
			</AnimatePresence>
			{selectedStory && <PDFEmbed url={selectedStory.file} fileName={selectedStory.fileName} setView={setSelectedStory} />}
			{stories.map(({ name, when, pictures, files }) => (
				<div className="story" key={files[0].fileName}>
					<div className="cover" onClick={() => setModal({ name, files })}>
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
