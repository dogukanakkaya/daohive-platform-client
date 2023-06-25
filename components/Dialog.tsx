'use client'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode;
  title: string;
  size?: Size;
  open: boolean;
}

export enum Size {
  Small = 'max-w-sm',
  Medium = 'max-w-lg',
  Large = 'max-w-2xl',
}

export default function Dialog({ children, title, size = Size.Medium, open, ...rest }: Props & React.HTMLAttributes<HTMLDialogElement>) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const { className, ...restAttributes } = rest
  const _className = clsx('bg-white text-gray-600 p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-full space-y-4 backdrop:bg-opacity-50 backdrop:bg-gray-600 outline-none dark:bg-gray-900 dark:text-gray-300', size, className)

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect()
    if (
      dialogDimensions && (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      )
    ) {
      dialogRef.current?.close()
    }
  }

  useEffect(() => {
    if (dialogRef.current?.open && !open) {
      dialogRef.current?.close()
    } else if (!dialogRef.current?.open && open) {
      dialogRef.current?.showModal()
    }
  }, [open])

  return (
    <dialog ref={dialogRef} onClick={handleClick} className={_className} {...restAttributes}>
      <div>
        <h3 className="text-xl font-extrabold">{title}</h3>
      </div>
      {children}
    </dialog>
  )
}