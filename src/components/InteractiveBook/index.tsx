import { useState } from "react"
import PDFEmbed from "../PDFEmbed"

const InteractiveBook = ({ books }: { books: { name: string, when: string, cover: string[], path: string }[] }) => {
	const [selectedBook, setSelectedBook] = useState<{ file: string, fileName: string }>()

	const selectBook = (path: string) => {
		const fileName = path.split('/').pop() as string

		setSelectedBook({ file: path, fileName })
	} 
	
	return (
		<div className="books">
			{selectedBook && <PDFEmbed url={selectedBook.file} fileName={selectedBook.fileName} setView={setSelectedBook} />}
			{books.map(({ name, when, cover, path }) => {
				return <div className="book" onClick={() => selectBook(path)} key={name}>
					<div className="cover">
						<picture>
							{cover.map((path, i) => {
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
					<div className="mediaTitle">
						<h3 className="name">{name}</h3>
					</div>
				</div>
			})}
		</div>
	)
}

export default InteractiveBook
