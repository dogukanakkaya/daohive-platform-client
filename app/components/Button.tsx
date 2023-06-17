import type { ReactNode, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export enum Variant {
  Primary = 'bg-primary text-white',
  Secondary = 'bg-secondary text-black',
  SignInWith = 'bg-white dark:bg-slate-800',
}

interface Props {
  children: ReactNode
  variant?: Variant
  isEnabled?: boolean
}

export default function Button({ children, variant = Variant.Primary, isEnabled = true, ...rest }: Props & HTMLAttributes<HTMLButtonElement>) {
  const { className, ...restAttributes } = rest
  const _className = clsx('button', variant, !isEnabled && 'opacity-50 pointer-events-none', className)

  return (
    <button className={_className} {...restAttributes}>{children}</button>
  )
}
