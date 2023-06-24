'use client'
import { Voter } from '@/app/(dashboard)/voters/types'
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
import { useDeferredValue, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Voter as VoterSchema } from '@/app/(dashboard)/voters/create/schema'
import { toast } from 'react-toastify'
import { z } from 'zod'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => Promise<void>
  }
}

interface Props {
  data: Voter[]
}

const defaultColumn: Partial<ColumnDef<Voter>> = {
  cell: function Cell({ getValue, row: { index }, column, table }) {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = async () => {
      const columnId = column.id as keyof z.infer<typeof VoterSchema>

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
        className="bg-transparent outline-none"
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  }
}

const columnHelper = createColumnHelper<Voter>()
const columns = [
  columnHelper.accessor('address', {
    cell: info => (
      <Tooltip text="Copy Address" textAfterClick={<>Copied <i className="bi bi - check"></i></>} position="top">
        < span onClick={() => navigator.clipboard.writeText(info.getValue())} className="cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white" > {info.getValue()}</span >
      </Tooltip >
    )
  }),
  columnHelper.accessor('name', {}),
  columnHelper.accessor('email', {})
]

export default function Table({ data }: Props) {
  const supabase = createClientComponentClient()
  const [search, setSearch] = useState('')
  const globalFilter = useDeferredValue(search)

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    state: {
      globalFilter
    },
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

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id={`checkbox-table-${row.id}`} type="checkbox" className="w-4 h-4 form-input" />
                    <label htmlFor={`checkbox-table-${row.id}`} className="sr-only">checkbox</label>
                  </div>
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="flex items-center px-6 py-4 space-x-3">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
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
