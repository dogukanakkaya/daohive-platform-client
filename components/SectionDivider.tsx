import clsx from 'clsx'

interface Props {
  children: React.ReactNode
}

export default function SectionDivider({ children, ...rest }: Props & React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...restAttributes } = rest
  const _className = clsx('flex items-center', className)

  return (
    <div className={_className} {...restAttributes}>
      <div className="flex-grow bg bg-gray-300 dark:bg-gray-600 h-0.5"></div>
      <div className="flex-grow-0 flex items-center gap-2 mx-4">
        {children}
      </div>
      <div className="flex-grow bg bg-gray-300 dark:bg-gray-600 h-0.5"></div>
    </div>
  )
}
