import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto_Flex } from 'next/font/google';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${roboto.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
