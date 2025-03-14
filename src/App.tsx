import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket from './hooks/websocket'

function App() {
	const [address] = useState('0xPisun')
	const { sessionId, message } = useWebSocket(address)

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h1>{address || "You're not connected"}</h1>
			<p>Websocket session id: {sessionId}</p>
			<div>
				<p>Message from WebSocket Server: {message}</p>
			</div>
		</>
	)
}

export default App
