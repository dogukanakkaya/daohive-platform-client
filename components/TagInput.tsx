'use client'
import clsx from 'clsx'

interface Props {
  tags: string[]
  setTags: (tags: string[]) => void
}

export default function TagInput({ tags, setTags, ...rest }: React.HTMLProps<HTMLInputElement> & Props) {
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
      <ul className="flex flex-wrap gap-2 mt-2">
        {
          tags.map(tag => <li key={tag} className="block p-1 text-sm rounded bg-primary">
            {tag} <span onClick={() => setTags(tags.filter(t => t !== tag))} className="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">
              <i className="bi bi-x"></i>
            </span>
          </li>
          )
        }
      </ul>
    </>
  )
}