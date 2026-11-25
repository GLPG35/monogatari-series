import { useState } from "react"
import PDFEmbed from "../PDFEmbed"
import { useTranslations } from "../../i18n/utils"
import type { languages } from "../../i18n/ui"

const colors = [
	'--bg-purple',
    '--bg-green',
    '--bg-lilac',
    '--bg-salmon',
    '--bg-blue',
    '--bg-orange',
    '--bg-yellow',
    '--bg-red',
    '--bg-black',
    '--bg-white'
]

type Props = {
	books: {
		name: string,
		when: string,
		cover: string[],
		date: string,
		hidden?: boolean,
		path?: string
	}[],
	currentLang: keyof typeof languages
}

const InteractiveBook = ({ books, currentLang }: Props) => {
	const [selectedBook, setSelectedBook] = useState<{ file: string, fileName: string }>()
	const [show, setShow] = useState(false)
	const t = useTranslations(currentLang)

	const selectBook = (path?: string) => {
		if (!path) return
		const fileName = path.split('/').pop() as string

		setSelectedBook({ file: path, fileName })
	} 
	
	return (
		<>
			<button className="showSpoilers" onClick={() => setShow(!show)}>{!show ? t('showSpoilers') : t('hideSpoilers')}</button>
			<div className="books">
				{selectedBook && <PDFEmbed url={selectedBook.file} fileName={selectedBook.fileName} setView={setSelectedBook} />}
				{books.map(({ name, when, cover, date, hidden, path }) => {
					const isDate = date.includes('-')
					const [fullYear, month, day] = date.split('-')
					const parseDate = isDate ? Intl.DateTimeFormat(currentLang, { dateStyle: 'long' }).format(new Date(+fullYear, +month - 1, +day)) : date
					const randomCover = Math.floor(Math.random() * 3) + 1
					const randomColor = Math.floor(Math.random() * colors.length)
					
					return <div className="book" onClick={() => selectBook(path)} key={name}>
						<div className="cover">
							{hidden && !show && <div className='overlay' style={{ backgroundColor: `var(${colors[randomColor]})` }}></div>}
							<picture>
								{hidden && !show ?
									<>
										<source srcSet={`/wrinkled${randomCover}.avif`} type='image/avif' />
										<source srcSet={`/wrinkled${randomCover}.webp`} type='image/webp' />
										<img src={`/wrinkled${randomCover}.jpg`} alt="" />
									</>
								: cover.map((path, i) => {
									const isLast = cover.length === i + 1
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
										<source srcSet="/74.avif" type="image/avif" />
										<source srcSet="/74.webp" type="image/webp" />
										<img src='/74.png' alt="" loading="lazy" />
									</picture>
									<div className="duplicate" style={{ "--current-img": "image-set(url('/74.avif') type('image/avif'), url('/74.webp') type('image/webp'), url('/74.png') type('image/png'));" } as React.CSSProperties}>
									</div>
								</div>
								<span>{when}</span>
							</div>
						</div>
						{!path && <div className="notAvailable">
							<div className="wrapper">
								<div className="texture">
									<picture>
										<source srcSet="/38.avif" type="image/avif" />
										<source srcSet="/38.webp" type="image/webp" />
										<img src="/38.png" alt="" loading="lazy" />
									</picture>
									<div className="duplicate" style={{ "--current-img": "image-set(url('/38.avif') type('image/avif'), url('/38.webp') type('image/webp'), url('/38.png') type('image/png'));" } as React.CSSProperties}></div>
								</div>
								<span>No Scans</span>
							</div>
						</div>}
						<div className="mediaTitle">
							<h3 className="name">{name}</h3>
							<div className="date">{parseDate}</div>
						</div>
					</div>
				})}
			</div>
		</>
	)
}

export default InteractiveBook
