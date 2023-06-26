import { contractQuery } from '@/queries/contract'

type QueryWrapper = ReturnType<typeof contractQuery>
export type ContractsResponse = NonNullable<Awaited<ReturnType<QueryWrapper['getContracts']>>['data']>
