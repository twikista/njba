import React from 'react'
import { auth } from '../../../../auth'

import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import JournalStats from '@/components/Dashboard/JournalStats'
import { TimePastIcon } from '@/components/Icons'
import QuickLinks from '@/components/Dashboard/QuickLinks'
import { Issue } from '@/lib/mongoose/models'
import { connectDB } from '@/lib/mongoose/config'

const getLatestIssue = async () => {
    connectDB()
    const latestIssue = await Issue.find().sort({ publishDate: -1 }).limit(1)
    return latestIssue[0]
  }

export default async function LastPublished() {
    const { user } = await auth()
  const lastIssue = await getLatestIssue()
  const formatedDate = (date) =>
    date ? new Intl.DateTimeFormat('en-GB').format(date) : 'N/A'
  return (
    <section className='flex flex-col justify-between gap-5 px-5 py-8 md:flex-row md:py-10 md:px-5 lg:px-10 md:flex bg-gray-50 rounded-xl'>
            <div className='flex-1 p-2 bg-gray-200 rounded-lg '>
              <div className='flex items-center gap-1 px-4 py-3 font-medium'>
                <TimePastIcon className='w-4 h-4 md:w-5 md:h5 fill-gray-500' />
                <h4 className='text-base font-medium md:text-xl '>
                  Last Published Issue
                </h4>
              </div>
              <div className='px-4 py-5 space-y-2 rounded-md bg-gray-50'>
                <p className='flex items-center gap-1 py-2'>
                  <span>Volume:</span>
                  <span>{lastIssue?.volume ? lastIssue.volume : 'N/A'}</span>
                </p>
                <p className='flex items-center gap-1 py-2'>
                  <span>Issue Number:</span>
                  <span>
                    {lastIssue?.issueNumber ? lastIssue?.issueNumber : 'N/A'}
                  </span>
                </p>
                <p className='flex items-center gap-1 py-2'>
                  <span>Number of Articles:</span>
                  <span>
                    {lastIssue?.articles.length
                      ? lastIssue?.articles.length
                      : 'N/A'}
                  </span>
                </p>
                <p className='flex items-center gap-1 py-2'>
                  <span>Publish Date:</span>
                  <span>{formatedDate(lastIssue?.publishDate)}</span>
                </p>
              </div>
            </div>
            <QuickLinks userRole={user?.role} />
          </section>
  )
}
