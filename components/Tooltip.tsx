'use client'
import { useEffectState } from '@/hooks'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  text: string | React.ReactNode
  textAfterClick?: string | React.ReactNode
  revertTimeout?: number
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ children, text, textAfterClick, revertTimeout = 1000, position = 'top' }: Props) {
  const [tooltipText, setTooltipText] = useEffectState<string | React.ReactNode>(text)

  const handleClick = () => {
    if (textAfterClick) {
      setTooltipText(textAfterClick)
      setTimeout(() => setTooltipText(text), revertTimeout)
    }
  }

  const tooltipClass = clsx('tooltip', {
    'bottom-full mb-2 left-1/2 -translate-x-1/2': position === 'top',
    'left-full ml-2 top-1/2 -translate-y-1/2': position === 'right',
    'top-full mt-2 left-1/2 -translate-x-1/2': position === 'bottom',
    'right-full mr-2 top-1/2 -translate-y-1/2': position === 'left'
  })

  const tooltipArrowClass = clsx('absolute -z-10 h-2 w-2 rounded-sm bg-black', {
    'bottom-[-4px] rotate-[45deg] left-1/2 -translate-x-1/2': position === 'top',
    'left-[-4px] rotate-[135deg] top-1/2 -translate-y-1/2': position === 'right',
    'top-[-4px] rotate-[225deg] left-1/2 -translate-x-1/2': position === 'bottom',
    'right-[-4px] rotate-[315deg] top-1/2 -translate-y-1/2': position === 'left'
  })

  return (
    <div className="group relative inline-block" onClick={handleClick}>
      {children}
      <div className={tooltipClass}>
        <span className={tooltipArrowClass} />
        {tooltipText}
      </div>
    </div>
  )
}
