import { voterQuery } from '@/queries/voter'

type QueryWrapper = ReturnType<typeof voterQuery>
export type VotersResponse = NonNullable<Awaited<ReturnType<QueryWrapper['getVoters']>>['data']>
