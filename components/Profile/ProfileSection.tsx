'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { UserMerged } from '@/modules/auth'
import PersonalInformation from './PersonalInformation'
import Balance from './Balance'
import PrivacySecurity from './PrivacySecurity'

export default function ProfileSection({ user }: { user: UserMerged }) {
  return (
    <div className="relative bg-white dark:bg-gray-900 py-5 rounded-xl shadow">
      <Tabs>
        <div className="flex">
          <TabList>
            <Tab><i className="bi bi-person-circle"></i> Personal Information</Tab>
            <Tab><i className="bi bi-wallet2"></i> My Balance</Tab>
            <Tab><i className="bi bi-shield-check"></i> Privacy & Security</Tab>
            <Tab disabled><i className="bi bi-bell"></i> Notifications <span className="badge">Soon</span></Tab>
          </TabList>
          <div className="px-5 pt-3 flex-grow">
            <TabPanel>
              <PersonalInformation user={user} />
            </TabPanel>
            <TabPanel>
              <Balance user={user} />
            </TabPanel>
            <TabPanel>
              <PrivacySecurity />
            </TabPanel>
            <TabPanel>
              <h2>TODO: Notifications</h2>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
