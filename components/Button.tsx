import { clsx } from 'clsx'

export enum Variant {
  Primary = 'bg-primary text-white',
  Secondary = 'bg-secondary text-black dark:text-white',
  SignInWith = 'bg-white dark:bg-slate-800',
}

interface Props {
  children: React.ReactNode
  variant?: Variant
  isEnabled?: boolean
}

export default function Button({ children, variant = Variant.Primary, isEnabled = true, ...rest }: Props & React.HTMLAttributes<HTMLButtonElement>) {
  const { className, ...restAttributes } = rest
  const _className = clsx('button', variant, !isEnabled && 'opacity-60 pointer-events-none cursor-not-allowed', className)

  return (
    <div className={!isEnabled ? 'cursor-not-allowed' : ''}><button className={_className} {...restAttributes}>{children}</button></div>
  )
}
