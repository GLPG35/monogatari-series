import { useState } from 'react'
import PDFEmbed from '../PDFEmbed'
import { AnimatePresence, motion } from 'motion/react'
import type { languages } from '../../i18n/ui'
import { useTranslations } from '../../i18n/utils'

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

const InteractiveMiniStory = ({ shortStories, currentLang }: { shortStories: { name: string, when: string, pictures: string[], files: { language: string, file: string, fileName: string }[] }[], currentLang: keyof typeof languages }) => {
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
		<>
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
									<picture className='duplicate'>
										<source srcSet="/104.avif" type='image/avif' />
										<source srcSet="/104.webp" type='image/webp' />
										<img src="/104.png" alt="" />
									</picture>
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
			<div className="covers">
				{shortStories.map(({ name, when, pictures, files }) => (
					<div className="relation" key={files[0].fileName} onClick={() => setModal({ name, files })}>
						<div className="when">
							<div className="whenWrapper">
								<div className="texture">
									<picture>
										<source srcSet="/12.avif" type="image/avif" />
										<source srcSet="/12.webp" type="image/webp" />
										<img src="/12.png" alt="" />
									</picture>
									<picture className="duplicate">
										<source srcSet="/12.avif" type="image/avif" />
										<source srcSet="/12.webp" type="image/webp" />
										<img src="/12.png" alt="" />
									</picture>
								</div>
								<span>{when}</span>
							</div>
						</div>
						<div className="cover">
							<picture>
								{pictures.map((path, i) => {
									const isLast = pictures.length === i + 1
									const type = path.split('.').pop()

									if (isLast) return <img src={path} key={path} alt="" />
									
									return <source srcSet={path} key={path} type={`image/${type}`} />
								})}
							</picture>
						</div>		
					</div>
				))}
			</div>
		</>
	)
}

export default InteractiveMiniStory
