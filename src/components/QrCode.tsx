import useWebSocket, { WebSocketMessageType } from '../hooks/websocket'
import QRCode from 'react-qr-code'
import { Card } from 'primereact/card'
import { useAccount } from 'wagmi'
import { ProgressBar } from 'primereact/progressbar'
import { Message } from 'primereact/message'

export default function QrCode() {
	const { address } = useAccount()
	const { sessionId, status } = useWebSocket(address)

	return (
		<Card title="Scan the QR Code" className="p-shadow-2 p-p-4">
			<div className="flex flex-col items-center gap-4">
				<QRCode value="TEST" size={150} />
				<h3>{address || "You're not connected"}</h3>

				{sessionId !== address?.toLowerCase() && (
					<p>
						<strong>Service unavailable</strong>
					</p>
				)}

				{status === WebSocketMessageType.SET_SESSION_ID && (
					<p>
						<strong>Scan to generate proof</strong>
					</p>
				)}

				{status === WebSocketMessageType.PROOF_GENERATING && (
					<>
						<ProgressBar
							color=""
							value={32}
							mode="indeterminate"
							className="w-3/5"
						/>
						<strong>Generating proof...</strong>
					</>
				)}

				{status === WebSocketMessageType.PROOF_SAVED && (
					<Message severity="success" text="Proof is successfully generated" />
				)}

				{status === WebSocketMessageType.PROOF_ERROR && (
					<Message severity="error" text="Proof generating error" />
				)}
			</div>
		</Card>
	)
}
