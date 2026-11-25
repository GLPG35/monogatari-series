import { useState } from "react"
import type { languages } from "../../i18n/ui"
import { useTranslations } from "../../i18n/utils"

type Props = {
	pictures: string[],
	picturesAlt: string[],
	manga: string,
	name: string,
	currentLang: keyof typeof languages
}

const CoverWithAlt = ({ pictures, picturesAlt, manga, name, currentLang }: Props) => {
	const [alt, setAlt] = useState(false)
	const t = useTranslations(currentLang)
	
	return (
		<div className="coverWrapper">
			<div className="cover withAlt">
				<picture>
					<source srcSet={`/banners/manga/${name}.avif`} type="image/avif" media="(width < 1130px)" />
					<source srcSet={`/banners/manga/${name}.webp`} type="image/webp" media="(width < 1130px)" />
					<source srcSet={`/banners/manga/${name}.jpg`} type="image/jpeg" media="(width < 1130px)" />
					{(alt ? picturesAlt : pictures).map((path, i) => {
						const isLast = pictures.length === i + 1
						const type = path.split('.').pop()
	
						if (isLast) return <img src={path} alt="" key={i} style={{ viewTransitionName: `manga-cover-${manga}` }} />
						
						return <source srcSet={path} type={`image/${type}`} key={i} />
					})}
				</picture>
			</div>
			<div className="sources">
				<p>{t('fullResolution')} (<a href={pictures[2]} target="_blank">Vertical</a> / <a href={`/banners/manga/${manga}.jpg`} target="_blank">Horizontal</a> / <a href={picturesAlt[2]} target="_blank">Original</a>)</p>
				<p>{!alt ? <>{t('fullResolution')} (<a href={pictures[2]} target="_blank">Vertical</a> / <a href={`/banners/manga/${manga}.jpg`} target="_blank">Horizontal</a>)</> : <><a href={picturesAlt[2]} target="_blank">{t('fullResolution')}</a></>}</p>
				<p><a onClick={() => setAlt(!alt)}>{!alt ? 'Original' : t('limitedEdition')}</a></p>
			</div>
		</div>
	)
}

export default CoverWithAlt
