import { useState } from 'react'
import PDFEmbed from '../PDFEmbed'

const InteractiveMiniStory = ({ shortStories }: { shortStories: { when: string, pictures: string[], file: string }[] }) => {
	const [selectedStory, setSelectedStory] = useState<string>()
	
	return (
		<>
			{selectedStory && <PDFEmbed url={selectedStory} setView={setSelectedStory} />}
			<div className="covers">
				{shortStories.map(({ when, pictures, file }) => (
					<div className="relation" key={file} onClick={() => setSelectedStory(file)}>
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