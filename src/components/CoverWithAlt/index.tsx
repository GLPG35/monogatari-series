import { useState } from "react"

type Props = {
	pictures: string[],
	picturesAlt: string[],
	manga: string,
	name: string
}

const CoverWithAlt = ({ pictures, picturesAlt, manga, name }: Props) => {
	const [alt, setAlt] = useState(false)
	
	return (
		<div className="cover">
			<p>Full resolution (<a href={pictures[2]} target="_blank">Vertical</a> / <a href={`/banners/manga/${manga}.jpg`} target="_blank">Horizontal</a> / <a href={picturesAlt[2]} target="_blank">Original</a>)</p>
			<p>{!alt ? <>Full resolution (<a href={pictures[2]} target="_blank">Vertical</a> / <a href={`/banners/manga/${manga}.jpg`} target="_blank">Horizontal</a>)</> : <><a href={picturesAlt[2]} target="_blank">Full resolution</a></>}</p>
			<p><a onClick={() => setAlt(!alt)}>{!alt ? 'Original' : 'Limited Edition'}</a></p>
			<picture>
				<source srcSet={`/banners/manga/${name}.avif`} type="image/avif" media="(width < 1130px)" />
				<source srcSet={`/banners/manga/${name}.webp`} type="image/webp" media="(width < 1130px)" />
				<source srcSet={`/banners/manga/${name}.jpg`} type="image/jpeg" media="(width < 1130px)" />
				{(alt ? picturesAlt : pictures).map((path, i) => {
					const isLast = pictures.length === i + 1
					const type = path.split('.').pop()

					if (isLast) return <img src={path} alt="" key={i} />
					
					return <source srcSet={path} type={`image/${type}`} key={i} />
				})}
			</picture>
		</div>
	)
}

export default CoverWithAlt
