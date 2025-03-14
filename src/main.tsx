import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import App from './App.tsx'
import { injected, WagmiProvider } from 'wagmi'

import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { walletConnect, metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
	chains: [mainnet, base],
	connectors: [
		injected(),
		walletConnect({ projectId: import.meta.env.VITE_REOWN_ID }),
		metaMask(),
		safe(),
	],
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
	},
})

import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css' // flex

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<WagmiProvider config={config}>
		<QueryClientProvider client={queryClient}>
			<PrimeReactProvider>
				<App />
			</PrimeReactProvider>
		</QueryClientProvider>
	</WagmiProvider>
)
