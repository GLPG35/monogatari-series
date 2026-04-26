import { useState } from 'react'
import PDFEmbed from '../PDFEmbed'

const InteractiveStory = ({ stories }: { stories: { name: string, when: string, pictures: string[], file: string }[] }) => {
	const [selectedStory, setSelectedStory] = useState<string>()
	
	return (
		<div className='stories'>
			{selectedStory && <PDFEmbed url={selectedStory} setView={setSelectedStory} />}
			{stories.map(({ name, when, pictures, file }) => (
				<div className="story" key={file}>
					<div className="cover" onClick={() => setSelectedStory(file)}>
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
								<picture className="duplicate">
									<source srcSet="/23.avif" type="image/avif" />
									<source srcSet="/23.webp" type="image/webp" />
									<img src='/23.png' alt="" loading="lazy" />
								</picture>
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