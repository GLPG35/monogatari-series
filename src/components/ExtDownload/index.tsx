import { useState, type PropsWithChildren } from 'react'
import './styles.scss'

const ExtDownload = ({ href, name, children }: PropsWithChildren<{ href: string, name: string }>) => {
	const [loading, setLoading] = useState(false)
	
	const handleClick = async () => {
		setLoading(true)
		const res = await fetch(href)
		const blob = await res.blob()
		const blobURL = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = blobURL
		link.download = name
		link.click()

		URL.revokeObjectURL(blobURL)
		setLoading(false)
	}
	
	return (
		<>
			<div className='anchor' onClick={handleClick}>
				{children}
			</div>
			{loading && 
				<span className="loader"></span>
			}
		</>
	)
}

export default ExtDownload