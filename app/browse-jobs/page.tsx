import { getJobs } from '@/lib/api/jobs'
import React from 'react'

type SearchParams = {
  [key: string]: string | string[] | undefined
}

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const search = await searchParams
  const params = new URLSearchParams(search).toString()
  console.log(params)
  const jobs = getJobs(params)


  console.log(search)
  return <div></div>
}

export default BrowseJobs
