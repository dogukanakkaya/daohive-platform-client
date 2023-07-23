import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { ApolloWrapper } from '@/utils/apollo/wrapper'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
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
    </ApolloWrapper>
  )
}
