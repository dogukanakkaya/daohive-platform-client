import { UserMerged } from '@/modules/auth'
import SectionDivider from '../SectionDivider'

export default function Balance({ user }: { user: UserMerged }) {
  return (
    <div>
      <h2 className="text-lg -mt-0.5">Your balance is <span className="badge text-base">{user.balance}$</span> <a href="#" className="text-indigo-500">click here to add more!</a></h2>
      <div>
        <SectionDivider className="mt-2">
          <h1 className="section-text">Balance History</h1>
        </SectionDivider>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Deposited</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4"><b className="font-semibold text-white">10$</b></td>
              <td className="px-6 py-4">Some date</td>
              <td className="px-6 py-4">Card</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
