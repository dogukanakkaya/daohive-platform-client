import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Zoom } from 'react-toastify'
import { Inter } from 'next/font/google'
import { TOAST_AUTO_CLOSE } from '@/config'

// @todo: dynamic server error solution
export const revalidate = 0

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Daohive - Platform',
  description: 'Management platform for Daohive. A DAO for the people, by the people.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer
          autoClose={TOAST_AUTO_CLOSE}
          hideProgressBar
          pauseOnFocusLoss={false}
          theme="colored"
          limit={5}
          transition={Zoom}
        />
      </body>
    </html>
  )
}
