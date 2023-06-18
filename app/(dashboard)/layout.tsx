import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="md:grid grid-cols-12">
      <div className="md:col-span-3 xl:col-span-2">
        <Sidebar />
      </div>
      <div className="w-full md:col-span-9 xl:col-span-10">
        <Header />
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}
