import { useAccount } from 'wagmi'
import './App.css'
import { ConnectWallet } from './components/ConnectWallet'
import QrCode from './components/QrCode'

function App() {
	const { address, isConnected } = useAccount()
	return (
		<div className="flex flex-col gap-4">
			<ConnectWallet />
			{address && isConnected && <QrCode />}
		</div>
	)
}

export default App
