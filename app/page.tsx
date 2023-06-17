import Sidebar from './components/Sidebar'
import Header from './components/Header'

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="m-5">TODO</div>
      </div>
    </div>
  )
}
