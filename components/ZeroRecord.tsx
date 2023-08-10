import Image, { StaticImageData } from 'next/image'
import Button from './Button'

interface Props {
  children?: React.ReactNode
  title: string
  src?: string | StaticImageData
}

export default function ZeroRecord({ children, title, src = '/images/zero-record-icon.svg' }: Props) {
  return (
    <div className="flex-center flex-col gap-2">
      <div className="opacity-50 -z-10">
        <Image src={src} width={200} height={200} alt="No record" />
      </div>
      <div className="flex-center flex-col text-center md:max-w-[500px]">
        <h1 className="section-text my-2 tracking-widest">{title}</h1>
        {children}
      </div>
    </div>
  )
}
