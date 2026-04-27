import type { PropsWithChildren } from 'react'

const ExtDownload = ({ href, name, children }: PropsWithChildren<{ href: string, name: string }>) => {
	const handleClick = async () => {
		const res = await fetch(href)
		const blob = await res.blob()
		const blobURL = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = blobURL
		link.download = name
		link.click()

		URL.revokeObjectURL(blobURL)
	}
	
	return (
		<div className='anchor' onClick={handleClick}>
			{children}
		</div>
	)
}

export default ExtDownload