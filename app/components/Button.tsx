import type { ReactNode, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary'
}

interface Props {
  children: ReactNode
  variant?: Variant
  isEnabled?: boolean
}

export default function Button({ children, variant = Variant.Primary, isEnabled = true, ...rest }: Props & HTMLAttributes<HTMLButtonElement>) {
  const textColor = variant === Variant.Primary ? 'text-white' : 'text-black'
  const backgroundColor = variant === Variant.Primary ? 'bg-primary' : 'bg-secondary'

  const { className, ...restAttributes } = rest
  const _className = clsx('button', textColor, backgroundColor, !isEnabled && 'opacity-50 pointer-events-none', className)

  return (
    <button className={_className} {...restAttributes}>{children}</button>
  )
}
