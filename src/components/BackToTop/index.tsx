import { useEffect, useState } from "react"
import { LuChevronUp } from "react-icons/lu"

const BackToTop = () => {
	const [show, setShow] = useState(false)
	
	useEffect(() => {
		const handleScroll = () => {
			setShow(window.scrollY > 500)
		}
		
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return <button className={`backToTop ${show ? 'active' : ''}`} onClick={() => window.scrollTo(0, 0)}>
		<div className="wrapper">
			<div className="textureWrapper">
				<div className="texture">
					<picture>
						<source srcSet="/106.avif" type="image/avif" />
						<source srcSet="/106.webp" type="image/webp" />
						<img src="/106.png" alt="" fetchPriority="high" />
					</picture>
					<div className="duplicate" style={{ "--current-img": "image-set(url('/106.avif') type('image/avif'), url('/106.webp') type('image/webp'), url('/106.png') type('image/png'))" } as React.CSSProperties}>
					</div>
				</div>
			</div>
			<LuChevronUp />
		</div>
	</button>
}

export default BackToTop
