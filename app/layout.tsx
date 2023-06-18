import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { ReactNode } from 'react'

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Dao Hive',
  description: 'A DAO for the people, by the people.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
}
