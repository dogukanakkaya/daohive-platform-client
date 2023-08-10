import clsx from 'clsx'

interface Props {
  children: React.ReactNode
}

export default function SectionDivider({ children, ...rest }: Props & React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...restAttributes } = rest
  const _className = clsx('flex items-center', className)

  return (
    <div className={_className}>
      <div className="flex-grow bg bg-gray-300 dark:bg-gray-600 h-0.5"></div>
      <div className="flex-grow-0 mx-4">
        <h1 className="section-text">{children}</h1>
      </div>
      <div className="flex-grow bg bg-gray-300 dark:bg-gray-600 h-0.5"></div>
    </div>
  )
}
