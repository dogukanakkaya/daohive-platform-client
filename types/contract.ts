import { contractQuery } from '@/queries'

type QueryWrapper = ReturnType<typeof contractQuery>
export type ContractsResponse = NonNullable<Awaited<ReturnType<QueryWrapper['getContracts']>>['data']>
