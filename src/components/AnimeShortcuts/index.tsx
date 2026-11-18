import { useState, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { LuChevronDown } from "react-icons/lu"

const AnimeShortcuts = () => {
	const [show, setShow] = useState(false)
	
	return (
		<motion.div className="shortcuts" animate={{ y: !show ? 0 : '85%' }} transition={{ duration: 0.7, type: 'spring', bounce: 0 }} drag='y' dragConstraints={{ top: 0, bottom: !show ? 0 : 470 }} dragElastic={0.2} onDragEnd={(_, info) => {
			if (!show && (info.offset.y > 50 || info.velocity.y > 300)) {
				setShow(true)
			}

			if (show && (info.offset.y < -50 || info.velocity.y < -300)) {
				setShow(false)
			}
		}}>
			<div className="wrapper">
				<div className="textureWrapper">
					<div className="texture">
						<picture>
							<source srcSet="/2-big.avif" type="image/avif" />
							<source srcSet="/2-big.webp" type="image/webp" />
							<img src="/2-big.png" alt="" fetchPriority="high" />
						</picture>
						<div className="duplicate" style={{ "--current-img": "image-set(url('/2-big.avif') type('image/avif'), url('/2-big.webp') type('image/webp'), url('/2-big.png') type('image/png'))" } as React.CSSProperties}>
						</div>
					</div>
				</div>
				<ul>
					<li><a onClick={() => setShow(false)} href="#watch-order">Watch Order</a></li>
					<li><a onClick={() => setShow(false)} href="#essential-stories">Essential Short Stories</a></li>
					<li><a onClick={() => setShow(false)} href="#essential-audiovisual">Audiovisual Content</a></li>
					<li><a onClick={() => setShow(false)} href="#books">Miscellaneous Books</a></li>
				</ul>
				<motion.div className="drag" onTap={() => setShow(!show)} animate={{ rotate: !show ? 0 : 180 }}>
					<LuChevronDown />
				</motion.div>
			</div>
		</motion.div>
	)
}

export default AnimeShortcuts
