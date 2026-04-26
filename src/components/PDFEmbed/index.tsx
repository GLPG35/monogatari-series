import { PDFViewer, type DocumentManagerPlugin, type UIPlugin, ZoomMode } from '@embedpdf/react-pdf-viewer' 
import './styles.scss'

const PDFEmbed = ({ url, setView }: { url: string, setView: (view?: string) => void }) => {
	return (
		<div className='pdfEmbed'>
			<PDFViewer className='viewer' config={{ src: url, theme: { preference: 'dark', background: { app: '#000000' } }, tabBar: 'never', pan: { defaultMode: 'always' }, zoom: { defaultZoomLevel: ZoomMode.FitWidth }, disabledCategories: ['annotation', 'print', 'export', 'insert', 'form', 'redaction', 'tools', 'document-open', 'document-print', 'document-capture', 'document-fullscreen', 'document-protect', 'panel-comment'], export: { defaultFileName: url.split('/').pop() } }} style={{ height: '100%' }} onReady={(registry) => {
				const ui = registry.getPlugin<UIPlugin>('ui')?.provides()
				const schema = ui?.getSchema()
				const toolbar = schema?.toolbars['main-toolbar']
				const docManager = registry.getPlugin<DocumentManagerPlugin>('document-manager')?.provides()

				if (toolbar) {
					const items = JSON.parse(JSON.stringify(toolbar.items))
					const rightGroup = items.find((item: { id: string }) => item.id === 'right-group')

					if (rightGroup) {
						rightGroup.items.push({
							commandId: "document:close",
							id: "close",
							type: "command-button",
							variant: "icon"
						})
					}

					ui?.mergeSchema({
						toolbars: { 'main-toolbar': { ...toolbar, items } }
					})
				}
				
				docManager?.onDocumentClosed(() => {
					setView(undefined)
				})
			}} />
		</div>
	)
}

export default PDFEmbed