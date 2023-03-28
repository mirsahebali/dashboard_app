import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Tab from './Tab'
export default function App({ Component, pageProps }: AppProps) {
 return  <Tab>
 <Component {...pageProps} />
 </Tab>
}
