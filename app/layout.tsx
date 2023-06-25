import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Zoom } from 'react-toastify'
import { Inter } from 'next/font/google'

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Dao Hive',
  description: 'A DAO for the people, by the people.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer
          autoClose={4000}
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
