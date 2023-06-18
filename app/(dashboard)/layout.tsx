import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
