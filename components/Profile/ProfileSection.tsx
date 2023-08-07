'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PersonalInformation from './PersonalInformation'
import { User } from '@supabase/supabase-js'

export default function ProfileSection({ user }: { user: User }) {
  return (
    <div className="relative bg-white dark:bg-gray-900 py-5 rounded-xl shadow">
      <Tabs>
        <div className="flex">
          <TabList>
            <Tab><i className="bi bi-person-circle"></i> Personal Information</Tab>
            <Tab disabled><i className="bi bi-wallet2"></i> My Balance <span className="uppercase text-xs text-white bg-primary p-1 rounded">Soon</span></Tab>
            <Tab disabled><i className="bi bi-shield-check"></i> Privacy & Security <span className="uppercase text-xs text-white bg-primary p-1 rounded">Soon</span></Tab>
            <Tab disabled><i className="bi bi-bell"></i> Notifications <span className="uppercase text-xs text-white bg-primary p-1 rounded">Soon</span></Tab>
            <Tab disabled><i className="bi bi-person-x"></i> Delete Account <span className="uppercase text-xs text-white bg-primary p-1 rounded">Soon</span></Tab>
          </TabList>
          <div className="px-5 pt-3 flex-grow">
            <TabPanel>
              <PersonalInformation user={user} />
            </TabPanel>
            <TabPanel>
              <h2>TODO: My Balance</h2>
            </TabPanel>
            <TabPanel>
              <h2>TODO: Privacy & Security</h2>
            </TabPanel>
            <TabPanel>
              <h2>TODO: Notifications</h2>
            </TabPanel>
            <TabPanel>
              <h2>TODO: Delete Account</h2>
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
