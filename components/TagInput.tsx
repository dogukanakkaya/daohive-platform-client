'use client'
import clsx from 'clsx'
import { HTMLProps } from 'react'

interface Props {
  tags: string[]
  setTags: (tags: string[]) => void
}

export default function TagInput({ tags, setTags, ...rest }: HTMLProps<HTMLInputElement> & Props) {
  const { className, ...restAttributes } = rest
  const _className = clsx('form-input', className)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
      e.preventDefault()

      const value = e.currentTarget.value.trim()
      if (!tags.includes(value)) setTags([...tags, value])

      e.currentTarget.value = ''
    }
  }

  return (
    <>
      <input className={_className} onKeyDown={handleKeyDown} {...restAttributes} />
      <ul className="flex gap-2 mt-2">
        {
          // @todo: UX - check this in mobile to see if X is clickable enough
          tags.map(t => <li key={t} className="block p-1 text-sm rounded bg-primary">
            {t} <span onClick={() => setTags(tags.filter(_t => _t !== t))} className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">
              <i className="bi bi-x"></i>
            </span>
          </li>
          )
        }
      </ul>
    </>
  )
}