'use client'
import {
  ColumnDef,
  RowData,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import Tooltip from '../Tooltip'
import { useDeferredValue, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useEffectState } from '@/hooks'
import { withLoadingToastr } from '@/utils/hof'
import { VoterSchema, VoterResponse as VoterResponseGeneric } from '@/modules/voter'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => Promise<void>
  }
}

type VoterResponse = VoterResponseGeneric<'id' | 'address' | 'name' | 'email'>

interface Props {
  data: VoterResponse[]
}

const defaultColumn: Partial<ColumnDef<VoterResponse>> = {
  cell: function Cell({ getValue, row: { index }, column, table }) {
    const initialValue = getValue()
    const [value, setValue] = useEffectState(initialValue)

    const onBlur = async () => {
      const columnId = column.id as keyof z.infer<typeof VoterSchema>

      if (value === initialValue) return

      try {
        await VoterSchema.pick({ [columnId]: true }).parseAsync({ [columnId]: value })
        await table.options.meta?.updateData(index, columnId, value)
        toast.success('Successfully updated')
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          const formattedErrors = err.format() as z.inferFormattedError<typeof VoterSchema>
          toast.error(formattedErrors[columnId]?._errors[0])
        } else {
          toast.error(err.message)
        }

        setValue(initialValue)
      }
    }

    return (
      <input
        value={(value ?? '').toString()}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        className="w-full bg-transparent outline-none"
      />
    )
  }
}

const columnHelper = createColumnHelper<VoterResponse>()
const columns = [
  columnHelper.accessor('address', {
    cell: info => typeof defaultColumn.cell === 'function' ? (
      <div className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {defaultColumn.cell(info)}
      </div>
    ) : null
  }),
  columnHelper.accessor('name', {}),
  columnHelper.accessor('email', {})
]

export default function Table({ data: voters }: Props) {
  const supabase = createClientComponentClient()
  const [search, setSearch] = useState('')
  const globalFilter = useDeferredValue(search)
  const [remove, setRemove] = useState(0)
  const [data, setData] = useEffectState(voters)

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: async (rowIndex: number, columnId: string, value: unknown) => {
        const { error } = await supabase.from('voters').update({ [columnId]: value }).eq('id', data[rowIndex].id)
        if (error) throw Error(error.message)
      }
    }
  })

  const handleRemove = (id: number) => remove === id ? withLoadingToastr(async () => {
    await supabase.from('voters').delete().eq('id', id).throwOnError()
    setData(data.filter(voter => voter.id !== id))
    setRemove(0)
  })() : setRemove(id)

  const router = useRouter()

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2" onClick={() => router.refresh()}>
          Show
          <select
            className="form-input"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          records
        </div>
        <div>
          <label htmlFor="search" className="sr-only">Search</label>
          <input value={globalFilter} onChange={e => setSearch(e.target.value)} className="form-input" type="search" placeholder="Search..." />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-all" type="checkbox" className="w-4 h-4 form-input" />
                    <label htmlFor="checkbox-table-all" className="sr-only">checkbox</label>
                  </div>
                </th>
                {headerGroup.headers.map(header => (
                  <th key={header.id} scope="col" className="px-6 py-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-6 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <input id={`checkbox-table-${row.id}`} type="checkbox" className="w-4 h-4 form-input" />
                      <label htmlFor={`checkbox-table-${row.id}`} className="sr-only">checkbox</label>
                    </div>
                    <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi-check"></i></>} position="top">
                      <span onClick={() => navigator.clipboard.writeText(data[row.index].address)} className="cursor-pointer">
                        <i className="bi bi-clipboard"></i>
                      </span>
                    </Tooltip>
                    <Tooltip text={remove === data[row.index].id ? 'Confirm' : 'Delete'} position="top">
                      <span onClick={() => handleRemove(data[row.index].id)} className="text-red-500 hover:text-red-500 cursor-pointer">
                        {remove === data[row.index].id ? <i className="bi bi-check-lg"></i> : <i className="bi bi-trash3"></i>}
                      </span>
                    </Tooltip>
                  </div>
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 rounded py-1 px-2 cursor-pointer"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 rounded py-1 px-2 cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 rounded py-1 px-2 cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 rounded py-1 px-2 cursor-pointer"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <b>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </b>
        </span>
        | Go to page:
        <input
          type="number"
          min={1}
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className="form-input w-20"
        />
      </div>
    </>
  )
}
